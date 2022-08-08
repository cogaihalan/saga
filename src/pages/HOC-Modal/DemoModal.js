import React from "react";
import { useDispatch } from "react-redux";
import Login from "../Login/Login";
import TodoListRedux from "../TodoList/TodoListRedux";
export default function DemoModal() {
  let dispatch = useDispatch();
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <button
          onClick={() => {
            dispatch({
              type: "OPEN_FORM",
              Component: <Login />,
            });
          }}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Log in
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "OPEN_FORM",
              Component: <TodoListRedux />,
            });
          }}
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          To Do List
        </button>
      </div>
    </div>
  );
}
