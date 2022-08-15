import { Editor } from "@tinymce/tinymce-react";
import { Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_TASK_STATUS_API,
  GET_TASK_TYPE_API,
  GET_TASK_PRIORITY_API,
  GET_COMMENT_API,
  UPDATE_TASK_DETAIL_API,
} from "../../../redux/types/JiraConstants";
export default function ModalInfo() {
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    (stateList) => stateList.JiraTaskReducer.taskDetail
  );
  const [state, setState] = useState({
    visible: true,
    prevContent: taskDetail?.description,
    currContent: "",
  });
  const handleChange = (e) => {
    let { value, name } = e.target;
    dispatch({
      type: UPDATE_TASK_DETAIL_API,
      updateTask: { ...taskDetail, [name]: value },
      projectID: taskDetail.projectId,
    });
  };
  const MAX_TIME =
    taskDetail.timeTrackingRemaining + taskDetail.timeTrackingSpent;
  const PERCENT_TIME = (taskDetail.timeTrackingSpent / MAX_TIME) * 100;
  const { listTaskPriority, listTaskStatus } = useSelector(
    (stateList) => stateList.JiraTaskReducer
  );
  useEffect(() => {
    dispatch({
      type: GET_TASK_TYPE_API,
    });
    dispatch({
      type: GET_TASK_PRIORITY_API,
    });
    dispatch({
      type: GET_TASK_STATUS_API,
    });
  }, []);
  return (
    <div>
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <span>
                  TASK {taskDetail.taskId}: {taskDetail.taskName}
                </span>
              </div>
              <div style={{ display: "flex" }} className="task-clicks">
                <div className="task-click">
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div className="task-click">
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <div className="task-click">
                  <i className="fa fa-trash-alt" />
                </div>
                <div className="task-click">
                  <button
                    type="button"
                    className="close btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className=" fa fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">
                      This is an issue of type:
                      {taskDetail.taskTypeDetail?.taskType}
                    </p>
                    <div className="description">
                      <p>Description</p>
                      <p>{HTMLReactParser(taskDetail.description)}</p>
                      <Editor
                        value={taskDetail.description}
                        // onEditorChange={handleChange}
                        name="description"
                        initialValue={taskDetail.description}
                        init={{
                          height: 420,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Poppins,Arial,sans-serif; font-size:16px }",
                        }}
                      />
                    </div>

                    <div className="comment mt-5">
                      <h6>Comment</h6>
                      {/* <button
                        className="btn btn-primary"
                        onClick={() => {
                          dispatch({
                            type: GET_COMMENT_API,
                            taskID: taskDetail.taskId,
                          });
                        }}
                      >
                        GET COMMENT
                      </button> */}
                      {/* {taskDetail?.lstComment.map((comment ,index)=>{
                        return
                      })} */}
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img
                            src="/Jira/download (1).jfif"
                            alt="avatarImage"
                          />
                        </div>
                        <div className="input-comment">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Add a comment ..."
                          />
                          <p>
                            <span style={{ fontWeight: 500, color: "gray" }}>
                              Protip:
                            </span>
                            <span>
                              press
                              <span
                                style={{
                                  margin: "0 4px",
                                  fontWeight: "bold",
                                  background: "#ecedf0",
                                  color: "#b4bac6",
                                  fontSize: "18px",
                                }}
                              >
                                M
                              </span>
                              to comment
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div
                            className="display-comment"
                            style={{ display: "flex" }}
                          >
                            <div className="avatar">
                              <img
                                src="/Jira/download (1).jfif"
                                alt="avatarImage"
                              />
                            </div>
                            <div>
                              <p style={{ marginBottom: 5 }}>
                                Lord Gaben <span>a month ago</span>
                              </p>
                              <p style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Repellendus tempora ex
                                voluptatum saepe ab officiis alias totam ad
                                accusamus molestiae?
                              </p>
                              <div className="task-btns mt-4">
                                <button className="btn btn-primary me-2">
                                  Edit
                                </button>

                                <button className="btn btn-danger">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        value={taskDetail.statusId}
                        onChange={handleChange}
                        name="statusId"
                        className="custom-select form-control"
                      >
                        {listTaskStatus?.map((status, index) => {
                          return (
                            <option key={index} value={status.statusId}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div className="d-flex align-items-center">
                        {/* {taskDetail?.assigness.map((assignee, index) => {
                          return (
                            <div
                              key={index}
                              className="item d-flex align-items-center"
                            >
                              <Avatar src={assignee.avatar}></Avatar>

                              <i
                                className="fa fa-times"
                                style={{ marginLeft: 5 }}
                              />
                            </div>
                          );
                        })} */}

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i
                            className="fa fa-plus"
                            style={{ marginRight: 5 }}
                          />
                          <span>Add more</span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="reporter">
                      <h6>REPORTER</h6>
                      <div style={{ display: "flex" }} className="item">
                        <div className="avatar">
                          <img
                            src="/Jira/download (1).jfif"
                            alt="avatarImage"
                          />
                        </div>
                        <p className="name">
                          Pickle Rick
                          <i
                            className="fa fa-times"
                            style={{ marginLeft: 5 }}
                          />
                        </p>
                      </div>
                    </div> */}
                    <div className="priority" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>
                      <select
                        value={taskDetail.projectId}
                        name="priorityId"
                        onChange={handleChange}
                        className="custom-select form-control"
                      >
                        {listTaskPriority?.map((priority, index) => {
                          return (
                            <option key={index} value={priority.priorityId}>
                              {priority.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        name="originalEstimate"
                        onChange={handleChange}
                        type="text"
                        className="estimate-hours form-control"
                        value={taskDetail?.originalEstimate}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      <div style={{ display: "flex" }}>
                        <i className="fa fa-clock" />
                        <div style={{ width: "100%" }}>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${PERCENT_TIME}%` }}
                              aria-valuenow={PERCENT_TIME}
                              aria-valuemin={0}
                              aria-valuemax={MAX_TIME}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p className="logged">
                              {taskDetail?.timeTrackingSpent}h logged
                            </p>
                            <p className="estimate-time">
                              {taskDetail?.timeTrackingRemaining}h remaining
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <input
                        type="number"
                        value={taskDetail?.timeTrackingSpent}
                        name="timeTrackingSpent"
                        onChange={handleChange}
                        className="logged form-control"
                      />

                      <input
                        type="number"
                        value={taskDetail?.timeTrackingRemaining}
                        name="timeTrackingRemaining"
                        onChange={handleChange}
                        className="estimate-time form-control"
                      />
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
