import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Select, Slider } from "antd";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  GET_ALL_PROJECTS_API,
  GET_TASK_PRIORITY_API,
  GET_TASK_TYPE_API,
  GET_USER_API,
  SET_SUBMIT_FORM,
} from "../../../redux/types/JiraConstants";
function FormCreateTask(props) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { listTaskType, listTaskPriority } = useSelector(
    (stateList) => stateList.JiraTaskReducer
  );
  const { listProjects } = useSelector(
    (stateList) => stateList.JiraManageAllProjects
  );
  const listUsers = useSelector(
    (stateList) => stateList.JiraUserLoginReducer.listUsers
  ).map((user) => ({ label: user.name, value: user.userId }));
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const { values, handleChange, handleSubmit, setFieldValue } = props;
  const handleEditorChange = (content) => {
    setFieldValue("description", content);
  };
  useEffect(() => {
    dispatch({
      type: GET_USER_API,
      userKeyword: "",
    });
    dispatch({
      type: GET_ALL_PROJECTS_API,
    });
    dispatch({
      type: GET_TASK_TYPE_API,
    });
    dispatch({
      type: GET_TASK_PRIORITY_API,
    });
    dispatch({
      type: SET_SUBMIT_FORM,
      submitForm: handleSubmit,
    });
  }, []);
  // Task type => type ID
  // Priority => prioriry ID
  // project => project ID
  // assignee => select,option
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <p className="mt-3 form-text">Project ID</p>
              <select
                className="form-control"
                value={values.projectId}
                onChange={handleChange}
                name="projectId"
              >
                {listProjects.map((project, index) => {
                  return (
                    <option key={index} value={project.id}>
                      {project.projectName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text">Task Type</p>
              <select
                value={values.typeId}
                onChange={handleChange}
                className="form-control"
                name="typeId"
              >
                {listTaskType.map((type, index) => {
                  return (
                    <option key={index} value={type.id}>
                      {type.taskType}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text">Priority</p>
              <select
                value={values.priorityId}
                onChange={handleChange}
                className="form-control"
                name="priorityId"
              >
                {listTaskPriority.map((priority, index) => {
                  return (
                    <option value={priority.priorityId} key={index}>
                      {priority.priority}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text">Assignees</p>
              <Select
                mode="multiple"
                optionFilterProp="label"
                options={listUsers}
                placement="bottomLeft"
                placeholder="Please select"
                // onChange={handleChange}
                onSelect={(value, option) => {
                  console.log({ value, option });
                }}
                style={{ width: "100%" }}
              ></Select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text">Time Tracking (hours)</p>
              <Slider
                value={Number(timeTracking.timeTrackingSpent)}
                max={
                  Number(timeTracking.timeTrackingRemaining) +
                  Number(timeTracking.timeTrackingSpent)
                }
              />
              <div className="time-info d-flex justify-content-between">
                <div className="fw-bold">
                  {timeTracking.timeTrackingSpent}h logged
                </div>
                <div className="fw-bold">
                  {timeTracking.timeTrackingRemaining}h remaining
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <div className="form-group">
                    <p className="mt-3 form-text">Time Spent</p>
                    <input
                      //   value={values.timeTrackingSpent}
                      onChange={(e) => {
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingSpent: e.target.value,
                        });
                      }}
                      min={0}
                      type="number"
                      name="timeTrackingSpent"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <p className="mt-3 form-text">Time Remaining</p>
                    <input
                      //   value={values.timeTrackingRemaining}
                      onChange={(e) => {
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingRemaining: e.target.value,
                        });
                      }}
                      min={0}
                      type="number"
                      name="timeTrackingRemaining"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="mt-3 form-text">Original Estimate</p>
              <input
                value={values.originalEstimate}
                defaultValue={0}
                min={0}
                type="number"
                name="originalEstimate"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <p className="mt-3 form-text">Description</p>
              <Editor
                value={values.description}
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
}

const CreateTaskWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      listUserAsign: [0],
      taskName: "string",
      description: "string",
      statusId: "string",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: 0,
      typeId: 0,
      priorityId: 0,
    };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
  },
  displayName: "Create Task Jira",
})(FormCreateTask);

const mapStatetoProps = (state) => ({});

export default connect(mapStatetoProps)(CreateTaskWithFormik);
