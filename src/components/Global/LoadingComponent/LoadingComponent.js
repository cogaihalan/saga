import React from "react";
import { useSelector } from "react-redux";
import styleLoading from "./LoadingComponent.module.css";
export default function LoadingComponent() {
  const { isLoading } = useSelector((stateList) => stateList.LoadingReducer);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img src="loadiing.gif" alt="loading" />
      </div>
    );
  } else {
    return "";
  }
}
