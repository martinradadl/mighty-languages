import React from "react";
import "../../styles/courses/course.css";
import { Tabs } from "../../components/tabs";
import { CommentsTab } from "../../components/comments";
import { QuizTab } from "../../components/questions";
import { OnProgressTab } from "./on-progress-tab";
import { CompletedTab } from "./completed-tab";

export const MyCourses = () => {
  const tabs = [
    {
      title: "En progreso",
      content: <OnProgressTab />,
    },
    { title: "Completados", content: <CompletedTab /> },
  ];

  return (
    <div className="my-courses-container">
      <h1 style={{ fontSize: "2rem" }}>Mis Cursos</h1>
      <Tabs tabs={tabs} isTags />
    </div>
  );
};
