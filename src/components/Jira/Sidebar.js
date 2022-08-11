import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
const { Sider } = Layout;
export default function Sidebar() {
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
