import {
  Button,
  Space,
  Table,
  Tag,
  Avatar,
  Popconfirm,
  Popover,
  AutoComplete,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import {
  GET_ALL_PROJECTS_API,
  DELETE_PROJECT_API,
  OPEN_FORM_EDIT,
  EDIT_PROJECT,
  GET_USER_API,
  ASSIGN_USER_TO_PROJECT_API,
} from "../../../redux/types/JiraConstants";
import FormEditProject from "../../../components/Forms/Jira/FormEditProject";

export default function ProjectManagement(props) {
  const [userOption, setUserOption] = useState("");
  const listProjects = useSelector(
    (stateList) => stateList.JiraManageAllProjects.listProjects
  );
  const listUsers = useSelector(
    (stateList) => stateList.JiraUserLoginReducer.listUsers
  )?.map((user) => ({ label: user.name, value: user.userId.toString() }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECTS_API,
    });
  }, []);

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
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members, record) => {
        return (
          <div>
            {members?.slice(0, 2).map((member, index) => {
              return (
                <Avatar
                  className="me-1"
                  key={index}
                  src={member.avatar}
                ></Avatar>
              );
            })}

            {members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="rightTop"
              title="Add User "
              content={() => {
                return (
                  <AutoComplete
                    options={listUsers}
                    style={{ width: 200 }}
                    onSearch={(value) => {
                      dispatch({
                        type: GET_USER_API,
                        userKeyword: value,
                      });
                    }}
                    value={userOption}
                    onChange={(value) => {
                      setUserOption(value);
                    }}
                    onSelect={(value, option) => {
                      setUserOption(option.label);
                      dispatch({
                        type: ASSIGN_USER_TO_PROJECT_API,
                        userProject: {
                          projectId: record.id,
                          userId: value,
                        },
                      });
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button
                style={{ width: "30px", height: "30px" }}
                className="ms-1 d-inline-flex align-items-center justify-content-center rounded-circle flex-nowrap"
              >
                <PlusOutlined />
              </Button>
            </Popover>
          </div>
        );
      },
    },
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
      render: (project, record) => {
        return (
          <Space>
            <button
              onClick={() => {
                // Mở form edit
                dispatch({
                  type: OPEN_FORM_EDIT,
                  Component: FormEditProject,
                  SubmitFunction: () => {},
                });
                // cập nhật project edit
                dispatch({
                  type: EDIT_PROJECT,
                  models: record,
                });
              }}
              className="btn btn-primary"
            >
              <EditOutlined />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_PROJECT_API,
                  projectId: project.id,
                });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined />
              </button>
            </Popconfirm>
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
      ></Space>
      <Table columns={columns} rowKey={"id"} dataSource={listProjects} />
    </div>
  );
}
