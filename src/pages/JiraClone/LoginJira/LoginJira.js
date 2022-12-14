import React from "react";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import { Input, Button, Checkbox } from "antd";
import * as Yup from "yup";
import "./LoginJira.css";
import { connect } from "react-redux";
import { SIGN_IN_ACTION } from "../../../redux/actions/JiraActions";
import { NavLink } from "react-router-dom";
function LoginJira(props) {
  const { values, errors, handleChange, handleSubmit, touched } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="container login-content">
        <div className=" login-content">
          <h3 className="login-heading">Jira Login</h3>
          <div className="mt-2 login-input ">
            <Input
              type="text"
              onChange={handleChange}
              name="username"
              size="large"
              placeholder="Username ..."
              prefix={<UserOutlined />}
            ></Input>
          </div>
          {touched && values.username ? (
            <div className="text text-danger">{errors.username}</div>
          ) : (
            ""
          )}
          <div className="mt-2 login-input">
            <Input
              type="password"
              onChange={handleChange}
              name="password"
              size="large"
              placeholder="Password ..."
              prefix={<LockOutlined />}
            ></Input>
          </div>
          <div className="text text-danger">{errors.password}</div>
          <Button htmlType="submit" className="login-button" type="primary">
            Login
          </Button>
          <div className="login-more">
            <Checkbox>Remember me</Checkbox>
            <NavLink
              style={{ color: "black" }}
              to="/signup"
            >
              Need a new account ?
            </NavLink>
          </div>
          <div className="login-socials">
            <Button shape="circle" className="login-social" type="primary">
              {<FacebookOutlined />}
            </Button>
            <Button shape="circle" className="login-social" type="primary">
              {<TwitterOutlined />}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
const LoginJiraWithFormik = withFormik({
  mapPropsToValues: () => ({ username: "", password: "" }),

  validationSchema: Yup.object().shape({
    // Ki???m tra email
    username: Yup.string()
      .required("Email is required !")
      .email("Email is invalid !"),
    // Ki???m tra password
    password: Yup.string()
      .min(6, "Password must have at least 6 characters !")
      .max(32, "Password just has 32 characters in total"),
  }),
  handleSubmit: ({ username, password }, { props, setSubmitting }) => {
    props.dispatch(SIGN_IN_ACTION(username, password));
  },

  displayName: "Jira Login ",
})(LoginJira);

export default connect()(LoginJiraWithFormik);
