import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const { name, avatar } = useSelector(
    (stateList) => stateList.JiraUserLoginReducer.userLogin
  );

  return (
    <div className="menu">
      <div className="menu-button m-2">
        <div>
          <NavLink
            onClick={() => localStorage.clear()}
            className="text-dark"
            activeClassName="active "
            to="/login"
          >
            <i className="me-2 fa fa-sign-out-alt"></i>
            Log out
          </NavLink>
        </div>
      </div>
      <div className="account">
        <div className="avatar">
          <img src={avatar} alt="profileimage" />
        </div>
        <div className="account-info">
          <p>{name}</p>
          <p>Report bugs</p>
        </div>
      </div>

      <div className="control">
        <div>
          <i className="fa fa-cog" />
          <NavLink
            className="text-dark"
            activeClassName="active "
            to="/jira/create"
          >
            New Project
          </NavLink>
        </div>
        <div>
          <i className="fa fa-list-alt"></i>
          <NavLink
            className="text-dark"
            activeClassName="active "
            to="/jira/projects"
          >
            Projects List
          </NavLink>
        </div>
        <div>
          <i className="fa fa-user"></i>
          <NavLink
            className="text-dark"
            activeClassName="active "
            to="/jira/users"
          >
            Users List
          </NavLink>
        </div>
      </div>
    </div>
  );
}
