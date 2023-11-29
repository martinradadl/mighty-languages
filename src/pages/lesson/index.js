import React, { useCallback, useEffect } from "react";
import { Comment } from "../../components/comments/comment";
import { CommentInput } from "../../components/comments/comment-input";
import { Form } from "../../components/questionnaire/form";
import "../../styles/lessons/lesson.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import lessonsActions from "../../redux/actions/lessons";
import commentsActions from "../../redux/actions/comments";
import debounce from "lodash.debounce";

function openLessonTab(evt, selectedLink) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("lesson-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("lesson-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(selectedLink).style.display = "block";
  evt.currentTarget.className += " active";
}

export const Lesson = () => {
  const params = useParams();
  const user = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();
  const { status, selectedLesson } = useSelector((state) => state.lessons);
  const { status: commentsStatus, commentsList } = useSelector(
    (state) => state.comments
  );

  const handleGetLesson = useCallback(() => {
    dispatch(lessonsActions.getLesson(params.id));
  }, [dispatch]);

  const debouncedHandleGetLesson = debounce(handleGetLesson, 500);

  useEffect(() => {
    debouncedHandleGetLesson();
  }, [handleGetLesson]);

  const handleGetComments = useCallback(() => {
    if (selectedLesson !== null) {
      dispatch(
        commentsActions.getComments({
          id: params.id,
          loggedUser: user ? user?._id : null,
        })
      );
    }
  }, [selectedLesson, user, dispatch]);

  const debouncedHandleGetComments = debounce(handleGetComments, 500);

  useEffect(() => {
    debouncedHandleGetComments();
  }, [handleGetComments]);

  if (status === "loading" || selectedLesson === null) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ margin: "5px 20px" }}>
      <h4 style={{ margin: "20px 0px 2px" }}>
        {selectedLesson.course_id.title}
      </h4>
      <h1 style={{ margin: "2px 0px 30px" }}>{selectedLesson.title}</h1>
      {selectedLesson.videos.map((video, index) => {
        return (
          <iframe
            key={index}
            width="100%"
            height="350px"
            style={{ border: "none" }}
            src={video}
          ></iframe>
        );
      })}

      <div className="lesson-tab">
        <button
          className="lesson-tablinks"
          onClick={(event) => {
            openLessonTab(event, "quiz");
          }}
        >
          Quiz
        </button>
        <button
          className="lesson-tablinks"
          onClick={(event) => {
            openLessonTab(event, "comments");
          }}
        >
          Comentarios
        </button>
      </div>
      <div id="quiz" className="lesson-tabcontent">
        <Form />
      </div>
      <div id="comments" className="lesson-tabcontent">
        {user !== null ? (
          <CommentInput />
        ) : (
          <span>Si quieres comentar por favor inicia sesión</span>
        )}
        {commentsList === null || commentsStatus === "loading" ? (
          <p>Loading...</p>
        ) : (
          commentsList?.map((comment, index) => {
            return <Comment key={index} comment={comment} />;
          })
        )}
      </div>
    </div>
  );
};
