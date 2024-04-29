import React, { Fragment, useState } from "react";
import "../../styles/comments/comment.css";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import commentsActions from "../../redux/actions/comments";
import feedbacksActions from "../../redux/actions/feedbacks";
import { DeleteCommentDialog } from "./delete-comment-dialog";
import debounce from "lodash.debounce";

export const Comment = (props) => {
  const { comment } = props;
  const dispatch = useDispatch();
  const [editedComment, setEditedComment] = useState("");
  const user = useSelector((state) => state.users.selectedUser);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const editComment = () => {
    dispatch(
      commentsActions.editComment({
        _id: comment._id,
        comment: editedComment,
      })
    );
  };

  const handleFeedback = (feedback) => {
    if (user !== null) {
      if (!comment.hasFeedback) {
        dispatch(
          feedbacksActions.addFeedback({
            userId: user._id,
            commentId: comment._id,
            type: feedback,
          })
        );
      } else if (comment.hasFeedback === feedback) {
        dispatch(
          feedbacksActions.deleteFeedback({
            userId: user._id,
            commentId: comment._id,
            type: feedback,
          })
        );
      } else if (comment.hasFeedback !== feedback) {
        dispatch(
          feedbacksActions.editFeedback({
            userId: user._id,
            commentId: comment._id,
            type: feedback,
          })
        );
      }
    }
  };

  const debouncedHandleFeedback = debounce(handleFeedback, 500);

  const handleChange = (event) => {
    setEditedComment(event.target.value);
  };

  return (
    <div className="comment-container">
      <div className="profile-pic" />
      <div className="comment">
        <p>
          <b>{comment.user.name}</b>
        </p>

        {editedComment === "" ? (
          <p>{comment.comment}</p>
        ) : (
          <div style={{ display: "flex" }}>
            <input onChange={handleChange} value={editedComment} />
            <button onClick={editComment}>Editar</button>
          </div>
        )}

        <div className="comment-options">
          {comment.hasFeedback === "like" ? (
            <AiFillLike
              className="clickable-container"
              onClick={() => debouncedHandleFeedback("like")}
            />
          ) : (
            <AiOutlineLike
              className="clickable-container"
              onClick={() => debouncedHandleFeedback("like")}
            />
          )}
          <p>{comment.likes}</p>
          {comment.hasFeedback === "dislike" ? (
            <AiFillDislike
              className="clickable-container"
              onClick={() => debouncedHandleFeedback("dislike")}
            />
          ) : (
            <AiOutlineDislike
              className="clickable-container"
              onClick={() => debouncedHandleFeedback("dislike")}
            />
          )}

          <p>{comment.dislikes}</p>
          <p className="clickable-container">Reply</p>
          <p className="clickable-container">Report</p>
          {user !== null && user._id === comment.user._id ? (
            <Fragment>
              <AiFillEdit
                className="clickable-container"
                onClick={() => {
                  setEditedComment(comment.comment);
                }}
              />
              <AiFillDelete
                className="clickable-container"
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                }}
              />
            </Fragment>
          ) : null}
          <DeleteCommentDialog
            isOpen={isDeleteDialogOpen}
            setIsOpen={setIsDeleteDialogOpen}
            id={comment._id}
          />
        </div>
      </div>
    </div>
  );
};
