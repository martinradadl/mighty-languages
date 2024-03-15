import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import lessonsActions from "../../redux/actions/lessons";
import { QuestionDialog } from "./question-dialog";
import questionsActions from "../../redux/actions/questions";


const questionFormInitialState = {
  statements: [],
};

export const AddQuestionDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [questionForm, setQuestionForm] = useState(questionFormInitialState);
  const params = useParams();
  const dispatch = useDispatch();
  const QUESTION_TYPES = useSelector((state) => state.questions.questionTypes);

  function closeModal() {
    setIsOpen(false);
    setQuestionForm(questionFormInitialState);
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
    optionsCopy[optionIndex] = e.target.value;
    setQuestionForm({ ...questionForm, statements: optionsCopy });
  };

  const addOption = () => {
    // setQuestionForm({
    //   ...questionForm,
    //   statements: [...questionForm.statements, ""],
    // });
  };

  const onSubmit = () => {
    if (questionForm.type === "" || questionForm.statements.length < 3) {
      alert("Faltan campos por llenar");
    } else {
      dispatch(
        questionsActions.addQuestion({
          type: questionForm.type,
          statements: questionForm.statements,
          lessonId: params.id,
        })
      )
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <QuestionDialog
      {...{
        openModal,
        closeModal,
        handleStatementChange,
        handleOptionsChange,
        addOption,
        onSubmit,
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
