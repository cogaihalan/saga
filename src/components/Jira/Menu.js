import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const { name, avatar } = useSelector(
    (stateList) => stateList.JiraUserLoginReducer.userLogin
  );

  return (
    <div className="menu">
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
      </div>
    </div>
  );
}
