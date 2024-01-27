import React, { useCallback, useEffect } from "react";
import { Comment } from "../../components/comments/comment";
import { CommentInput } from "../../components/comments/comment-input";
import { Form } from "../../components/questionnaire/form";
import "../../styles/lessons/lesson.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import lessonsActions from "../../redux/actions/lessons";
import commentsActions from "../../redux/actions/comments";
import debounce from "lodash.debounce";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import { LoadingWrapper } from "../../components/loading";
import courseEnrollmentActions from "../../redux/actions/course-enrollment";

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
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();
  const { status, selectedLesson } = useSelector((state) => state.lessons);
  const { status: commentsStatus, commentsList } = useSelector(
    (state) => state.comments
  );
  const { status: enrollmentStatus, selectedEnrollment } = useSelector(
    (state) => state.course_enrollment
  );

  // Get Lesson
  const handleGetLesson = useCallback(() => {
    dispatch(lessonsActions.getLesson(params.id));
  }, [dispatch, params.id]);

  const debouncedHandleGetLesson = debounce(handleGetLesson, 500);

  useEffect(() => {
    debouncedHandleGetLesson();
  }, [handleGetLesson]);

  //Get Comments
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

  // Get Course Enrollment
  const debouncedHandleGetCourseEnrollment = debounce(() => {
    dispatch(
      courseEnrollmentActions.getCourseEnrollment({
        userId: user._id,
        courseId: selectedLesson.course._id,
      })
    );
  }, 500);

  useEffect(() => {
    if (
      selectedEnrollment === null &&
      user !== null &&
      selectedLesson !== null
    ) {
      debouncedHandleGetCourseEnrollment();
    }
  }, [user, selectedEnrollment, selectedLesson, dispatch]);

  // Update Current Lesson in Course Enrollment
  const debouncedHandleChangeCurrentLesson = debounce(() => {
    dispatch(
      courseEnrollmentActions.editCourseEnrollment({
        userId: user._id,
        courseId: selectedLesson.course._id,
        lessonId: selectedLesson._id,
        operation: "SET_CURRENT_LESSON",
      })
    );
  }, 500);

  useEffect(() => {
    if (
      selectedLesson?._id !== selectedEnrollment?.currentLesson &&
      user !== null &&
      selectedLesson.course.isUserEnrolled
    ) {
      debouncedHandleChangeCurrentLesson();
    }
  }, [selectedLesson, selectedEnrollment, user, dispatch]);

  // Add finished Lesson in Course Enrollment
  const debouncedHandleCompleteLesson = debounce(() => {
    // dispatch(
    //   courseEnrollmentActions.editCourseEnrollment({
    //     userId: user._id,
    //     courseId: selectedLesson?.course._id,
    //     lessonId: selectedLesson?._id,
    //     operation: "ADD_FINISHED_LESSON",
    //   })
    // );
  }, 500);

  useEffect(() => {
    if (user !== null) {
      debouncedHandleCompleteLesson();
    }
  }, [selectedLesson, selectedEnrollment, user, dispatch]);

  // useEffect(() => {
  //   window.focus();
  //   window.addEventListener("blur", function (e) {
  //     if (document.activeElement == document.querySelector("iframe")) {
  //       dispatch(
  //         recentActivityActions.editRecentActivity({
  //           userId: user._id,
  //           courseId: selectedLesson.course_id,
  //           lessonId: params.id,
  //         })
  //       );
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("blur");
  //   };
  // }, []);

  if (status === "loading" || selectedLesson === null) {
    return <p>Loading...</p>;
  }
  return (
    <div className="lesson-container" style={{ margin: "5px 20px" }}>
      <div className="lesson-title-container">
        <div>
          <h4 style={{ margin: "20px 0px 2px" }}>
            {selectedLesson.course.title}
          </h4>
          <h1 style={{ margin: "2px 0px 30px" }}>
            {`${selectedLesson.index + 1}. ${selectedLesson.title}`}
          </h1>
        </div>
        <div className="change-lesson-buttons">
          {selectedLesson.prevLesson ? (
            <AiFillLeftCircle
              className="button"
              size={40}
              onClick={() => {
                navigate(`/lessons/${selectedLesson.prevLesson}`);
              }}
            />
          ) : null}
          {selectedLesson.nextLesson ? (
            <AiFillRightCircle
              className="button"
              size={40}
              onClick={() => {
                navigate(`/lessons/${selectedLesson.nextLesson}`);
              }}
            />
          ) : null}
        </div>
      </div>

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
            // openLessonTab(event, "quiz");
            debouncedHandleCompleteLesson();
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
        <LoadingWrapper
          isLoading={commentsList === null || commentsStatus === "loading"}
        >
          {commentsList?.map((comment, index) => {
            return <Comment key={index} comment={comment} />;
          })}
        </LoadingWrapper>
      </div>
    </div>
  );
};
