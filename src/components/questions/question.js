import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { FillingQuestion } from "./filling-question";
import { EditQuestionDialog } from "./question-dialogs/edit-question-dialog";
import { DeleteQuestionDialog } from "./question-dialogs/delete-question-dialog";
import "../../styles/questions.css";

export const Question = (props) => {
  const {
    question,
    index,
    isInstructor,
    isAdmin,
    userAnswers,
    setUserAnswers,
  } = props;

  return (
    <div className="question-container">
      {question.type.id === "MULT_CHOICE" ? (
        <MultipleChoiceQuestion
          {...{
            question,
            index,
            isInstructor,
            userAnswers,
            setUserAnswers,
          }}
        />
      ) : (
        <FillingQuestion
          {...{
            question,
            index,
            isInstructor,
            userAnswers,
            setUserAnswers,
          }}
        />
      )}
      {isInstructor || isAdmin ? (
        <div style={{ display: "flex", marginLeft: "auto", gap: "4px" }}>
          <EditQuestionDialog question={question} />
          <DeleteQuestionDialog id={question._id} />
        </div>
      ) : null}
    </div>
  );
};
