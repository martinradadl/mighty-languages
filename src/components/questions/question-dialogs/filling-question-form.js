import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillPlusSquare } from "react-icons/ai";
import "../../../styles/global.css";
import "../../../styles/questions.css";

export const FillingQuestionForm = (props) => {
  const { handleStatementChange, handleOptionsChange, questionForm, setQuestionForm } = props;

  const addOptionFillingQuestion = () => {};

  const addTextInput = () => {};

  const handleTextInputChange = (event) =>{
    const temp = [...questionForm]
    const index = event.target.name.split("-")[2]
    temp[index] =  {...temp[index],value:event.target.value}
    setQuestionForm(temp)
  }

  return (
    <div className="dialog-content">
      <div className="filling-question-buttons-container">
        <button className="filling-question-button" onClick={addTextInput}>
          <b>Texto</b>
        </button>
        <button className="filling-question-button" onClick={() => {}}>
          <b>Campo de Relleno</b>
        </button>
        <button className="filling-question-button" onClick={() => {}}>
          <b>Menú de Selección</b>
        </button>
      </div>

      <div
        style={{ width: "100%", height: "100px", border: "solid black 1px" }}
      >
        {JSON.stringify(questionForm)}
        {questionForm.map((question,index)=>{
          if(question.type === 'text') {
            return <input name={`$input-text-${index}`} value={question.value} onChange={handleTextInputChange} className=""/>
          }
          return null
        })}
      </div>
    </div>
  );
};
