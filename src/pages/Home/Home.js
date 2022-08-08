import React from "react";
import { useSelector } from "react-redux";

export default function Home(props) {
  const user = useSelector(
    (stateList) => stateList.JiraUserLoginReducer.userLogin
  );
  return <div>{(user.name, user.content)}</div>;
}
