import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillPlusSquare } from "react-icons/ai";
import "../../styles/global.css";
import { MultipleChoiceForm } from "./multiple-choice-form";
import { useSelector } from "react-redux";
import { FillingQuestionForm } from "./filling-question-form";

const multipleChoiceFormInitialState = {
  statements: [
    {
      type: "text",
      value: "",
      options: [
        { value: "", isAnswer: true },
        { value: "", isAnswer: false },
      ],
    },
  ],
};

const fillingQuestionFormInitialState = {
  statements: [],
};

// type: {
//   id: {
//     type: MULT_CHOICE,
//   },
//   value: String,
// },
// lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
// statements: [
//   {
//     type: String,
//     value: String,
//     options: [{ value: String, isAnswer: Boolean }],
//   },
// ],

export const QuestionDialog = (props) => {
  const {
    closeModal,
    handleStatementChange,
    handleOptionsChange,
    addOption,
    onSubmit,
    isOpen,
    questionForm,
    setQuestionForm,
    dialogTrigger,
    submitButtonText,
  } = props;
  const QUESTION_TYPES = useSelector((state) => state.questions.questionTypes);
  const [questionType, setQuestionType] = useState(
    QUESTION_TYPES["MULT_CHOICE"].id
  );

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
              >
                {Object.keys(QUESTION_TYPES).map((type, i) => {
                  return (
                    <option key={i} value={QUESTION_TYPES[type].id}>
                      {QUESTION_TYPES[type].value}
                    </option>
                  );
                })}
              </select>
              {questionType === QUESTION_TYPES["MULT_CHOICE"].id ? (
                <MultipleChoiceForm
                  {...{
                    handleStatementChange,
                    handleOptionsChange,
                    addOption,
                    questionForm,
                  }}
                />
              ) : (
                <FillingQuestionForm
                  {...{
                    handleStatementChange,
                    handleOptionsChange,
                    addOption,
                    questionForm,
                  }}
                />
              )}

              <button className="dialog-form-submit" onClick={onSubmit}>
                <b>{submitButtonText}</b>
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
