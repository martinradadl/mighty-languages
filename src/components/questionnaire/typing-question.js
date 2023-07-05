import React from "react";
import { QuestionChecker } from "./question-checker";

export const TypingQuestion = () => {
  const isCorrect = true;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "10px" }}>
        {isCorrect !== undefined ? (
          <QuestionChecker isCorrect={isCorrect} />
        ) : null}
      </div>
      <p>
        ¿Cómo se escribe 2? <input type="text" style={{width:"100px"}} />
      </p>
    </div>
  );
};
