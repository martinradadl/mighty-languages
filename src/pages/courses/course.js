import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LessonPreview } from "../lesson/lesson-preview";
import "../../styles/courses/course.css";
import { AddLessonDialog } from "../lesson/add-lesson-dialog";
import { useSelector, useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";
import lessonsActions from "../../redux/actions/lessons";
import courseEnrollmentActions, {
  EDIT_OPERATIONS,
} from "../../redux/actions/course-enrollment";
import debounce from "lodash.debounce";
import { RateCourseDialog } from "./rate-course-dialog";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { LoadingWrapper } from "../../components/loading";
import { handleEnrollInCourse } from "../helpers";

export const Course = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { status, selectedCourse } = useSelector((state) => state.courses);
  const user = useSelector((state) => state.users.selectedUser);
  const { status: lessonStatus, lessonsList } = useSelector(
    (state) => state.lessons
  );
  const [draggingLessonIndex, setDragginglessonIndex] = useState(null);

  const selectedEnrollment = useSelector((state) => {
    if (
      state.course_enrollment.enrollmentsList !== null &&
      selectedCourse !== null
    ) {
      return state.course_enrollment.enrollmentsList.find((enrollment) => {
        return enrollment.course._id === selectedCourse._id;
      });
    }
  });
  const navigate = useNavigate();

  // Get Course and Lessons

  const handleGetCourse = useCallback(() => {
    dispatch(coursesActions.getCourse({ id: params.id, userId: user?._id }));
  }, [params, dispatch]);

  const debouncedHandleGetCourse = debounce(handleGetCourse, 500);

  useEffect(() => {
    debouncedHandleGetCourse();
  }, [handleGetCourse]);

  const handleGetLessons = useCallback(() => {
    if (selectedCourse !== null) dispatch(lessonsActions.getLessons(params.id));
  }, [selectedCourse, params, dispatch]);

  const debouncedHandleGetLessons = debounce(handleGetLessons, 500);

  useEffect(() => {
    debouncedHandleGetLessons();
  }, [handleGetLessons]);

  // Course Enrollment functions

  const debouncedhandleEnrollInCourse = debounce(handleEnrollInCourse, 500);

  const handleLeaveCourse = () => {
    dispatch(
      courseEnrollmentActions.editCourseEnrollment({
        userId: user._id,
        courseId: selectedCourse._id,
        operation: EDIT_OPERATIONS.LEAVE_COURSE,
      })
    );
  };

  const debouncedhandleLeaveCourse = debounce(handleLeaveCourse, 500);

  // Drag and Drop Functions

  const handleDragStart = (e, lessonIndex) => {
    setDragginglessonIndex(lessonIndex);
    e.dataTransfer.setData("text", "");
  };

  const handleDragEnd = () => {
    setDragginglessonIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetLessonIndex) => {
    if (draggingLessonIndex === null) return;

    dispatch(
      lessonsActions.changeLessonIndex({
        draggingLessonIndex,
        targetLessonIndex,
        courseId: params.id,
      })
    )
      .unwrap()
      .then(() => {})
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <LoadingWrapper
      isLoading={
        status === "loading" ||
        selectedCourse === null ||
        (user === null && selectedEnrollment === null)
      }
    >
      <div className="course-container">
        <h2 style={{ fontSize: "2rem" }}>{selectedCourse?.title}</h2>
        <p style={{ fontSize: "1.3rem" }}>{selectedCourse?.description}</p>
        {user !== null ? (
          <div
            style={{ marginTop: "10px" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {user?.type === "admin" ||
            user?._id !== selectedCourse?.instructor ? (
              selectedEnrollment?.isActive ? (
                selectedEnrollment?.isCompleted ? (
                  <div className="badge success-badge">Completado</div>
                ) : (
                  <button
                    type="button"
                    id="enroll-button"
                    style={{
                      backgroundColor: getComputedStyle(
                        document.body
                      ).getPropertyValue("--red"),
                    }}
                    onClick={debouncedhandleLeaveCourse}
                  >
                    Dejar Curso
                  </button>
                )
              ) : (
                <button
                  type="button"
                  id="enroll-button"
                  onClick={() => {
                    debouncedhandleEnrollInCourse({
                      userId: user._id,
                      courseId: selectedCourse._id,
                      currentLessonId: lessonsList[0]._id,
                      dispatch,
                    });
                  }}
                >
                  Inscribirse
                </button>
              )
            ) : null}
          </div>
        ) : null}

        <div className="course-rate-container">
          <h3>{Math.round(selectedCourse?.rating * 100) / 100}</h3>
          <div>
            {[1, 2, 3, 4, 5].map((star, index) => {
              return star > selectedCourse?.rating ? (
                <AiOutlineStar key={index} size={20} />
              ) : (
                <AiFillStar key={index} size={20} />
              );
            })}
          </div>
          {user !== null ? <RateCourseDialog course={selectedCourse} /> : null}
        </div>

        <h3 style={{ marginBottom: "10px", fontSize: "1.4rem" }}>Lecciones</h3>
        <div className="lessons-list-container">
          <LoadingWrapper
            isLoading={lessonsList === null || lessonStatus === "loading"}
          >
            {lessonsList?.map((lesson, index) => {
              return (
                <div
                  key={index}
                  className="lesson-preview-container"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/lessons/${lesson._id}`);
                  }}
                  draggable={
                    selectedCourse.instructor === user?._id ||
                    user?.type === "admin"
                  }
                  onDragStart={(e) => {
                    handleDragStart(e, lesson.index);
                  }}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, lesson.index)}
                >
                  <LessonPreview
                    isCurrentLesson={
                      selectedEnrollment?.currentLesson._id === lesson._id
                    }
                    lesson={lesson}
                    index={index}
                    user={user}
                    isCompleted={selectedEnrollment?.finishedLessonsIds.includes(
                      lesson._id
                    )}
                  />
                </div>
              );
            })}
          </LoadingWrapper>
        </div>
        {user?.type === "admin" || user?._id === selectedCourse?.instructor ? (
          <AddLessonDialog />
        ) : null}
      </div>
    </LoadingWrapper>
  );
};
