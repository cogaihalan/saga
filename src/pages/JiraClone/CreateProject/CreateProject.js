import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
import "./CreateProject.css";
import {
  CREATE_PROJECT_API,
  GET_ALL_PROJECT_CATEGORY_API,
} from "../../../redux/types/JiraConstants";
function CreateProject(props) {
  const { handleChange, handleSubmit, setFieldValue } = props;
  const listCategoryProject = useSelector(
    (state) => state.JiraProjectCategoryReducer.listCategoryProject
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_API,
    });
  }, []);
  const handleEditorChange = (content) => {
    setFieldValue("description", content);
  };
  return (
    <div className="container">
      <h3 className="m-2 fs-1 heading">Create Project</h3>
      <div className="container p-2">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <p className="mt-3 form-text">Name</p>
            <input
              onChange={handleChange}
              className="form-control"
              name="projectName"
            />

            {/* <div className="text text-danger">{errors.projectName}</div> */}
          </div>
          <div className="form-group">
            <p className="mt-3 form-text">Description</p>
            <Editor
              onEditorChange={handleEditorChange}
              name="description"
              initialValue=""
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
          <div className="form-group">
            <select
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
          <button className="mt-3 btn btn-outline-primary" type="submit">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

const CreateProjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },

  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("name is required !"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_PROJECT_API,
      models: values,
    });
  },
  displayName: "Create Projects Jira",
})(CreateProject);

const mapStatetoProps = (state) => ({
  arrProjectCategory: state.JiraProjectCategoryReducer.listCategoryProject,
});

export default connect(mapStatetoProps)(CreateProjectWithFormik);
