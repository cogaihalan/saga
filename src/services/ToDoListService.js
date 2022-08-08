import { Axios } from "axios";
import { DOMAIN } from "../utils/constants/settingSystem";

class ToDoListService {
  getTaskAPI = () => {
    return () => {
      return Axios({
        url: `${DOMAIN}/ToDoList/GetAllTask`,
        method: "GET",
      });
    };
  };
  addTaskAPI = (taskName) => {
    return () => {
      return Axios({
        method: "POST",
        url: `${DOMAIN}/ToDoList/AddTask`,
        data: { taskName },
      });
    };
  };
  deleteTaskAPI = (taskName) => {
    return () => {
      return Axios({
        method: "DELETE",
        url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
      });
    };
  };
  changeStatusTaskAPI = (taskName, isCompleted) => {
    return () => {
      if (isCompleted) {
        Axios({
          method: "PUT",
          url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        });
      } else {
        Axios({
          method: "PUT",
          url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        });
      }
    };
  };
}

export const toDoListService = new ToDoListService();
