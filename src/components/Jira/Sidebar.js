import React from "react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sideBar">
        <div className="sideBar-top">
          <div className="sideBar-icon">
            <i className="fab fa-jira" />
            <span className="title">JIRA</span>
          </div>
          <div
            className="sideBar-icon"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fa fa-search" />
            <span className="title">SEARCH ISSUES</span>
          </div>
          <div className="sideBar-icon">
            <i className="fa fa-plus" />
            <span className="title">CREATE ISSUES</span>
          </div>
        </div>
        <div className="sideBar-bottom">
          <div className="sideBar-icon">
            <i className="fa fa-question-circle" />
            <span className="title">ABOUT</span>
          </div>
        </div>
      </div>
    </div>
  );
}