import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { QuestionDialog } from "./question-dialog";
import questionsActions from "../../../redux/actions/questions";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const EditQuestionDialog = (props) => {
  const { question } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [questionForm, setQuestionForm] = useState(question.statements);
  const params = useParams();
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
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
    const updatedQuestion = {
      _id: question._id,
      type: question.type,
      statements: questionForm,
      lessonId: params.id,
    };
    dispatch(questionsActions.editQuestion(updatedQuestion))
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
    const updatedQuestion = {
      _id: question._id,
      type: question.type,
      statements: questionForm,
      lessonId: params.id,
    };
    dispatch(questionsActions.editQuestion(updatedQuestion))
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
        selectedQuestionType: question.type,
        dialogTrigger: (
          <div
            className="clickable-container"
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            <AiFillEdit size={20} />
          </div>
        ),
        submitButtonText: "Editar Pregunta",
      }}
    />
  );
};
