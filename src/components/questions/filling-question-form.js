import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillPlusSquare } from "react-icons/ai";
import "../../styles/global.css";

export const FillingQuestionForm = (props) => {
  const {
    handleStatementChange,
    handleOptionsChange,
    addOption,
    questionForm,
  } = props;

  return (
    <div className="dialog-content">
      <div className="filling-question-buttons-container">
        <button className="filling-question-button" onClick={() => {}}>
          <b>Menú</b>
        </button>
        <button className="filling-question-button" onClick={() => {}}>
          <b>Campo de Texto</b>
        </button>
      </div>

      <textarea
        rows={6}
        className="dialog-form-textarea"
        onChange={handleStatementChange}
        name="statement-0"
        value={questionForm.statements[0]}
      />
      <p className="dialog-form-item">
        <b>OPCIONES</b>
      </p>

      {questionForm?.statements[0]?.options.map((option, i) => {
        return (
          <input
            key={i}
            className="dialog-form-input"
            onChange={handleOptionsChange}
            name={`option-${i}`}
            value={option.value}
          />
        );
      })}

      <button className="add-input-button" onClick={addOption}>
        <AiFillPlusSquare className="add-input-icon" />
      </button>
    </div>
  );
};
