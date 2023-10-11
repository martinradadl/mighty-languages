import React, { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LessonPreview } from "../lesson/lesson-preview";
import "../../styles/courses/course.css";
import { AddLessonDialog } from "../lesson/add-lesson-dialog";
import { useSelector, useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";
import lessonsActions from "../../redux/actions/lessons";
import debounce from "lodash.debounce";

export const Course = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { status, selectedCourse } = useSelector((state) => state.courses);
  const { status: lessonStatus, lessonsList } = useSelector(
    (state) => state.lessons
  );
  const navigate = useNavigate();

  const handleGetCourse = useCallback(() => {
    dispatch(coursesActions.getCourse(params.id));
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

  if (status === "loading" || selectedCourse === null) {
    return <p>Loading...</p>;
  }
  return (
    <div className="course-container">
      <h2>{selectedCourse.title}</h2>
      <p>{selectedCourse.description}</p>
      <div className="lessons-list-container">
        <div>Lecciones</div>
        {lessonsList !== null && lessonStatus !== "loading" ? (
          lessonsList.map((lesson, index) => {
            return (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(lesson);
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
