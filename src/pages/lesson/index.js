import React, { useCallback, useEffect } from "react";
import "../../styles/lessons/lesson.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import lessonsActions from "../../redux/actions/lessons";
import debounce from "lodash.debounce";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import courseEnrollmentActions, {
  EDIT_OPERATIONS,
} from "../../redux/actions/course-enrollment";
import { handleEnrollInCourse } from "../helpers";
import { TabsContent } from "../../components/tabs-content";

export const Lesson = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);
  const { status, selectedLesson } = useSelector((state) => state.lessons);
  const selectedEnrollment = useSelector((state) => {
    if (
      state.course_enrollment.enrollmentsList !== null &&
      selectedLesson !== null
    ) {
      return state.course_enrollment.enrollmentsList.find(
        (enrollment) => enrollment.course._id === selectedLesson.course._id
      );
    }
  });

  // Get Lesson
  const handleGetLesson = useCallback(() => {
    dispatch(lessonsActions.getLesson(params.id));
  }, [dispatch, params.id]);

  const debouncedHandleGetLesson = debounce(handleGetLesson, 500);

  useEffect(() => {
    debouncedHandleGetLesson();
  }, [handleGetLesson]);

  // Update Current Lesson in Course Enrollment
  const handleChangeCurrentLesson = () => {
    dispatch(
      courseEnrollmentActions.editCourseEnrollment({
        userId: user._id,
        courseId: selectedLesson.course._id,
        lessonId: selectedLesson._id,
        operation: "SET_CURRENT_LESSON",
      })
    );
  };

  const debouncedHandleChangeCurrentLesson = debounce(
    handleChangeCurrentLesson,
    500
  );

  useEffect(() => {
    if (
      user &&
      selectedEnrollment &&
      selectedLesson?._id !== selectedEnrollment?.currentLesson._id
    ) {
      debouncedHandleChangeCurrentLesson();
    }
  }, [selectedLesson, selectedEnrollment, dispatch]);

  // Add finished Lesson in Course Enrollment
  const handleCompleteLesson = useCallback(async () => {
    try {
      let enrollment = { ...selectedEnrollment };
      if (
        user?.type === "admin" ||
        (user !== null && user?._id !== selectedLesson?.course.instructor)
      ) {
        if (Object.keys(enrollment).length === 0) {
          enrollment = await handleEnrollInCourse({
            userId: user._id,
            courseId: selectedLesson.course._id,
            currentLessonId: selectedLesson._id,
            dispatch,
          });
        }
        if (!enrollment.finishedLessonsIds?.includes(selectedLesson._id)) {
          dispatch(
            courseEnrollmentActions.editCourseEnrollment({
              userId: user._id,
              courseId: selectedLesson?.course._id,
              lessonId: selectedLesson?._id,
              operation: EDIT_OPERATIONS.ADD_FINISHED_LESSON,
            })
          );
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [dispatch, user, selectedLesson, selectedEnrollment]);

  const debouncedHandleCompleteLesson = debounce(handleCompleteLesson, 500);

  if (status === "loading" || selectedLesson === null) {
    return <p>Loading...</p>;
  }
  return (
    <div className="lesson-container">
      <div className="lesson-title-container">
        <div>
          <h3
            className="clickable-container text-on-hover"
            onClick={() => {
              navigate(`/courses/${selectedLesson.course._id}`);
            }}
            style={{
              width: "fit-content",
              margin: "20px 0px 2px",
              fontSize: "1.2rem",
            }}
          >
            {selectedLesson.course.title}
          </h3>
          <h1 style={{ margin: "2px 0px 30px", fontSize: "2rem" }}>
            {`${selectedLesson.index + 1}. ${selectedLesson.title}`}
          </h1>
        </div>
        <div className="change-lesson-buttons">
          {selectedLesson.prevLesson ? (
            <AiFillLeftCircle
              className="clickable-container change-lesson-icon"
              onClick={() => {
                navigate(`/lessons/${selectedLesson.prevLesson}`);
              }}
            />
          ) : null}
          {selectedLesson.nextLesson ? (
            <AiFillRightCircle
              className="clickable-container change-lesson-icon"
              onClick={() => {
                navigate(`/lessons/${selectedLesson.nextLesson}`);
              }}
            />
          ) : null}
        </div>
      </div>

      {selectedEnrollment?.finishedLessonsIds.includes(selectedLesson?._id) ? (
        <div className="badge success-badge">Completado</div>
      ) : null}

      {selectedLesson.videos.map((video, index) => {
        return (
          <iframe key={index} style={{ border: "none" }} src={video}></iframe>
        );
      })}

      <TabsContent
        handleCompleteLesson={debouncedHandleCompleteLesson}
        isInstructor={selectedLesson.course.instructor === user?._id}
        isQuizActive={selectedLesson.isQuizActive}
      />
    </div>
  );
};
