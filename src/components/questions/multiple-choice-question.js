import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/questions.css";
import { AiFillCheckCircle } from "react-icons/ai";

export const MultipleChoiceQuestion = (props) => {
  const { selectedQuestion, index, isInstructor } = props;
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
            className={"mult-choice-option-container"}
            onClick={() => {
              if (!isInstructor) handleChangeSelectedOption(option.value);
            }}
          >
            <p
              className={
                option.value === selectedOption
                  ? "mult-choice-option selected-option"
                  : "mult-choice-option"
              }
              style={{ cursor: isInstructor ? "not-allowed" : "pointer" }}
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
