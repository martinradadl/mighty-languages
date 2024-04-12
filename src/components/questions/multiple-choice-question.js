import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/questions.css";
import { EditQuestionDialog } from "./question-dialogs/edit-question-dialog";
import { DeleteQuestionDialog } from "./question-dialogs/delete-question-dialog";
import { AiFillCheckCircle } from "react-icons/ai";

export const MultipleChoiceQuestion = (props) => {
  const { selectedQuestion, index } = props;
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState();

  const handleChangeSelectedOption = (optionValue) => {
    setSelectedOption(optionValue);
  };

  return (
    <div>
      <div className="mult-choice-statement-container">
        <p className="mult-choice-statement">
          <b>{index}. </b>
          {selectedQuestion.statements[0].value}
        </p>
      </div>

      {selectedQuestion.statements[0].options.map((option, i) => {
        return (
          <div
            key={i}
            className={
              option.value === selectedOption
                ? "mult-choice-option-container selected-option"
                : "mult-choice-option-container"
            }
            onClick={() => {
              handleChangeSelectedOption(option.value);
            }}
          >
            <p className="mult-choice-option">
              <b>{String.fromCharCode(97 + i)}. </b>
              {option.value}
            </p>
            {option.isAnswer ? (
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
