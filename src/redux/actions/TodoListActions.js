import { GET_TASK_LIST } from "../types/TodoListTypes";
import Axios from "axios";
//Redux-Thunk
//Action có hai loại :
// action thực thi ngay làm thay đổi reducer
// action phải thực  hiện xử lý rồi mới gọi action 1 thực thi => async action API
export const getTask = () => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      dispatch({
        type: GET_TASK_LIST,
        data: result.data,
      });
    } catch (err) {
      throw new Error(err.response);
    }
  };
};

export const addTask = (taskName) => {
  return async (dispatch) => {
    try {
      await Axios({
        method: "POST",
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        data: { taskName: taskName },
      });
      dispatch(getTask());
    } catch (err) {
      throw new Error(err.response);
    }
  };
};
export const deleteTask = (taskName) => {
  return async (dispatch) => {
    try {
      await Axios({
        method: "DELETE",
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      });
      dispatch(getTask());
    } catch (err) {
      throw new Error(err.response);
    }
  };
};

export const changeStatus = (taskName, isCompleted) => {
  return async (dispatch) => {
    try {
      if (isCompleted) {
        await Axios({
          method: "PUT",
          url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        });
      } else {
        await Axios({
          method: "PUT",
          url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        });
      }
      dispatch(getTask());
    } catch (err) {
      throw new Error(err.response);
    }
  };
};
