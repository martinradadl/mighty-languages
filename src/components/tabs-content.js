import React from "react";
import { Tabs } from "./tabs";
import { CommentsTab } from "./comments";
import { QuizTab } from "./questions";

export const TabsContent = (props) => {
  const { handleCompleteLesson } = props;

  const tabs = [
    {
      title: "Quiz",
      content: <QuizTab handleCompleteLesson={handleCompleteLesson} />,
    },
    { title: "Comentarios", content: <CommentsTab /> },
  ];
  return <Tabs tabs={tabs} />;
};
