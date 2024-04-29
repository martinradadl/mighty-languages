import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/questions.css";
import { AiFillCheckCircle } from "react-icons/ai";

export const MultipleChoiceQuestion = (props) => {
  const { question, index, isInstructor, userAnswers, setUserAnswers } = props;

  const handleChangeSelectedOption = (optionValue) => {
    const newAnswer = {
      questionIndex: index,
      answers: [{ statementIndex: 0, value: optionValue }],
    };
    const i = userAnswers.findIndex((elem) => elem.questionIndex === index);
    i === -1
      ? setUserAnswers([...userAnswers, newAnswer])
      : setUserAnswers([
          ...userAnswers.slice(0, i),
          newAnswer,
          ...userAnswers.slice(i + 1),
        ]);
  };

  return (
    <div>
      <div className="mult-choice-statement-container">
        <p className="mult-choice-statement">
          <b>{index}. </b>
          {question.statements[0].value}
        </p>
      </div>

      {question.statements[0].options.map((option, i) => {
        return (
          <div key={i} className={"mult-choice-option-container"}>
            <p
              className={
                option.value ===
                userAnswers.find((elem) => elem.questionIndex === index)
                  ?.answers[0].value
                  ? "mult-choice-option selected-option"
                  : "mult-choice-option"
              }
              style={{ cursor: isInstructor ? "auto" : "pointer" }}
              onClick={() => {
                if (!isInstructor) handleChangeSelectedOption(option.value);
              }}
            >
              <b>{String.fromCharCode(97 + i)}. </b>
              {option.value}
            </p>
            {option.isAnswer && isInstructor ? (
              <AiFillCheckCircle
                size={16}
                style={{ color: "darkgreen", marginLeft: "2px" }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
