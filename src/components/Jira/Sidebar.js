import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_TASK,
} from "../../redux/types/JiraConstants";
import FormCreateTask from "../Forms/Jira/FormCreateTask";
const { Sider } = Layout;
export default function Sidebar() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="sidebar">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100%" }}
      >
        <div className="logo" />
        <div
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="me-2 mb-3 text-center"
          style={{ color: "#fff", fontSize: "20px" }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <PlusOutlined />,
              label: "Create Issue",
              onClick: () => {
                dispatch({
                  type: OPEN_FORM_EDIT_TASK,
                  title: "CREATE TASK",
                  Component: FormCreateTask,
                  SubmitFunction: () => {},
                });
              },
            },
            {
              key: "2",
              icon: <SearchOutlined />,
              label: "Search Issue",
            },
          ]}
        />
      </Sider>
    </div>
  );
}
