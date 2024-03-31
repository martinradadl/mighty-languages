import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import lessonsActions from "../../../redux/actions/lessons";
import { QuestionDialog } from "./question-dialog";
import questionsActions from "../../../redux/actions/questions";

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

export const AddQuestionDialog = (props) => {
  const { lessonId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [questionForm, setQuestionForm] = useState(
    multipleChoiceFormInitialState
  );
  const params = useParams();
  const dispatch = useDispatch();
  const QUESTION_TYPES = useSelector((state) => state.questions.questionTypes);

  function closeModal() {
    setIsOpen(false);
    setQuestionForm(multipleChoiceFormInitialState);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleStatementChange = (e) => {
    const statementsCopy = [...questionForm.statements];
    const statementIndex = e.target.name.split("-")[1];
    statementsCopy[statementIndex].value = e.target.value;

    setQuestionForm({ ...questionForm, statements: statementsCopy });
  };

  const addStatement = () => {
    setQuestionForm({
      ...questionForm,
      statements: [
        ...questionForm.statements,
        {
          type: "",
          value: "",
          options: [],
        },
      ],
    });
  };

  const handleOptionsChange = (e) => {
    const optionsCopy = [...questionForm.statements[0].options];
    const optionIndex = e.target.name.split("-")[1];
    optionsCopy[optionIndex].value = e.target.value;
    const statementUpdated = {
      ...questionForm.statements[0],
      options: optionsCopy,
    };
    setQuestionForm({ ...questionForm, statements: [statementUpdated] });
  };

  const handleRadioButtonChange = (e) => {
    const optionsCopy = [...questionForm.statements[0].options];
    const lastAnswerIndex = questionForm.statements[0].options.findIndex(
      (elem) => elem.isAnswer === true
    );
    if (lastAnswerIndex !== -1) optionsCopy[lastAnswerIndex].isAnswer = false;
    const newAnswerIndex = e.target.name.split("-")[1];
    optionsCopy[newAnswerIndex].isAnswer = true;
    const statementCopy = {
      ...questionForm.statements[0],
      options: optionsCopy,
    };
    setQuestionForm({ ...questionForm, statements: [statementCopy] });
  };

  const handleDeleteOption = (i) => {
    let optionsCopy = [...questionForm.statements[0].options];
    optionsCopy = [...optionsCopy.slice(0, i), ...optionsCopy.slice(i + 1)];
    const statementCopy = {
      ...questionForm.statements[0],
      options: optionsCopy,
    };
    setQuestionForm({ ...questionForm, statements: [statementCopy] });
  };

  
  return (
    <QuestionDialog
      {...{
        openModal,
        closeModal,
        handleStatementChange,
        handleOptionsChange,
        handleRadioButtonChange,
        handleDeleteOption,
        isOpen,
        questionForm,
        setQuestionForm,
        dialogTrigger: (
          <div className="open-dialog-button-container">
            <button
              type="button"
              className="open-dialog-button"
              onClick={openModal}
            >
              Agregar Pregunta
            </button>
          </div>
        ),
        submitButtonText: "Agregar Pregunta",
      }}
    />
  );
};
