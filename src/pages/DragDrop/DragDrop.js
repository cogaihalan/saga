import React, { useState, useRef } from "react";
import "./DragDrop.css";
const defaultState = [
  { id: 1, task: "task 1" },
  { id: 2, task: "task 2" },
  { id: 3, task: "task 3" },
  { id: 4, task: "task 4" },
  { id: 5, task: "task 5" },
];
export default function DragDrop() {
  const [state, setState] = useState([...defaultState]);
  const taskDrag = useRef({});
  const handleDragStart = (e, task, index) => {
    taskDrag.current = task;
  };
  const handleDragEnter = (e, task, index) => {
    const taskUpdate = [...defaultState];
    const indexTaskDrag = taskUpdate.findIndex(
      (item) => item.id === taskDrag.current.id
    );
    const indexTaskOver = taskUpdate.findIndex((item) => item.id === task.id);
    const temp = taskUpdate[indexTaskDrag];
    taskUpdate[indexTaskDrag] = taskUpdate[indexTaskOver];
    taskUpdate[indexTaskOver] = temp;
    setState(taskUpdate);
  };

  const handleDragEnd = (e, item, index) => {
    taskDrag.current = {};
    setState([...state]);
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className="drag-drop "
          style={{ width: 300, backgroundColor: "mediumseagreen" }}
        >
          {state.map((item, index) => {
            let cssTagDrag = item.id === taskDrag.current?.id ? "tagDrag" : "";
            return (
              <div
                draggable="true"
                onDragEnter={(e) => handleDragEnter(e, item, index)}
                onDragStart={(e) => handleDragStart(e, item, index)}
                onDragEnd={(e) => handleDragEnd(e, item, index)}
                className={`display-3 p-4 m-2 ${cssTagDrag}`}
                style={{
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "green",
                }}
                key={index}
              >
                {item.task}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
