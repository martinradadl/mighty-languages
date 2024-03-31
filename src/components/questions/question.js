import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { FillingQuestion } from "./filling-question";

export const Question = (props) => {
  const { selectedQuestion } = props;
  const dispatch = useDispatch();

  if (selectedQuestion.type.id === "MULT_CHOICE") {
    return <MultipleChoiceQuestion selectedQuestion={selectedQuestion} />;
  } else {
    return <FillingQuestion selectedQuestion={selectedQuestion} />;
  }
};
