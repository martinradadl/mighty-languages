import React, { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LessonPreview } from "../lesson/lesson-preview";
import "../../styles/courses/course.css";
import { AddLessonDialog } from "../lesson/add-lesson-dialog";
import { useSelector, useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";
import lessonsActions from "../../redux/actions/lessons";
import recentActivityActions from "../../redux/actions/recent-activity";
import debounce from "lodash.debounce";
import { RateCourseDialog } from "./rate-course-dialog";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const Course = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { status, selectedCourse } = useSelector((state) => state.courses);
  const user = useSelector((state) => state.users.selectedUser);
  const { status: lessonStatus, lessonsList } = useSelector(
    (state) => state.lessons
  );
  const navigate = useNavigate();

  const handleGetCourse = useCallback(() => {
    dispatch(
      coursesActions.getCourse({ id: params.id, loggedUser: user?._id })
    );
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

  const handleAddRecentActivity = () => {
    const newRecentActivity = {
      course_id: selectedCourse._id,
      user_id: user._id,
      currentLessonIndex: 1,
    };
    dispatch(recentActivityActions.addRecentActivity(newRecentActivity))
      .unwrap()
      .then(() => {
        dispatch(coursesActions.changeIsUserEnrolled());
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const debouncedHandleAddRecentActivity = debounce(
    handleAddRecentActivity,
    500
  );

  const handleDeleteRecentActivity = () => {
    dispatch(
      recentActivityActions.deleteRecentActivity({
        userId: user._id,
        courseId: selectedCourse._id,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(coursesActions.changeIsUserEnrolled());
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const debouncedHandleDeleteRecentActivity = debounce(
    handleDeleteRecentActivity,
    500
  );

  if (status === "loading" || selectedCourse === null) {
    return <p>Loading...</p>;
  }
  return (
    <div className="course-container">
      <h2>{selectedCourse.title}</h2>
      <p>{selectedCourse.description}</p>
      <div
          style={{ marginTop: "10px" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {selectedCourse.isUserEnrolled ? (
            <button
              type="button"
              id="enroll-button"
              style={{ backgroundColor: "red" }}
              onClick={debouncedHandleDeleteRecentActivity}
            >
              Dejar Curso
            </button>
          ) : (
            <button
              type="button"
              id="enroll-button"
              onClick={debouncedHandleAddRecentActivity}
            >
              Inscribirse
            </button>
          )}
        </div>
      <div className="course-rate-container">
        <h3>{Math.round(selectedCourse.rating * 100) / 100}</h3>
        <div>
          {[1, 2, 3, 4, 5].map((star, index) => {
            return star > selectedCourse.rating ? (
              <AiOutlineStar key={index} size={20} />
            ) : (
              <AiFillStar key={index} size={20} />
            );
          })}
        </div>
        <RateCourseDialog course={selectedCourse} />
      </div>
      <div className="lessons-list-container">
        <h3 style={{ marginBottom: "10px" }}>Lecciones</h3>
        {lessonsList !== null && lessonStatus !== "loading" ? (
          lessonsList.map((lesson, index) => {
            return (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/lessons/${lesson._id}`);
                }}
              >
                <LessonPreview isCurrentLesson={index === 0} lesson={lesson} />
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <AddLessonDialog />
    </div>
  );
};
