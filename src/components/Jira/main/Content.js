import { Avatar } from "antd";
import React from "react";

export default function Content(props) {
  const { listTasks } = props;
  return (
    <div className="content" style={{ display: "flex" }}>
      {listTasks?.map((task, index) => {
        return (
          <div
            key={index}
            className="card"
            style={{ width: "17rem", height: "25rem" }}
          >
            <div className="card-header" style={{ fontSize: "14px" }}>
              {task.statusName}
            </div>
            <ul className="list-group list-group-flush">
              {task.lstTaskDetail?.map((taskDetail, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item"
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                    style={{ cursor: "pointer" }}
                  >
                    <p>{taskDetail.taskName}</p>
                    <div className="block" style={{ display: "flex" }}>
                      <div className="block-left">
                        <i className="fa fa-bookmark" />
                        <i className="fa fa-arrow-up" />
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
