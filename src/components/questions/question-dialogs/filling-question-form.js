import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "../../../styles/global.css";
import "../../../styles/questions.css";
import { useSelector } from "react-redux";
import { SelectStatementDialog } from "./select-statement-dialog";

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

  const addInput = (statementType) => {
    setQuestionForm([
      ...questionForm,
      {
        statementType,
        value: "",
      },
    ]);
  };

  const deleteInput = (i) => {
    const questionCopy = [
      ...questionForm.slice(0, i),
      ...questionForm.slice(i + 1),
    ];
    setQuestionForm(questionCopy);
  };

  const handleTextInputChange = (event) => {
    const temp = [...questionForm];
    const index = event.target.name.split("-")[2];
    temp[index] = { ...temp[index], value: event.target.value };
    setQuestionForm(temp);
  };

  const addSelectStatement = (options) => {
    setQuestionForm([
      ...questionForm,
      {
        statementType: STATEMENT_TYPES["SELECT"],
        options,
      },
    ]);
  };

  const editSelectStatement = (options, i) => {
    const updatedStatement = {
      statementType: STATEMENT_TYPES["SELECT"],
      options,
    };
    const questionCopy = [
      ...questionForm.slice(0, i),
      updatedStatement,
      ...questionForm.slice(i + 1),
    ];
    setQuestionForm(questionCopy);
  };

  const getStatementInput = (statement, i) => {
    if (
      statement.statementType.id === "TEXT" ||
      statement.statementType.id === "FILL"
    ) {
      return (
        <div
          key={i}
          style={{ display: "flex", alignItems: "center", margin: "2px" }}
        >
          <input
            name={`$input-text-${i}`}
            value={statement.value}
            onChange={handleTextInputChange}
            className={
              statement.statementType.id === "TEXT"
                ? "form-text-statement"
                : "form-fill-statement"
            }
          />
          <AiFillDelete
            size={14}
            className="clickable-container"
            onClick={() => {
              deleteInput(i);
            }}
          />
        </div>
      );
    }
    if (statement.statementType.id === "SELECT") {
      return (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "2px",
            gap: "2px",
          }}
        >
          <select className="select-statement">
            {statement.options.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.value}
                </option>
              );
            })}
          </select>
          <SelectStatementDialog
            {...{
              key: i,
              dialogTrigger: (
                <AiFillEdit size={14} className="clickable-container" />
              ),
              initialState: statement.options,
              editSelectStatement,
              submitText: "Editar Menú",
              index: i,
            }}
          />

          <AiFillDelete
            size={14}
            className="clickable-container"
            onClick={() => {
              deleteInput(i);
            }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dialog-content">
      <div className="filling-question-buttons-container">
        {Object.keys(STATEMENT_TYPES).map((type, i) => {
          return STATEMENT_TYPES[type].id === "SELECT" ? (
            <SelectStatementDialog
              {...{
                key: i,
                dialogTrigger: (
                  <button className="filling-question-button">
                    <b>{STATEMENT_TYPES[type].label}</b>
                  </button>
                ),
                initialState: [
                  { value: "", isAnswer: true },
                  { value: "", isAnswer: false },
                ],
                addSelectStatement,
                submitText: "Agregar Menú",
              }}
            />
          ) : (
            <button
              key={i}
              className="filling-question-button"
              onClick={() => {
                addInput(STATEMENT_TYPES[type]);
              }}
            >
              <b>{STATEMENT_TYPES[type].label}</b>
            </button>
          );
        })}
      </div>

      <div
        style={{
          width: "100%",
          height: "100px",
          border: "solid black 1px",
          overflow: "auto",
        }}
      >
        {questionForm.map((statement, i) => {
          return getStatementInput(statement, i);
        })}
      </div>
    </div>
  );
};
