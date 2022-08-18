import React from "react";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { withFormik } from "formik";
import { Input, Button } from "antd";
import * as Yup from "yup";
import "../LoginJira/LoginJira.css";
import { connect } from "react-redux";
import { SIGN_UP_ACTION } from "../../../redux/actions/JiraActions";
import { NavLink } from "react-router-dom";
function SignUpJira(props) {
  const { values, errors, handleChange, handleSubmit, touched } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="container login-content">
        <div className=" login-content">
          <h3 className="login-heading">Jira Sign Up</h3>
          <div className="mt-2 login-input ">
            <Input
              type="text"
              onChange={handleChange}
              name="email"
              size="large"
              placeholder="Email ..."
              prefix={<UserOutlined />}
            ></Input>
          </div>
          {touched && values.email ? (
            <div className="text text-danger">{errors.email}</div>
          ) : (
            ""
          )}
          <div className="mt-2 login-input">
            <Input
              type="password"
              onChange={handleChange}
              name="passWord"
              size="large"
              placeholder="Password ..."
              prefix={<LockOutlined />}
            ></Input>
          </div>
          <div className="text text-danger">{errors.passWord}</div>
          <div className="mt-2 login-input">
            <Input
              type="text"
              onChange={handleChange}
              name="name"
              size="large"
              placeholder="Name ..."
              prefix={<UserOutlined />}
            ></Input>
          </div>
          {touched && values.name ? (
            <div className="text text-danger">{errors.name}</div>
          ) : (
            ""
          )}
          <div className="mt-2 login-input">
            <Input
              type="text"
              onChange={handleChange}
              name="phoneNumber"
              size="large"
              placeholder="Phone Number ..."
              prefix={<PhoneOutlined />}
            ></Input>
          </div>

          {touched && values.phoneNumber ? (
            <div className="text text-danger">{errors.phoneNumber}</div>
          ) : (
            ""
          )}
          <Button htmlType="submit" className="login-button" type="primary">
            Sign Up
          </Button>
          <div className="login-more">
            <div></div>
            <NavLink style={{ color: "black" }} to="/login">
              Back to Login ?
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
const SignUpJiraWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  }),

  validationSchema: Yup.object().shape({
    // Kiểm tra email
    email: Yup.string()
      .required("Email is required !")
      .email("Email is invalid !"),
    // Kiểm tra password
    passWord: Yup.string()
      .min(6, "Password must have at least 6 characters !")
      .max(32, "Password just has 32 characters in total"),

    //
    name: Yup.string().required("Name is required !"),
    phoneNumber: Yup.string()
      .required("Phone number is required !")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(SIGN_UP_ACTION(values));
  },

  displayName: "Jira Sign Up ",
})(SignUpJira);

export default connect()(SignUpJiraWithFormik);
