import React from "react";

export default function Info() {
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        <div className="avatar">
          <img src="/Jira/download (1).jfif" alt="infoImage" />
        </div>
        <div className="avatar">
          <img src="/Jira/download (2).jfif" alt="infoImage" />
        </div>
        <div className="avatar">
          <img src="/Jira/download (3).jfif" alt="infoImage" />
        </div>
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
