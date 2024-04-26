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
    selectedQuestionType?.id === "MULT_CHOICE" ||
      selectedQuestionType === undefined
      ? QUESTION_TYPES["MULT_CHOICE"].id
      : QUESTION_TYPES["FILLING"].id
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

  const fillingQuestionFormInitialState = [];

  const handleChangeQuestionType = (event) => {
    setQuestionType(event.target.value);
    event.target.value === QUESTION_TYPES["MULT_CHOICE"].id
      ? setQuestionForm(multipleChoiceFormInitialState)
      : setQuestionForm(fillingQuestionFormInitialState);
  };

  const handleStatementChange = (e) => {
    const questionFormCopy = [...questionForm];
    const statementIndex = e.target.name.split("-")[1];
    questionFormCopy[statementIndex] = {
      ...questionFormCopy[statementIndex],
      value: e.target.value,
    };
    setQuestionForm(questionFormCopy);
  };

  const handleOptionsChange = (e) => {
    const optionsCopy = [...questionForm[0].options];
    const optionIndex = e.target.name.split("-")[1];
    optionsCopy[optionIndex] = {
      ...optionsCopy[optionIndex],
      value: e.target.value,
    };
    setQuestionForm([
      {
        ...questionForm[0],
        options: optionsCopy,
      },
    ]);
  };

  const handleRadioButtonChange = (e) => {
    const optionsCopy = [...questionForm[0].options];
    const lastAnswerIndex = questionForm[0].options.findIndex(
      (elem) => elem.isAnswer === true
    );
    if (lastAnswerIndex !== -1) {
      optionsCopy[lastAnswerIndex] = {
        ...optionsCopy[lastAnswerIndex],
        isAnswer: false,
      };
    }
    const newAnswerIndex = e.target.name.split("-")[1];
    optionsCopy[newAnswerIndex] = {
      ...optionsCopy[newAnswerIndex],
      isAnswer: true,
    };
    setQuestionForm([
      {
        ...questionForm[0],
        options: optionsCopy,
      },
    ]);
  };

  const handleDeleteOption = (i) => {
    let optionsCopy = [...questionForm[0].options];
    optionsCopy = [...optionsCopy.slice(0, i), ...optionsCopy.slice(i + 1)];
    setQuestionForm([
      {
        ...questionForm[0],
        options: optionsCopy,
      },
    ]);
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
