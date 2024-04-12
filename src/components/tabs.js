import { Tab } from "@headlessui/react";
import React from "react";

export function Tabs(props) {
  const { tabs } = props;
  return (
    <Tab.Group>
      <Tab.List>
        {tabs.map((tab, i) => {
          return <Tab key={i}>{tab.title}</Tab>;
        })}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab, i) => {
          return <Tab.Panel key={i}>{tab.content}</Tab.Panel>;
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}
