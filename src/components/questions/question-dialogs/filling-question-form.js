import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillPlusSquare } from "react-icons/ai";
import "../../../styles/global.css";
import "../../../styles/questions.css";

export const FillingQuestionForm = (props) => {
  const { handleStatementChange, handleOptionsChange, questionForm } = props;

  const addOptionFillingQuestion = () => {};

  return (
    <div className="dialog-content">
      <div className="filling-question-buttons-container">
        <button className="filling-question-button" onClick={() => {}}>
          <b>Texto</b>
        </button>
        <button className="filling-question-button" onClick={() => {}}>
          <b>Campo de Relleno</b>
        </button>
        <button className="filling-question-button" onClick={() => {}}>
          <b>Menú de Selección</b>
        </button>
      </div>

      {/* <textarea
        rows={6}
        className="dialog-form-textarea"
        onChange={handleStatementChange}
        name="statement-0"
        value={questionForm[0].value}
      /> */}

      <div style={{ width: "100%", height: "100px", border: "solid black 1px" }}></div>

      <p className="dialog-form-item">
        <b>OPCIONES</b>
      </p>

      {questionForm[0]?.options.map((option, i) => {
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

      <button className="add-input-button" onClick={addOptionFillingQuestion}>
        <AiFillPlusSquare className="add-input-icon" />
      </button>
    </div>
  );
};
