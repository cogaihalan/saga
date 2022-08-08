import React, { useState } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    status: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newUser = {
      ...user,
      [name]: value,
    };
    for (let key in newUser) {
      console.log(newUser[key]);
      if (newUser[key] === "") {
        newUser.status = true;
      }
    }
    setUser(newUser);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      user.username.trim() === "hoangtai" &&
      user.password.trim() === "hoangtai"
    ) {
      // props.history : replace , push , goBack
      //push   :chuyển đến path tương ứng
      //replace: thay đổi nội dung path tương ứng
      props.history.goBack();
      localStorage.setItem("user-login", JSON.stringify(user));
    } else {
      alert("Login fail !");
      return;
    }
  };
  return (
    <form className="container " onSubmit={handleLogin}>
      <div className="form-group">
        <h2 className="form-text">Username</h2>
        <input
          name="username"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <h2 className="form-text">Password</h2>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button className="btn btn-success">Login</button>
      <Prompt
        when={user.status}
        message={() => {
          return "Are you sure to leave this page ? ";
        }}
      ></Prompt>
    </form>
  );
}
