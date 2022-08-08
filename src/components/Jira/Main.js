import React from "react";
import Content from "./main/Content";
import Header from "./main/Header";
import Info from "./main/Info";
export default function MainJira() {
  return (
    <div className="main">
      <Header></Header>
      <h3>Jira Board</h3>
      <Info></Info>
      <Content></Content>
    </div>
  );
}
