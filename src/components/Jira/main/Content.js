import { Avatar } from "antd";
import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { GET_TASK_DETAIL_API } from "../../../redux/types/JiraConstants";
export default function Content(props) {
  const { listTasks } = props;
  const dispatch = useDispatch();
  const renderPriority = (priorityId) => {
    switch (priorityId) {
      case 1:
        return <ArrowUpOutlined color="red" />;
      case 2:
        return <ArrowUpOutlined color="orange" />;
      case 3:
        return <ArrowDownOutlined color="green" />;
      case 4:
        return <ArrowDownOutlined color="mediumseagreen" />;
      default:
        return 1;
    }
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      <button
        onClick={() => {
          dispatch({
            type: GET_TASK_DETAIL_API,
            taskID: 5276,
          });
        }}
        data-bs-toggle="modal"
        data-bs-target="#infoModal"
        className="btn btn-primary"
      >
        SEE DETAILS
      </button>
      {listTasks?.map((task, index) => {
        return (
          <div
            key={index}
            className="card"
            style={{ width: "17rem", height: "auto" }}
          >
            <div className="card-header" style={{ fontSize: "14px" }}>
              {task.statusName}
            </div>
            <ul className="list-group list-group-flush">
              {task.lstTaskDetail?.map((taskDetail, index) => {
                return (
                  <li
                    onClick={() => {
                      dispatch({
                        type: GET_TASK_DETAIL_API,
                        taskID: taskDetail.taskId,
                      });
                    }}
                    key={index}
                    className="list-group-item"
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                  >
                    <p>{taskDetail.taskName}</p>
                    <div className="block" style={{ display: "flex" }}>
                      <div className="block-left">
                        {renderPriority(taskDetail.priorityTask.priorityId)}
                        <span className="text text-dark">
                          {taskDetail.priorityTask.priority}
                        </span>
                      </div>
                      <div className="block-right">
                        <div
                          className="avatar-group"
                          style={{ display: "flex" }}
                        >
                          {taskDetail.assigness.map((assigner, index) => {
                            return (
                              <Avatar
                                key={index}
                                src={assigner.avatar}
                              ></Avatar>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
