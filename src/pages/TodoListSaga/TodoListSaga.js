import React, { useEffect, useState } from "react";
import "../TodoList/TodoListRedux.css";
import {
  ADD_TASK_API,
  GET_TASK_API,
  DELETE_TASK_API,
  CHANGE_STATUS_TASK_API,
} from "../../redux/types/TodoListTypes";
import { useDispatch, useSelector } from "react-redux";
export default function TodoListSaga() {
  const [task, setTask] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });
  const taskList = useSelector(
    (stateList) => stateList.ToDoListReducer.taskList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getTaskList();
  }, []);
  const getTaskList = () => {
    dispatch({
      type: GET_TASK_API,
    });
  };
  const addTaskItem = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_TASK_API,
      taskName: task.values.taskName,
    });
  };
  const deleteTaskItem = (taskName) => {
    dispatch({
      type: DELETE_TASK_API,
      taskName,
    });
  };
  const changeStatusTask = (taskName, isCompleted) => {
    dispatch({
      type: CHANGE_STATUS_TASK_API,
      taskName,
      isCompleted,
    });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    let newValues = { ...task.values };
    let newErrors = { ...task.errors };

    newValues = { ...newValues, [name]: value };
    const regex = /^[a-z A-Z]+$/;
    if (!regex.test(value) || value.trim() === "") {
      newErrors[name] = name + " is invalid !";
    } else {
      newErrors = { ...newErrors, [name]: "" };
    }
    setTask({
      ...task,
      values: newValues,
      errors: newErrors,
    });
  };
  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((task, index) => {
        return (
          <li key={index}>
            <span>{task.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTaskItem(task.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                onClick={() => {
                  changeStatusTask(task.taskName, 1);
                }}
                className="complete"
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  const renderTaskCompleted = () => {
    return taskList
      .filter((item) => item.status)
      .map((task, index) => {
        return (
          <li key={index}>
            <span>{task.taskName}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  deleteTaskItem(task.taskName);
                }}
                className="remove"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  changeStatusTask(task.taskName, 0);
                }}
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };
  return (
    <form onSubmit={addTaskItem}>
      <div className="card">
        <div className="card__header">
          <img src="bg.png" alt="" />
        </div>
        <div className="card__body">
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>September 9,2020</p>
            </div>
            <div className="form-group card__add">
              <input
                onChange={handleChange}
                className="form-control"
                name="taskName"
                id="newTask"
                type="text"
                placeholder="Enter an activity..."
              />
              <button onClick={addTaskItem} id="addItem">
                <i className="fa fa-plus" />
              </button>
            </div>
            <span className="text text-danger">{task.errors.taskName}</span>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {renderTaskCompleted()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
