import React from "react";
import { useSelector } from "react-redux";
import styleLoading from "./LoadingComponent.module.css";
export default function LoadingComponent() {
  const { isLoading } = useSelector((stateList) => stateList.LoadingReducer);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img src="loading.gif" alt="loading" />
      </div>
    );
  } else {
    return "";
  }
}
