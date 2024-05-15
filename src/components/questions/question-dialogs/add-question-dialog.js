import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QuestionDialog } from "./question-dialog";
import questionsActions from "../../../redux/actions/questions";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const AddQuestionDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const QUESTION_TYPES = useSelector((state) => state.questions.questionTypes);
  const STATEMENT_TYPES = useSelector(
    (state) => state.questions.statementTypes
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

  const [questionForm, setQuestionForm] = useState(
    multipleChoiceFormInitialState
  );

  function closeModal() {
    setIsOpen(false);
    setQuestionForm(multipleChoiceFormInitialState);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmitMultipleChoice = () => {
    if (
      questionForm[0].value === "" ||
      questionForm[0].options.some((option) => option.value === "")
    ) {
      return Toastify({
        text: "Faltan campos por llenar",
        duration: 3000,
      }).showToast();
    }
    if (!questionForm[0].options.some((option) => option.isAnswer === true)) {
      return Toastify({
        text: "Falta elegir la respuesta",
        duration: 3000,
      }).showToast();
    }
    const newQuestion = {
      type: QUESTION_TYPES["MULT_CHOICE"],
      statements: questionForm,
      lessonId: params.id,
    };
    dispatch(questionsActions.addQuestion(newQuestion))
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmitFilling = () => {
    if (
      questionForm.some(
        (statement) =>
          statement.statementType !== "SELECT" && statement.value === ""
      )
    ) {
      return Toastify({
        text: "Faltan campos por llenar",
        duration: 3000,
      }).showToast();
    }
    const newQuestion = {
      type: QUESTION_TYPES["FILLING"],
      statements: questionForm,
      lessonId: params.id,
    };
    dispatch(questionsActions.addQuestion(newQuestion))
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <QuestionDialog
      {...{
        closeModal,
        isOpen,
        questionForm,
        setQuestionForm,
        onSubmitMultipleChoice,
        onSubmitFilling,
        dialogTrigger: (
          <div>
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
