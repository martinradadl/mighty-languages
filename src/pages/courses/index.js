import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CoursePreview } from "../../components/course-preview";
import { AddCourseDialog } from "./add-course-dialog";
import axios from "axios";

const coursesArray = [null, null, null, null, null];

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((e) => {
        setCourses(null);
        alert(e);
      });
  }, []);
  if (courses === null) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <input
          className="search-bar"
          placeholder="Buscar cursos"
          style={{ margin: "20px", height: "20px" }}
        />
        <AddCourseDialog />
        {courses.map((item) => {
          return (
            <div
              onClick={() => {
                navigate(`/courses/${item._id}`);
              }}
            >
              <CoursePreview item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
