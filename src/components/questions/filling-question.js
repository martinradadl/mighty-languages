import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/questions.css";

export const FillingQuestion = (props) => {
  const { selectedQuestion, index } = props;
  const dispatch = useDispatch();
  const [userResponses, setUserResponses] = useState([]);

  const handleChangeSelectedResponse = (event) => {
    const temp = [...userResponses];
    const index = event.target.name.split("-")[2];
    temp[index] = { ...temp[index], value: event.target.value };
    setUserResponses(temp);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <b>{index}. </b>
      {selectedQuestion.statements.map((statement, i) => {
        if (statement.statementType.id === "TEXT") {
          return (
            <p key={i} style={{ margin: "0px" }}>
              {statement.value}
            </p>
          );
        }
        if (statement.statementType.id === "FILL") {
          return (
            <input
              key={i}
              className="fill-statement-input"
              name={`$input-text-${i}`}
              value={userResponses[i]}
              onChange={handleChangeSelectedResponse}
            />
          );
        }
        if (statement.statementType.id === "SELECT") {
          return (
            <select key={i}>
              {statement.options.map((option, i) => {
                return (
                  <option key={i} value={i}>
                    {option.value}
                  </option>
                );
              })}
            </select>
          );
        }
      })}
    </div>
  );
};
