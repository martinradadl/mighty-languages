import React from "react";
import "../styles/comments/comment-input.css"

export const CommentInput = () => {
    return <div className="new-comment-container">
        <h3>Escribe un Comentario</h3>
        <textarea rows={4}></textarea>
        <button>Enviar</button>
    </div>
}
