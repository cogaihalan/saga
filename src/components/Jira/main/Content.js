import { Avatar } from "antd";
import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  GET_TASK_DETAIL_API,
  UPDATE_TASK_STATUS_API,
} from "../../../redux/types/JiraConstants";
export default function Content(props) {
  const { projectDetail } = props;
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
        return -1;
    }
  };
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    const { projectId, taskId } = JSON.parse(result.draggableId);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    dispatch({
      type: UPDATE_TASK_STATUS_API,
      taskStatus: {
        taskId,
        statusId: destination.droppableId,
      },
      projectId,
    });
  };
  const renderContent = () => {
    return (
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        {projectDetail.lstTask.map((taskList, index) => {
          return (
            <Droppable droppableId={taskList.statusId} key={index}>
              {(provided) => {
                return (
                  <div
                    className="card"
                    style={{ width: "20rem", height: "auto" }}
                  >
                    <div className="card-header" style={{ fontSize: "14px" }}>
                      {taskList.statusName}
                    </div>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="list-group list-group-flush"
                      style={{ height: "100%" }}
                    >
                      {taskList.lstTaskDeTail.map((taskDetail, index) => {
                        return (
                          <Draggable
                            key={taskDetail.taskId.toString()}
                            draggableId={JSON.stringify({
                              projectId: taskDetail.projectId,
                              taskId: taskDetail.taskId.toString(),
                            })}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_API,
                                      taskID: taskDetail.taskId,
                                    });
                                  }}
                                  className="list-group-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#infoModal"
                                >
                                  <p>{taskDetail.taskName}</p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      {renderPriority(
                                        taskDetail.priorityTask.priorityId
                                      )}
                                      <span className="text text-dark">
                                        {taskDetail.priorityTask.priority}
                                      </span>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {taskDetail.assigness.map(
                                          (assigner, index) => {
                                            return (
                                              <Avatar
                                                key={index}
                                                src={assigner.avatar}
                                              ></Avatar>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderContent()}
    </div>
  );
}
