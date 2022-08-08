import React from "react";
import { Redirect } from "react-router-dom";
export default function Profile() {
  if (localStorage.getItem("user-login")) {
    return <div>Profile</div>;
  } else {
    alert("vui lòng đăng nhập trước ");
    return <Redirect to="/login"></Redirect>;
  }
}
