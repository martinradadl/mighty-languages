import React from "react";
import "../../styles/courses/course.css";
import { Tabs } from "../../components/tabs";
import { MyCoursesTab } from "./my-courses-tab";

export const MyCourses = () => {
  const tabs = [
    {
      title: "En progreso",
      content: <MyCoursesTab />,
    },
    { title: "Completados", content: <MyCoursesTab isCompleted /> },
  ];

  return (
    <div className="my-courses-container">
      <h1 style={{ fontSize: "2rem" }}>Mis Cursos</h1>
      <Tabs tabs={tabs} isTags />
    </div>
  );
};
