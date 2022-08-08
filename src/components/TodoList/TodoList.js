import React, { Component } from "react";
import Axios from "axios";
import "./TodoList.css";
export default class TodoList extends Component {
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };
  componentDidMount() {
    this.getTaskList();
  }
  getTaskList = async () => {
    try {
      let result = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      this.setState({
        taskList: result.data,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
  addTask = async (e) => {
    try {
      e.preventDefault();
      await Axios({
        method: "POST",
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        data: { taskName: this.state.values.taskName },
      });

      this.getTaskList();
    } catch (err) {
      throw new Error(err);
    }
  };
  deleteTask = async (taskName) => {
    try {
      await Axios({
        method: "DELETE",
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      });
      this.getTaskList();
    } catch (err) {
      throw new Error(err);
    }
  };
  changeStatusTask = async (taskName, isCompleted) => {
    try {
      if (isCompleted) {
        await Axios({
          method: "PUT",
          url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        });
      } else {
        await Axios({
          method: "PUT",
          url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        });
      }
      this.getTaskList();
    } catch (err) {
      throw new Error(err);
    }
  };
  handleChange = (e) => {
    let { name, value } = e.target;
    let newValues = { ...this.state.values };
    let newErrors = { ...this.state.errors };

    newValues = { ...newValues, [name]: value };
    const regex = /^[a-z A-Z]+$/;
    if (!regex.test(value) || value.trim() === "") {
      newErrors[name] = name + " is invalid !";
    } else {
      newErrors = { ...newErrors, [name]: "" };
    }
    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };
  renderTaskToDo = () => {
    return this.state.taskList
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
                  this.deleteTask(task.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                onClick={() => {
                  this.changeStatusTask(task.taskName, 1);
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
  renderTaskCompleted = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((task, index) => {
        return (
          <li key={index}>
            <span>{task.taskName}</span>
            <div className="buttons">
              <button className="remove">
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  this.changeStatusTask(task.taskName, 0);
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
  render() {
    return (
      <form onSubmit={this.addTask}>
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
                  value={this.state.values.taskName}
                  className="form-control"
                  name="taskName"
                  onChange={this.handleChange}
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                <button onClick={this.addTask} id="addItem">
                  <i className="fa fa-plus" />
                </button>
              </div>
              <span className="text text-danger">
                {this.state.errors.taskName}
              </span>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskCompleted()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
