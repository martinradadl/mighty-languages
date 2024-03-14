import React, { useState } from "react";
import "../../styles/lessons/lesson-dialog.css";
import { QuestionDialog } from "./lesson-dialog";
import { useDispatch } from "react-redux";
import lessonsActions from "../../redux/actions/lessons";
import questionsActions from "../../redux/actions/questions";

export const EditLessonDialog = (props) => {
  const { selectedQuestion, isOpen, setIsOpen } = props;
  const [questionForm, setQuestionForm] = useState(selectedQuestion);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    setLessonForm({ ...questionForm, [event.target.name]: event.target.value });
  };

  const handleStatementsChange = (e) => {
    const statementsCopy = [...questionForm.statements];
    const statementIndex = e.target.name.split("-")[1];
    statementsCopy[statementIndex] = e.target.value;
    setQuestionForm({ ...questionForm, statements: statementsCopy });
  };

  const onSubmit = () => {
    if (questionForm.type === "" || lessonForm.statements.length < 3) {
      alert("Faltan campos por llenar");
    } else {
      dispatch(
        questionsActions.editQuestion({
          _id: selectedQuestion._id,
          type: questionForm.type,
          statements: questionForm.statements,
          lesson: selectedQuestion.lesson,
        })
      )
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  return (
    <QuestionDialog
      {...{
        openModal,
        closeModal,
        handleChange,
        handleStatementsChange,
        onSubmit,
        isOpen,
        questionForm,
        submitButtonText: "Editar Pregunta",
      }}
    />
  );
};
