import { Editor } from "@tinymce/tinymce-react";
import { Avatar, Select, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_TASK_STATUS_API,
  GET_TASK_TYPE_API,
  GET_TASK_PRIORITY_API,
  GET_COMMENT_API,
  UPDATE_TASK_DETAIL,
  UPDATE_TASK_DETAIL_API,
  UPDATE_DESCRIPTION_TASK,
  CHANGE_ASSIGNESS,
  REMOVE_ASSIGNESS,
  DELETE_COMMENT_API,
  INSERT_COMMENT_API,
  EDIT_COMMENT_API,
  UPDATE_COMMENT_API,
  DELETE_TASK_API,
} from "../../../redux/types/JiraConstants";
export default function ModalInfo() {
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    (stateList) => stateList.JiraTaskReducer.taskDetail
  );
  const { projectDetail } = useSelector(
    (stateList) => stateList.JiraProjectReducer
  );
  const handleChange = (e) => {
    let { value, name } = e.target;
    dispatch({
      type: UPDATE_TASK_DETAIL_API,
      actionType: UPDATE_TASK_DETAIL,
      updateTask: { ...taskDetail, [name]: value },
    });
  };
  const listAssignees = projectDetail.members
    ?.filter((member) => {
      let index = taskDetail?.assigness.findIndex(
        (assignee) => assignee.id === member.userId
      );
      if (index !== -1) {
        return false;
      }
      return true;
    })
    .map((mem) => {
      return { value: mem.userId, label: mem.name };
    });
  const MAX_TIME =
    Number(taskDetail.timeTrackingRemaining) +
    Number(taskDetail.timeTrackingSpent);
  const PERCENT_TIME = (+taskDetail.timeTrackingSpent / MAX_TIME) * 100;
  const { listTaskPriority, listTaskStatus } = useSelector(
    (stateList) => stateList.JiraTaskReducer
  );
  // State Comment

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
  // State Task Detail
  const [taskDescription, setTaskDescription] = useState({
    visible: false,
    prevContent: taskDetail.description,
    currContent: taskDetail.description,
  });
  const [visibleComment, setVisibleComment] = useState(true);
  const [userComment, setUserComment] = useState("");
  const [newComment, setNewCommnet] = useState("");
  const renderDescription = () => {
    const jsxDescription = HTMLReactParser(taskDetail.description);
    return (
      <div>
        {taskDescription.visible ? (
          <div>
            <Editor
              onEditorChange={(content) => {
                setTaskDescription({
                  ...taskDescription,
                  currContent: content,
                });
              }}
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
            <div className="button-group mt-2">
              <button
                className="btn btn-primary me-2"
                onClick={() => {
                  dispatch({
                    type: UPDATE_TASK_DETAIL_API,
                    actionType: UPDATE_DESCRIPTION_TASK,
                    updateTask: {
                      ...taskDetail,
                      description: taskDescription.currContent,
                    },
                  });
                  setTaskDescription({
                    ...taskDescription,
                    visible: false,
                  });
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: UPDATE_TASK_DETAIL_API,
                    actionType: UPDATE_DESCRIPTION_TASK,
                    updateTask: {
                      ...taskDetail,
                      description: taskDescription.prevContent,
                    },
                  });
                  setTaskDescription({
                    ...taskDescription,
                    visible: false,
                  });
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTaskDescription({
                ...taskDescription,
                visible: true,
                prevContent: taskDetail.description,
              });
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };
  const renderComment = () => {
    return (
      <div>
        <div className="block-comment mb-3" style={{ display: "flex" }}>
          <div className="input-comment">
            <Editor
              onEditorChange={(content) => {
                setNewCommnet(content);
                setUserComment(content);
              }}
              value={newComment}
              init={{
                height: 170,
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
                  "body { font-family:Poppins,Arial,sans-serif; font-size:14px }",
              }}
            />
            <div className="button-group mt-2 ">
              <button
                onClick={() => {
                  dispatch({
                    type: INSERT_COMMENT_API,
                    newComment: {
                      taskId: taskDetail.taskId,
                      contentComment: userComment,
                    },
                  });
                  setNewCommnet("");
                }}
                className="btn btn-primary me-2"
              >
                Add comment
              </button>
            </div>
          </div>
        </div>
        {taskDetail.lstComment.map((comment, index) => {
          const jsxComment = HTMLReactParser(comment.commentContent);
          return (
            <div key={index} className="mb-2">
              <div className="lastest-comment">
                <div className="comment-item">
                  <div className="display-comment">
                    <div className="me-2">
                      <Avatar src={comment.avatar}></Avatar>
                    </div>
                    <div>
                      <p
                        style={{
                          paddingBottom: "5px",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "rgb(66, 82, 110)",
                        }}
                      >
                        {comment.name}
                      </p>
                      <div>
                        {visibleComment ? (
                          <div>
                            <div
                              style={{
                                marginBottom: 5,
                                fontSize: "14px",
                                color: "rgb(23, 43, 77)",
                                fontWeight: "600",
                              }}
                            >
                              {jsxComment}
                            </div>
                            <div className="task-btns ">
                              <button
                                style={{ cursor: "pointer" }}
                                className="btn btn-primary me-2"
                                onClick={() => {
                                  setVisibleComment(!visibleComment);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                style={{ cursor: "pointer" }}
                                className="btn btn-danger"
                                onClick={() => {
                                  dispatch({
                                    type: DELETE_COMMENT_API,
                                    commentID: comment.id,
                                    taskID: taskDetail.taskId,
                                  });
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Editor
                              onEditorChange={(content) => {
                                setUserComment(content);
                              }}
                              initialValue={comment.commentContent}
                              init={{
                                height: 150,
                                menubar: false,
                                content_style:
                                  "body { font-family:Poppins,Arial,sans-serif; font-size:12px }",
                              }}
                            />
                            <div className="task-btns ">
                              <button
                                style={{ cursor: "pointer" }}
                                className="btn btn-primary me-2"
                                onClick={() => {
                                  setVisibleComment(!visibleComment);
                                  dispatch({
                                    type: UPDATE_COMMENT_API,
                                    updateComment: {
                                      id: comment.id,
                                      contentComment: userComment,
                                    },
                                    taskID: taskDetail.taskId,
                                  });
                                }}
                              >
                                Save
                              </button>
                              <button
                                style={{ cursor: "pointer" }}
                                className="btn btn-secondary"
                                onClick={() => {
                                  setVisibleComment(!visibleComment);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <div
        className="modal "
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
                  TASK {taskDetail.taskId}:
                  <span className="ms-1 text text-danger">
                    {taskDetail.taskTypeDetail?.taskType}
                  </span>
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
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => {
                    dispatch({
                      type: DELETE_TASK_API,
                      taskID: taskDetail.taskId,
                    });
                  }}
                 
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <div className="task-click">
                    <i className="fa fa-trash-alt" />
                  </div>
                </Popconfirm>

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
                    <p className="issue issue-name">{taskDetail.taskName}</p>
                    <div className="description title-desc">
                      <p className="fw-700 fs-4">Description</p>
                      {renderDescription()}
                    </div>

                    <div className="comment title mt-3">
                      <h6>Comment</h6>
                      {renderComment()}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status title">
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
                    <div className="assignees title">
                      <h6>ASSIGNEES</h6>
                      <div className="d-flex align-items-center flex-wrap">
                        {taskDetail.assigness.map((assignee, index) => {
                          return (
                            <div
                              key={index}
                              className="item d-flex align-items-center "
                            >
                              <Avatar src={assignee.avatar}></Avatar>

                              <i
                                onClick={() => {
                                  dispatch({
                                    type: UPDATE_TASK_DETAIL_API,
                                    actionType: REMOVE_ASSIGNESS,
                                    userID: assignee.id,
                                  });
                                }}
                                className="fa fa-times"
                                style={{ marginLeft: 5 }}
                              />
                            </div>
                          );
                        })}

                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          style={{ width: "50%", margin: "8px 0 12px" }}
                          options={listAssignees}
                          placement="bottomLeft"
                          placeholder="Select a person ..."
                          optionFilterProp="label"
                          onSelect={(value) => {
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId === Number(value)
                            );
                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };
                            dispatch({
                              type: UPDATE_TASK_DETAIL_API,
                              actionType: CHANGE_ASSIGNESS,
                              userSelected,
                            });
                          }}
                        ></Select>
                      </div>
                    </div>
                    <div className="priority title">
                      <h6>PRIORITY</h6>
                      <select
                        value={taskDetail.priorityId}
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
                    <div className="estimate title">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        name="originalEstimate"
                        onChange={handleChange}
                        type="number"
                        min={0}
                        className="estimate-hours form-control"
                        value={taskDetail?.originalEstimate}
                      />
                    </div>
                    <div className="time-tracking title">
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
                        min={0}
                        type="number"
                        value={taskDetail?.timeTrackingSpent}
                        name="timeTrackingSpent"
                        onChange={handleChange}
                        className="logged form-control"
                      />

                      <input
                        min={0}
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
