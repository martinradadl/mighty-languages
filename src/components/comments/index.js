import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import commentsActions from "../../redux/actions/comments";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { CommentInput } from "./comment-input";
import { LoadingWrapper } from "../loading";
import { Comment } from "./comment";

export const CommentsTab = () => {
  const params = useParams();
  const user = useSelector((state) => state.users.selectedUser);
  const { status, commentsList } = useSelector((state) => state.comments);
  const selectedLesson = useSelector((state) => state.lessons);

  const dispatch = useDispatch();

  // Get Comments
  const handleGetComments = useCallback(() => {
    if (selectedLesson !== null) {
      dispatch(
        commentsActions.getComments({
          id: params.id,
          userId: user ? user?._id : undefined,
        })
      );
    }
  }, [selectedLesson, user, dispatch]);

  const debouncedHandleGetComments = debounce(handleGetComments, 500);

  useEffect(() => {
    debouncedHandleGetComments();
  }, [handleGetComments]);

  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      {user !== null ? (
        <CommentInput />
      ) : (
        <h4 style={{ margin: "20px auto" }}>
          Si quieres comentar, por favor inicia sesión.
        </h4>
      )}
      <LoadingWrapper isLoading={commentsList === null || status === "loading"}>
        {commentsList?.map((comment, index) => {
          return <Comment key={index} comment={comment} />;
        })}
      </LoadingWrapper>
    </div>
  );
};
