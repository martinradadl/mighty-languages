import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { QuestionDialog } from "./question-dialog";
import questionsActions from "../../../redux/actions/questions";

export const EditQuestionDialog = (props) => {
  const { selectedQuestion } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [questionForm, setQuestionForm] = useState(selectedQuestion.statements);
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
      return alert("Faltan campos por llenar");
    }
    if (!questionForm[0].options.some((option) => option.isAnswer === true)) {
      return alert("Falta elegir la respuesta");
    }
    const updatedQuestion = {
      _id: selectedQuestion._id,
      type: selectedQuestion.type,
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
      return alert("Faltan campos por llenar");
    }
    const updatedQuestion = {
      _id: selectedQuestion._id,
      type: selectedQuestion.type,
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
        selectedQuestionType: selectedQuestion.type,
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
