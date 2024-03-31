import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiFillPlusSquare, AiFillDelete } from "react-icons/ai";
import "../../../styles/global.css";

export const MultipleChoiceForm = (props) => {
  const {
    handleStatementChange,
    handleOptionsChange,
    handleRadioButtonChange,
    handleDeleteOption,
    questionForm,
    setQuestionForm,
  } = props;

  const isDeleteOptionDisabled = questionForm.statements[0].options.length < 3;

  const addOptionMultipleChoice = () => {
    const optionsUpdated = [
      ...questionForm.statements[0].options,
      { value: "", isAnswer: false },
    ];
    const statementUpdated = {
      ...questionForm.statements[0],
      options: optionsUpdated,
    };
    setQuestionForm({
      ...questionForm,
      statements: [statementUpdated],
    });
  };

  return (
    <div className="dialog-form-container">
      <p className="dialog-form-item">
        <b>ENUNCIADO</b>
      </p>
      <textarea
        rows={3}
        className="dialog-form-textarea"
        onChange={handleStatementChange}
        name="statement-0"
        value={questionForm?.statements[0]?.value}
      />
      <p className="dialog-form-item">
        <b>OPCIONES</b>
      </p>
      {questionForm?.statements[0]?.options?.map((option, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <input
              type="radio"
              name={`button-${i}`}
              onChange={handleRadioButtonChange}
              checked={option.isAnswer}
            />
            <label
              htmlFor={`button-${i}`}
              style={{ display: "flex", flex: "1" }}
            >
              <input
                key={i}
                className="multiple-choice-option-input"
                onChange={handleOptionsChange}
                name={`option-${i}`}
                value={option.value}
              />
            </label>
            <button
              className={
                isDeleteOptionDisabled
                  ? "delete-input-button button-not-allowed"
                  : "delete-input-button"
              }
              disabled={isDeleteOptionDisabled}
              onClick={() => {
                handleDeleteOption(i);
              }}
            >
              <AiFillDelete
                className={
                  isDeleteOptionDisabled
                    ? "delete-input-icon delete-input-icon-disabled"
                    : "delete-input-icon"
                }
              />
            </button>
          </div>
        );
      })}

      <button className="add-input-button" onClick={addOptionMultipleChoice}>
        <AiFillPlusSquare className="add-input-icon" />
      </button>
    </div>
  );
};
