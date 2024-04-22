import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import lessonsActions from "../../../redux/actions/lessons";
import questionsActions from "../../../redux/actions/questions";
import "../../../styles/questions.css";
import { Dialog } from "@headlessui/react";
import { AiFillDelete, AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";

export const SelectStatementDialog = (props) => {
  const {
    dialogTrigger,
    initialState,
    addSelectStatement,
    editSelectStatement,
    submitText,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectForm, setSelectForm] = useState(initialState);

  function closeModal() {
    setIsOpen(false);
    setSelectForm(initialState);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleAddOption = () => {
    setSelectForm([
      ...selectForm,
      {
        value: "",
        isAnswer: false,
      },
    ]);
  };

  const handleOptionChange = (e) => {
    const selectFormCopy = [...selectForm];
    const index = e.target.name.split("-")[1];
    selectFormCopy[index].value = e.target.value;
    setSelectForm(selectFormCopy);
  };

  const handleRadioButtonChange = (e) => {
    const selectFormCopy = [...selectForm];
    const lastAnswerIndex = selectForm.findIndex(
      (elem) => elem.isAnswer === true
    );
    if (lastAnswerIndex !== -1)
      selectFormCopy[lastAnswerIndex].isAnswer = false;
    const newAnswerIndex = e.target.name.split("-")[1];
    selectFormCopy[newAnswerIndex].isAnswer = true;
    setSelectForm(selectFormCopy);
  };

  const handleDeleteOption = (i) => {
    let selectFormCopy = [
      ...selectForm.slice(0, i),
      ...selectForm.slice(i + 1),
    ];
    setSelectForm(selectFormCopy);
  };

  const onSubmit = () => {
    if (selectForm.some((option) => option.value === "")) {
      return alert("Faltan campos por llenar");
    }
    if (!selectForm.some((option) => option.isAnswer === true)) {
      return alert("Falta elegir la respuesta");
    }
    submitText === "Agregar Menú"
      ? addSelectStatement(selectForm)
      : editSelectStatement(selectForm);
    closeModal();
  };

  const isDeleteOptionDisabled = selectForm.length < 3;

  return (
    <Fragment>
      <div onClick={openModal}>{dialogTrigger}</div>
      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
            />
            <div className="dialog-content">
              <p className="dialog-form-item">
                <b>OPCIONES</b>
              </p>
              {selectForm.map((option, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <input
                      type="radio"
                      name={`button-${i}`}
                      onChange={handleRadioButtonChange}
                      checked={option.isAnswer}
                    />
                    <label
                      htmlFor={`button-${i}`}
                      style={{ display: "flex", flex: "1" }}
                    >
                      <input
                        key={i}
                        className="multiple-choice-option-input"
                        onChange={handleOptionChange}
                        name={`option-${i}`}
                        value={option.value}
                      />
                    </label>
                    <button
                      className={
                        isDeleteOptionDisabled
                          ? "delete-input-button click-not-allowed"
                          : "delete-input-button"
                      }
                      disabled={isDeleteOptionDisabled}
                      onClick={() => {
                        handleDeleteOption(i);
                      }}
                    >
                      <AiFillDelete
                        className={
                          isDeleteOptionDisabled
                            ? "delete-input-icon delete-input-icon-disabled"
                            : "delete-input-icon"
                        }
                      />
                    </button>
                  </div>
                );
              })}

              <button className="add-input-button" onClick={handleAddOption}>
                <AiFillPlusSquare className="add-input-icon" />
              </button>

              <button className="dialog-form-submit" onClick={onSubmit}>
                <b>{submitText}</b>
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
