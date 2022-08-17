import React, { useEffect } from "react";
import {
  EDIT_USER_API,
  SET_SUBMIT_FORM,
} from "../../../redux/types/JiraConstants";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
const FormEditUser = (props) => {
  const { values, handleChange, handleSubmit } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_FORM,
      submitForm: handleSubmit,
    });
  }, []);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text"> Project ID</p>
              <input
                value={values.id}
                onChange={handleChange}
                className="form-control"
                name="id"
                disabled={true}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text">Name</p>
              <input
                value={values.name}
                onChange={handleChange}
                className="form-control"
                name="name"
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <p className="mt-3 form-text">Email</p>
              <input
                value={values.email}
                onChange={handleChange}
                className="form-control"
                name="name"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text">New Password</p>
              <input
                value={values.passWord}
                onChange={handleChange}
                className="form-control"
                name="passWord"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text">Phone number</p>
              <input
                value={values.phoneNumber}
                onChange={handleChange}
                className="form-control"
                name="phoneNumber"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const EditUserWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userId, phoneNumber, email, name } = props.editUser;
    return {
      id: userId,
      passWord: "",
      phoneNumber,
      email,
      name,
    };
  },

  validationSchema: Yup.object().shape({
    // Kiểm tra email
    email: Yup.string()
      .required("Email is required !")
      .email("Email is invalid !"),
    // Kiểm tra password
    passWord: Yup.string()
      .min(6, "Password must have at least 6 characters !")
      .max(32, "Password just has 32 characters in total"),

    name: Yup.string().required("Name is required !"),
    phoneNumber: Yup.string()
      .required("Phone number is required !")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: EDIT_USER_API,
      editUser: values,
    });
  },
  displayName: "Edit Project Jira",
})(FormEditUser);

const mapStatetoProps = (state) => ({
  editUser: state.JiraUserLoginReducer.editUser,
});

export default connect(mapStatetoProps)(EditUserWithFormik);
