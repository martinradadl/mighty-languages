import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiFillDelete } from "react-icons/ai";
import "../../../styles/global.css";
import "../../../styles/questions.css";
import { useSelector } from "react-redux";

export const FillingQuestionForm = (props) => {
  const {
    handleStatementChange,
    handleOptionsChange,
    questionForm,
    setQuestionForm,
  } = props;
  const STATEMENT_TYPES = useSelector(
    (state) => state.questions.statementTypes
  );

  const addOptionFillingQuestion = () => {};

  const addInput = (type) => {
    if (type === "TEXT" || type === "FILL") {
      setQuestionForm([
        ...questionForm,
        {
          type,
          value: "",
        },
      ]);
    }
    if (type === "SELECT") {
      setQuestionForm([
        ...questionForm,
        {
          type,
          value: "",
          options: [
            { value: "", isAnswer: true },
            { value: "", isAnswer: false },
          ],
        },
      ]);
    }
  };

  const handleTextInputChange = (event) => {
    const temp = [...questionForm];
    const index = event.target.name.split("-")[2];
    temp[index] = { ...temp[index], value: event.target.value };
    setQuestionForm(temp);
  };

  const handleSelectChange = () => {};

  const getStatementInput = (statement, i) => {
    if (statement.type === "TEXT" || statement.type === "FILL") {
      return (
        <div style={{ display: "flex" }}>
          <input
            key={i}
            name={`$input-text-${i}`}
            value={statement.value}
            onChange={handleTextInputChange}
            className={statement.type === "TEXT" ? "text-statement" : "fill-statement"}
          />
          <AiFillDelete />
        </div>
      );
    }
    if (statement.type === "SELECT") {
      return null;
    }
    return null;
  };

  return (
    <div className="dialog-content">
      <div className="filling-question-buttons-container">
        {Object.keys(STATEMENT_TYPES).map((type, i) => {
          return (
            <button
              className="filling-question-button"
              onClick={() => {
                addInput(STATEMENT_TYPES[type].id);
              }}
            >
              <b>{STATEMENT_TYPES[type].label}</b>
            </button>
          );
        })}
      </div>

      <div
        style={{ width: "100%", height: "100px", border: "solid black 1px" }}
      >
        {questionForm.map((statement, i) => {
          return getStatementInput(statement, i);
        })}
      </div>
    </div>
  );
};
