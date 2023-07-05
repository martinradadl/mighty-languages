import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LessonPreview } from "../../components/lesson-preview";
import "../../styles/courses/course.css";
import axios from "axios";
import { AddLessonDialog } from "../lesson/add-lesson-dialog";

export const Course = () => {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/courses/${params.id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (course === null) {
    return <p>Loading...</p>;
  }
  console.log(course);
  return (
    <div className="course-container">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div className="lessons-list-container">
        <div>Lecciones</div>
        {course.lessons.map((lesson, index) => {
          console.log(lesson);
          return (
            <div
              onClick={() => {
                navigate(`/courses/${course._id}/lessons/${lesson._id}`);
              }}
            >
              <LessonPreview isCurrentLesson={index === 0} item={lesson} />
            </div>
          );
        })}
      </div>
      <AddLessonDialog />
    </div>
  );
};
