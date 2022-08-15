import React from "react";

export default function Header() {
  return (
    <div className="header mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">Jira</li>
          <li className="breadcrumb-item active" aria-current="page">
            Jira Board
          </li>
        </ol>
      </nav>
    </div>
  );
}
