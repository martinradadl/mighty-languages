import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { FillingQuestion } from "./filling-question";
import { EditQuestionDialog } from "./question-dialogs/edit-question-dialog";
import { DeleteQuestionDialog } from "./question-dialogs/delete-question-dialog";
import "../../styles/questions.css";

export const Question = (props) => {
  const { selectedQuestion, index, isInstructor } = props;

  return (
    <div className="question-container">
      {selectedQuestion.type.id === "MULT_CHOICE" ? (
        <MultipleChoiceQuestion
          selectedQuestion={selectedQuestion}
          index={index}
          isInstructor={isInstructor}
        />
      ) : (
        <FillingQuestion
          selectedQuestion={selectedQuestion}
          index={index}
          isInstructor={isInstructor}
        />
      )}
      <div style={{ display: "flex", marginLeft: "auto", gap: "4px" }}>
        <EditQuestionDialog selectedQuestion={selectedQuestion} />
        <DeleteQuestionDialog id={selectedQuestion._id} />
      </div>
    </div>
  );
};
