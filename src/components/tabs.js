import { Tab } from "@headlessui/react";
import React from "react";
import "../styles/global.css";

export function Tabs(props) {
  const { tabs } = props;
  return (
    <Tab.Group>
      <Tab.List className="tabs-titles-container">
        {tabs.map((tab, i) => {
          return (
            <Tab key={i} className="tab-title">
              {tab.title}
            </Tab>
          );
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
