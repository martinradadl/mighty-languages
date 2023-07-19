import React from "react";
import "../styles/comments/comment.css";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

export const Comment = (props) => {
  const { comment } = props;
  console.log(comment.user);
  return (
    <div className="comment-container">
      <div className="comment-user" />
      <div className="comment">
        <p>
          <b>{comment.user.name}</b>
        </p>
        <p>{comment.comment}</p>
        <div className="comment-options">
          <AiFillLike />
          <p>{comment.likes}</p>
          <AiFillDislike />
          <p>{comment.dislikes}</p>
          <p>Reply</p>
          <p>Report</p>
        </div>
      </div>
    </div>
  );
};
