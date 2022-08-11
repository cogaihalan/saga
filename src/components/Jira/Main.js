import React, { useEffect } from "react";
import Content from "./main/Content";
import Header from "./main/Header";
import Info from "./main/Info";
import { useDispatch, useSelector } from "react-redux";
export default function MainJira(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const projectID = props.match.params.id;
    dispatch({
      type: "GET_PROJECT_DETAIL_API",
      projectID,
    });
  }, []);
  const { projectDetail } = useSelector(
    (stateList) => stateList.JiraProjectReducer
  );
  const { lstTask, members } = projectDetail;
  return (
    <div className="main">
      <Header></Header>
      <h3>Jira Board</h3>
      <Info listMembers={members}></Info>
      <Content listTasks={lstTask}></Content>
    </div>
  );
}
