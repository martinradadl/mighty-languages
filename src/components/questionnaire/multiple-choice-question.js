import React from "react";

export const MultipleChoiceQuestion = () => {
  return <div>
    <p>De qué otra forma se puede decir "Mein Name ist...":</p>
    <ul>
        <input type="radio" id="1"/>
        <label for="1">Ich bin aus...</label><br/>
        <input type="radio" id="2"/>
        <label for="2">Mein Name bin...</label><br/>
        <input type="radio" id="3"/>
        <label for="3">Ich heiße...</label><br/>
    </ul>
  </div>;
};