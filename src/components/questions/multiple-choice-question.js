import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const MultipleChoiceQuestion = (props) => {
  const {selectedQuestion} = props;
  const dispatch = useDispatch();

  return (

    <p>{selectedQuestion}</p>)
  
};
