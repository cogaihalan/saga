import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src="/Jira/download.jfif" alt="profileimage" />
        </div>
        <div className="account-info">
          <p>Jira</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink className="text-dark" activeClassName="active" to="/jira">
            Jira Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink
            className="text-dark"
            activeClassName="active "
            to="/jira/create"
          >
            Project Settings
          </NavLink>
        </div>
        <div>
          <i class="fa fa-list-alt"></i>
          <NavLink
            className="text-dark"
            activeClassName="active "
            to="/jira/projects"
          >
            Project Settings
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
