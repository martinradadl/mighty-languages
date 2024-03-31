import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const FillingQuestion = (props) => {
  const {selectedQuestion} = props;
  const dispatch = useDispatch();

  return (
    <p>Question</p>)
  
};
