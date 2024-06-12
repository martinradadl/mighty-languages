import React from "react";
import { Tabs } from "../../components/tabs";
import { CommentsTab } from "../../components/comments";
import { QuizTab } from "../../components/questions";

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
