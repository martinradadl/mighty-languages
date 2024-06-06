import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/questions.css";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import quizResultsActions from "../../redux/actions/quiz-results";
import { isAnswerCorrect } from "../../pages/helpers";

export const FillingQuestion = (props) => {
  const { question, index, isInstructor, isSubmitted } = props;
  const dispatch = useDispatch();
  const userAnswers = useSelector((state) => state.quiz_results.quizResults.userAnswers);

  const handleChangeAnswer = (event) => {
    const statementIndex = parseInt(event.target.name.split("-")[2]);
    const i = userAnswers.findIndex((elem) => elem.questionIndex === index);
    if (i === -1) {
      const newAnswer = {
        questionIndex: index,
        answers: [{ statementIndex, value: event.target.value }],
      };
      dispatch(quizResultsActions.setUserAnswers([...userAnswers, newAnswer]));
    } else {
      const j = userAnswers[i].answers.findIndex(
        (elem) => elem.statementIndex === statementIndex
      );
      if (j === -1) {
        dispatch(
          quizResultsActions.setUserAnswers([
            ...userAnswers.slice(0, i),
            {
              questionIndex: index,
              answers: [
                ...userAnswers[i].answers,
                { statementIndex, value: event.target.value },
              ],
            },
            ...userAnswers.slice(i + 1),
          ])
        );
      } else {
        dispatch(
          quizResultsActions.setUserAnswers([
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
          ])
        );
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
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "2px",
              }}
            >
              <input
                className="fill-statement-input"
                name={`$input-text-${i}`}
                value={
                  isInstructor
                    ? statement.value
                    : userAnswers
                        .find((elem) => elem.questionIndex === index)
                        ?.answers.find((elem) => elem.statementIndex === i)
                        ?.value || ""
                }
                onChange={handleChangeAnswer}
                disabled={isInstructor || isSubmitted}
              />
              {isSubmitted &&
              isAnswerCorrect({
                statementIndex: i,
                statementType: statement.statementType.id,
                question,
                userAnswers,
                index,
              }) ? (
                <AiFillCheckCircle
                  size={16}
                  style={{ color: "darkgreen", marginLeft: "2px" }}
                />
              ) : null}
              {isSubmitted &&
              !isAnswerCorrect({
                statementIndex: i,
                statementType: statement.statementType.id,
                question,
                userAnswers,
                index,
              }) ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <p
                    style={{ margin: "0px", fontSize: "0.9rem" }}
                  >{`(${statement.value})`}</p>
                  <AiFillCloseCircle
                    size={16}
                    style={{ color: "red", marginLeft: "2px" }}
                  />
                </div>
              ) : null}
            </div>
          );
        }
        if (statement.statementType.id === "SELECT") {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "2px",
              }}
            >
              <select
                name={`$input-select-${i}`}
                value={
                  isInstructor
                    ? statement.options.find((elem) => elem.isAnswer === true)
                        ?.value
                    : userAnswers
                        .find((elem) => elem.questionIndex === index)
                        ?.answers.find((elem) => elem.statementIndex === i)
                        ?.value || ""
                }
                onChange={handleChangeAnswer}
              >
                <option style={{ display: "none" }}></option>
                {statement.options.map((option, i) => {
                  return (
                    <option
                      key={i}
                      className={
                        isInstructor && option.isAnswer ? "select-answer" : ""
                      }
                      value={option.value}
                      disabled={isInstructor || isSubmitted}
                    >
                      {option.value}
                    </option>
                  );
                })}
              </select>
              {isSubmitted &&
              isAnswerCorrect({
                statementIndex: i,
                statementType: statement.statementType.id,
                question,
                userAnswers,
                index,
              }) ? (
                <AiFillCheckCircle
                  size={16}
                  style={{ color: "darkgreen", marginLeft: "2px" }}
                />
              ) : null}
              {isSubmitted &&
              !isAnswerCorrect({
                statementIndex: i,
                statementType: statement.statementType.id,
                question,
                userAnswers,
                index,
              }) ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <p style={{ margin: "0px", fontSize: "0.9rem" }}>{`(${
                    statement.options.find((elem) => elem.isAnswer === true)
                      .value
                  })`}</p>
                  <AiFillCloseCircle
                    size={16}
                    style={{ color: "red", marginLeft: "2px" }}
                  />
                </div>
              ) : null}
            </div>
          );
        }
      })}
    </div>
  );
};
