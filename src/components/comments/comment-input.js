import React, { useState } from "react";
import "../../styles/comments/comment-input.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import commentsActions from "../../redux/actions/comments";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";


export const CommentInput = () => {
  const params = useParams();
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment === "") {
      Toastify({
        text: "El comentario no debe estar vacío",
        duration: 3000,
      }).showToast();
    } else {
      dispatch(
        commentsActions.addComment({
          user: user._id,
          comment: comment,
          lessonId: params.id,
        })
      )
        .unwrap()
        .then((res) => {
          setComment("");
        })
        .catch((e) => {
          Toastify({
            text: e.message,
            duration: 3000,
          }).showToast();
        });
    }
  };

  return (
    <div className="new-comment-container">
      <h3>Escribe un Comentario</h3>
      <textarea rows={5} onChange={handleChange} value={comment} />
      <button onClick={handleAddComment}>Enviar</button>
    </div>
  );
};
