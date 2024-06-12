import React from "react";
import "../../styles/courses/course.css";
import { TabsContent } from "./tabs-content";

export const MyCourses = () => {

  return (
    <div className="my-courses-container">
      <h1 style={{ fontSize: "2rem" }}>Mis Cursos</h1>
      <TabsContent />
    </div>
  );
};
