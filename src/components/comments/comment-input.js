import React, { useState } from "react";
import "../../styles/comments/comment-input.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import commentsActions from "../../redux/actions/comments";

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
      alert("El comentario no debe estar vacío");
    } else {
      dispatch(
        commentsActions.addComment({
          user: user._id,
          comment: comment,
          lesson_id: params.id,
        })
      )
        .unwrap()
        .then((res) => {
          setComment("");
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  return (
    <div className="new-comment-container">
      <h3>Escribe un Comentario</h3>
      <textarea rows={4} onChange={handleChange} value={comment} />
      <button onClick={handleAddComment}>Enviar</button>
    </div>
  );
};
