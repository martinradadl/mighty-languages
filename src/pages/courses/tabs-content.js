import React from "react";
import { Tabs } from "../../components/tabs";
import { CommentsTab } from "../../components/comments";
import { QuizTab } from "../../components/questions";
import { OnProgressTab } from "./on-progress-tab";
import { CompletedTab } from "./completed-tab";

export const TabsContent = (props) => {
  const {} = props;

  const tabs = [
    {
      title: "En progreso",
      content: <OnProgressTab />,
    },
    { title: "Completados", content: <CompletedTab /> },
  ];
  return <Tabs tabs={tabs} isTags />;
};
