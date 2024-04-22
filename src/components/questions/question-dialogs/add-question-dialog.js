import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import lessonsActions from "../../../redux/actions/lessons";
import { QuestionDialog } from "./question-dialog";
import questionsActions from "../../../redux/actions/questions";
import { type } from "@testing-library/user-event/dist/type";

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

  const addStatement = () => {
    setQuestionForm([
      ...questionForm,
      {
        type: "",
        value: "",
        options: [],
      },
    ]);
  };

  const onSubmitMultipleChoice = () => {
    if (
      questionForm[0].value === "" ||
      questionForm[0].options.some((option) => option.value === "")
    ) {
      return alert("Faltan campos por llenar");
    }
    if (!questionForm[0].options.some((option) => option.isAnswer === true)) {
      return alert("Falta elegir la respuesta");
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
      return alert("Faltan campos por llenar");
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
