import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/questions.css";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import quizResultsActions from "../../redux/actions/quiz-results";

export const MultipleChoiceQuestion = (props) => {
  const { question, index, isInstructor, isSubmitted } = props;
  const userAnswers = useSelector(
    (state) => state.quiz_results.quizResults.userAnswers
  );
  const dispatch = useDispatch();

  const handleChangeSelectedOption = (optionValue) => {
    const newAnswer = {
      questionIndex: index,
      answers: [{ statementIndex: 0, value: optionValue }],
    };
    const i = userAnswers.findIndex((elem) => elem.questionIndex === index);
    i === -1
      ? dispatch(quizResultsActions.setUserAnswers([...userAnswers, newAnswer]))
      : dispatch(
          quizResultsActions.setUserAnswers([
            ...userAnswers.slice(0, i),
            newAnswer,
            ...userAnswers.slice(i + 1),
          ])
        );
  };

  const checkAnswerMultQuestion = (question, index) => {
    const userAnswer = userAnswers.find((elem) => elem.questionIndex === index);
    return question.statements[0].options.find(
      (elem) => elem.value === userAnswer.answers[0].value
    )?.isAnswer;
  };

  const isUserOption = (optionValue) => {
    const userAnswer = userAnswers.find((elem) => elem.questionIndex === index);
    return userAnswer?.answers[0].value === optionValue;
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
              style={{
                cursor: isInstructor || isSubmitted ? "auto" : "pointer",
              }}
              onClick={() => {
                if (!(isInstructor || isSubmitted))
                  handleChangeSelectedOption(option.value);
              }}
            >
              <b>{String.fromCharCode(97 + i)}. </b>
              {option.value}
            </p>
            {option.isAnswer && (isInstructor || isSubmitted) ? (
              <AiFillCheckCircle
                size={16}
                style={{ color: "darkgreen", marginLeft: "2px" }}
              />
            ) : null}
            {isSubmitted && !option.isAnswer && isUserOption(option.value) ? (
              <AiFillCloseCircle
                size={16}
                style={{ color: "red", marginLeft: "2px" }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
