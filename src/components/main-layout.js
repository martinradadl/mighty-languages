import React from "react";
import { Header } from "./header";

export const MainLayout = (props) => {
  const { children } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      {children}
    </div>
  );
};
