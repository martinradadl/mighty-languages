import React, { useContext, useEffect, useState } from "react";
import { CoursePreview } from "../../components/course-preview";
import { RecentActivity } from "../../components/recent-activity";
import { AuthContext } from "../../context/auth-context";
import "../../styles/home/home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const coursesArray = [null, null, null, null, null];

export const Home = () => {
  const { user } = useContext(AuthContext);
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
    <div className="home-container">
      { user !== null? <RecentActivity /> : null}
      <h2>Cursos</h2>
      {courses.map((elem) => {
        return <CoursePreview item={elem} />;
      })}
    </div>
  );
};
