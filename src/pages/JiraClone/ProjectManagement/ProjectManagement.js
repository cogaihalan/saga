import { Button, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import {
  GET_ALL_PROJECTS_API,
  DELETE_PROJECT_API,
} from "../../../redux/types/JiraConstants";

export default function ProjectManagement(props) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const listProjects = useSelector(
    (stateList) => stateList.JiraManageAllProjects.listProjects
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECTS_API,
    });
  }, []);
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (nextItem, item) => nextItem.id - item.id,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (nextItem, item) => {
        const projectName1 = nextItem.projectName?.trim().toLowerCase();
        const projectName2 = item.projectName?.trim().toLowerCase();
        if (projectName1 < projectName2) return -1;
        return 1;
      },
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (creator, index) => {
        return (
          <Tag key={index} color="lime">
            {creator.name}
          </Tag>
        );
      },
      sorter: (nextItem, item) => {
        const creator1 = nextItem.creator.name?.trim().toLowerCase();
        const creator2 = item.creator.name?.trim().toLowerCase();

        if (creator1 < creator2) return -1;
        return 1;
      },
    },
    // {
    //   title: "Members",
    //   dataIndex: "members",
    //   key: "members",
    //   //   render: (members, index) => {
    //   //     return members.map((member) => (
    //   //       <span key={index + 1}>{member.name},</span>
    //   //     ));
    //   //   },
    // },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, index) => {
        return <div key={index}>{HTMLReactParser(text)}</div>;
      },
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },

    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <Space>
            <button className="btn btn-primary">
              <EditOutlined />
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: DELETE_PROJECT_API,
                });
              }}
              className="btn btn-danger"
            >
              <DeleteOutlined />
            </button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="container-fluid d-flex flex-column ">
      <h3 className="m-2 fs-1 heading">Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={listProjects}
        onChange={handleChange}
      />
    </div>
  );
}
