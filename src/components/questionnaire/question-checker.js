import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export const QuestionChecker = (props) => {
  const { isCorrect } = props;
  return isCorrect ? <AiFillCheckCircle /> : <AiFillCloseCircle />;
};
