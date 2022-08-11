import React from "react";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_TASK,
  SET_SUBMIT_FORM,
} from "../../types/JiraConstants";
const initialState = {
  visible: false,
  title: "",
  ComponentDrawer: () => <p>default</p>,
  submitFunction: () => {},
};

const JiraDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };
    case CLOSE_DRAWER:
      return { ...state, visible: false };
    case OPEN_FORM_EDIT_TASK:
      return {
        ...state,
        visible: true,
        title: action.title,
        ComponentDrawer: action.Component,
      };
    case SET_SUBMIT_FORM:
      return { ...state, submitFunction: action.submitForm };
    default:
      return { ...state };
  }
};
export default JiraDrawerReducer;
