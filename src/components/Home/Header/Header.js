import React from "react";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-light ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Navbar
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                activeStyle={{ fontWeight: 700 }}
                aria-current="page"
                to="/home"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item ">
              <NavLink
                activeStyle={{ fontWeight: 700 }}
                className="nav-link "
                aria-current="page"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                activeStyle={{ fontWeight: 700 }}
                className="nav-link "
                aria-current="page"
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                activeStyle={{ fontWeight: 700 }}
                className="nav-link "
                aria-current="page"
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                activeStyle={{ fontWeight: 700 }}
                className="nav-link "
                aria-current="page"
                to="/hoc"
              >
                HOC
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/todolist">
                    TodoList
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/todolist_thunk">
                    TodoList-Thunk
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/todolist_saga">
                    TodoList-Saga
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
