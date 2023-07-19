import React, { useContext, useState } from "react";
import "../styles/comments/comment-input.css"
import { AuthContext } from "../context/auth-context";
import axios from "axios";

export const CommentInput = () => {
    const [comment, setComment] = useState("");
    const {user} = useContext(AuthContext);

    const handleChange = (event) => {
        setComment(event.target.value);
    }
    
    const handleAddComment = () => {
        if (comment === "") {
            alert("El comentario no debe estar vacío");
          } else {
            axios
              .post("http://localhost:3001/lessons/:id/comments", {
                user: user._id,
                comment: comment,
              })
              .then((res) => {
                setComment("");
              })
              .catch((e) => {
                alert(e.message);
              });
          }
    }
    
    return <div className="new-comment-container">
        <h3>Escribe un Comentario</h3>
        <textarea rows={4} onChange={handleChange} value={comment} />
        <button onClick={handleAddComment}>Enviar</button>
    </div>
}
