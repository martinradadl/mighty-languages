import React, { useCallback, useEffect } from "react";
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
  const enrollmentsList = useSelector(
    (state) => state.course_enrollment.enrollmentsList
  );

  const selectedEnrollment = useSelector((state) => {
    if (
      state.course_enrollment.enrollmentsList !== null &&
      selectedCourse !== null
    ) {
      return state.course_enrollment.enrollmentsList.find(
        (enrollment) => enrollment.course._id === selectedCourse._id
      );
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

  return (
    <LoadingWrapper
      isLoading={
        status === "loading" ||
        selectedCourse === null ||
        (user === null && selectedEnrollment === null)
      }
    >
      <div className="course-container">
        <h2>{selectedCourse?.title}</h2>
        <p>{selectedCourse?.description}</p>
        {user !== null ? (
          <div
            style={{ marginTop: "10px" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {user?._id !== selectedCourse?.instructor ? (
              selectedEnrollment?.isActive ? (
                selectedEnrollment?.isCompleted ? (
                  <div className="badge success-badge">Curso Completado</div>
                ) : (
                  <button
                    type="button"
                    id="enroll-button"
                    style={{ backgroundColor: "red" }}
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

        <div className="lessons-list-container">
          <h3 style={{ marginBottom: "10px" }}>Lecciones</h3>
          <LoadingWrapper
            isLoading={lessonsList === null || lessonStatus === "loading"}
          >
            {lessonsList?.map((lesson, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/lessons/${lesson._id}`);
                  }}
                >
                  <LessonPreview
                    isCurrentLesson={
                      selectedEnrollment?.currentLesson === lesson._id
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
