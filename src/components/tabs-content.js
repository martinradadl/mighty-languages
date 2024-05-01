import React from "react";
import { Tabs } from "./tabs";
import { CommentsTab } from "./comments";
import { QuizTab } from "./questions";

export const TabsContent = (props) => {
  const { handleCompleteLesson, isInstructor, isQuizActive } = props;

  const tabs = [
    {
      title: "Quiz",
      content: (
        <QuizTab
          {...{
            handleCompleteLesson,
            isInstructor,
            isQuizActive,
          }}
        />
      ),
    },
    { title: "Comentarios", content: <CommentsTab /> },
  ];
  return <Tabs tabs={tabs} />;
};
