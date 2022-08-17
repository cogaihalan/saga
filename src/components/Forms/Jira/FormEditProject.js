import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect } from "react";
import {
  EDIT_PROJECT_API,
  GET_ALL_PROJECT_CATEGORY_API,
  SET_SUBMIT_FORM,
  UPDATE_PROJECT_API,
} from "../../../redux/types/JiraConstants";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
const FormEditProject = (props) => {
  const { values, handleChange, handleSubmit, setFieldValue } = props;
  const listCategoryProject = useSelector(
    (state) => state.JiraProjectCategoryReducer.listCategoryProject
  );
  const handleEditorChange = (content) => {
    setFieldValue("description", content);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_API,
    });
    props.dispatch({
      type: SET_SUBMIT_FORM,
      submitForm: handleSubmit,
    });
  }, []);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <p className="mt-3 form-text"> Project ID</p>
              <input
                value={values.id}
                onChange={handleChange}
                className="form-control"
                name="id"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <p className="mt-3 form-text">Name</p>
              <input
                value={values.projectName}
                onChange={handleChange}
                className="form-control"
                name="projectName"
              />
            </div>
          </div>

          <div className="col-4">
            <div className="form-group">
              <p className="mt-3 form-text">Category</p>
              <select
                value={values.categoryId}
                onChange={handleChange}
                className="form-control"
                name="categoryId"
              >
                {listCategoryProject.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.projectCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <p className="mt-3 form-text">Description</p>
              <Editor
                onEditorChange={handleEditorChange}
                name="description"
                initialValue={values.description}
                init={{
                  height: 420,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Poppins,Arial,sans-serif; font-size:16px }",
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const EditProjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectName, description, id, categoryId } = props.projectUpdate;
    return {
      id,
      projectName,
      description,
      creator: 0,
      categoryId: String(categoryId),
    };
  },

  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Name is required !"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: UPDATE_PROJECT_API,
      projectUpdate: values,
    });
  },
  displayName: "Edit Project Jira",
})(FormEditProject);

const mapStatetoProps = (state) => ({
  projectUpdate: state.JiraProjectReducer.projectUpdate,
  arrProjectCategory: state.JiraProjectCategoryReducer.listCategoryProject,
});

export default connect(mapStatetoProps)(EditProjectWithFormik);
