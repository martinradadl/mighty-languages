import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillPlusSquare } from "react-icons/ai";
import "../../../styles/global.css";
import { MultipleChoiceForm } from "./multiple-choice-form";
import { useSelector } from "react-redux";
import { FillingQuestionForm } from "./filling-question-form";
import questionsActions from "../../../redux/actions/questions";

export const QuestionDialog = (props) => {
  const {
    closeModal,
    handleStatementChange,
    handleOptionsChange,
    handleRadioButtonChange,
    handleDeleteOption,
    isOpen,
    questionForm,
    setQuestionForm,
    selectedQuestionType,
    onSubmitMultipleChoice,
    onSubmitFilling,
    dialogTrigger,
    submitButtonText,
  } = props;
  const QUESTION_TYPES = useSelector((state) => state.questions.questionTypes);
  const STATEMENT_TYPES = useSelector(
    (state) => state.questions.statementTypes
  );
  const [questionType, setQuestionType] = useState(
    QUESTION_TYPES["MULT_CHOICE"].id
  );

  const multipleChoiceFormInitialState = [
    {
      statementType: STATEMENT_TYPES["TEXT"],
      value: "",
      options: [
        { value: "", isAnswer: true },
        { value: "", isAnswer: false },
      ],
    },
  ];

  const fillingQuestionFormInitialState = [
    {
      type: "",
      value: "",
    },
  ];

  const handleChangeQuestionType = (event) => {
    setQuestionType(event.target.value);
    event.target.value === QUESTION_TYPES["MULT_CHOICE"].id
      ? setQuestionForm(multipleChoiceFormInitialState)
      : setQuestionForm(fillingQuestionFormInitialState);
  };

  return (
    <Fragment>
      {dialogTrigger}
      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
            />
            <div className="dialog-content">
              <p className="dialog-form-item">
                <b>TIPO DE PREGUNTA</b>
              </p>
              <select
                className="dialog-form-select"
                value={questionType}
                onChange={handleChangeQuestionType}
                disabled={submitButtonText === "Editar Pregunta"}
              >
                {Object.keys(QUESTION_TYPES).map((type, i) => {
                  return (
                    <option key={i} value={QUESTION_TYPES[type].id}>
                      {QUESTION_TYPES[type].label}
                    </option>
                  );
                })}
              </select>
              {questionType === QUESTION_TYPES["MULT_CHOICE"].id ? (
                <MultipleChoiceForm
                  {...{
                    handleStatementChange,
                    handleOptionsChange,
                    handleRadioButtonChange,
                    handleDeleteOption,
                    questionForm,
                    setQuestionForm,
                  }}
                />
              ) : (
                <FillingQuestionForm
                  {...{
                    handleStatementChange,
                    handleOptionsChange,
                    questionForm,
                    setQuestionForm,
                  }}
                />
              )}

              <button
                className="dialog-form-submit"
                onClick={() => {
                  questionType === QUESTION_TYPES["MULT_CHOICE"].id
                    ? onSubmitMultipleChoice()
                    : onSubmitFilling();
                }}
              >
                <b>{submitButtonText}</b>
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
