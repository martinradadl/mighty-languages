import React from "react";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { SelectorQuestion } from "./selector-question";
import { TypingQuestion } from "./typing-question";

const questionType = (props) => {
  return {
    selector: <SelectorQuestion {...props}/>,
    typing: <TypingQuestion {...props}/>,
    multiple: <MultipleChoiceQuestion {...props}/>,
  };
};

export const Question = () => {
    const type = "typing";
  return <div>{questionType()[type]}</div>;
};
