import React from "react";
import { QuestionChecker } from "./question-checker";

export const SelectorQuestion = () => {
  const isCorrect = true;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{marginRight: "10px"}}>
        {isCorrect !== undefined ? (
          <QuestionChecker isCorrect={isCorrect} />
        ) : null}
      </div>
      <p>
        Mein Zimmer ist{" "}
        <select name="answers">
          <option value="1">langsam</option>
          <option value="2">kalt</option>
          <option value="3">spät</option>
        </select>
        .
      </p>
    </div>
  );
};
