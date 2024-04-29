import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/questions.css";
import { AiFillCheckCircle } from "react-icons/ai";

export const FillingQuestion = (props) => {
  const { question, index, isInstructor, userAnswers, setUserAnswers } = props;
  const dispatch = useDispatch();

  const handleChangeAnswer = (event) => {
    const statementIndex = event.target.name.split("-")[2];
    const i = userAnswers.findIndex((elem) => elem.questionIndex === index);
    if (i === -1) {
      console.log("antes de setear:", userAnswers);
      const newAnswer = {
        questionIndex: index,
        answers: [{ statementIndex, value: event.target.value }],
      };
      setUserAnswers([...userAnswers, newAnswer]);
      console.log("después de setear:", userAnswers);
    } else {
      const j = userAnswers[i].answers.findIndex(
        (elem) => elem.statementIndex === statementIndex
      );
      if (j === -1) {
        setUserAnswers([
          ...userAnswers.slice(0, i),
          {
            questionIndex: index,
            answers: [
              ...userAnswers[i].answers,
              { statementIndex, value: event.target.value },
            ],
          },
          ...userAnswers.slice(i + 1),
        ]);
      } else {
        setUserAnswers([
          ...userAnswers.slice(0, i),
          {
            questionIndex: index,
            answers: [
              ...userAnswers[i].answers.slice(0, j),
              { statementIndex, value: event.target.value },
              ...userAnswers[i].answers.slice(j + 1),
            ],
          },
          ...userAnswers.slice(i + 1),
        ]);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        flexWrap: "wrap",
      }}
    >
      <b>{index}.</b>
      {question.statements.map((statement, i) => {
        if (statement.statementType.id === "TEXT") {
          return (
            <p key={i} style={{ margin: "0px" }}>
              {statement.value}
            </p>
          );
        }
        if (statement.statementType.id === "FILL") {
          return (
            <input
              key={i}
              className="fill-statement-input"
              name={`$input-text-${i}`}
              value={
                isInstructor
                  ? statement.value
                  : userAnswers
                      .find((elem) => elem.questionIndex === index)
                      ?.answers.find((elem) => elem.statementIndex === i)?.value
              }
              onChange={handleChangeAnswer}
              disabled={isInstructor}
            />
          );
        }
        if (statement.statementType.id === "SELECT") {
          return (
            <select key={i}>
              <option style={{ display: "none" }}></option>
              {statement.options.map((option, i) => {
                return (
                  <option
                    key={i}
                    value={option.value}
                    selected={isInstructor && option.isAnswer === true}
                    disabled={isInstructor}
                  >
                    {option.value}
                  </option>
                );
              })}
            </select>
          );
        }
      })}
    </div>
  );
};
