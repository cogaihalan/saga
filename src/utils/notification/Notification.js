import { notification } from "antd";

export const Notification = (type, title, desc = "") => {
  return notification[type]({
    message: title,
    description: desc,
  });
};
