import { Button, Space, Table, Tag, Input, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OPEN_FORM_EDIT_TASK,
  GET_USER_API,
  EDIT_USER,
  DELETE_USER_API,
} from "../../../redux/types/JiraConstants";
import FormEditUser from "../../../components/Forms/Jira/FormEditUser";

export default function UserManagement(props) {
  const searchRef = useRef(null);
  const listUsers = useSelector(
    (stateList) => stateList.JiraUserLoginReducer.listUsers
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_USER_API,
      userKeyword: "",
    });
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "userId",
      key: "userId",
      sorter: (nextItem, item) => nextItem.userId - item.userId,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => {
        return <Tag color="magenta">{email}</Tag>;
      },
      sorter: (nextItem, item) => {
        const nextEmail = nextItem.email?.trim().toLowerCase();
        const currEmail = item.email?.trim().toLowerCase();
        if (nextEmail < currEmail) return -1;
        return 1;
      },
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (user, record) => {
        return (
          <Space>
            <button
              onClick={() => {
                // Mở form edit
                dispatch({
                  type: OPEN_FORM_EDIT_TASK,
                  title: "EDIT USER",
                  Component: FormEditUser,
                  SubmitFunction: () => {},
                });
                // cập nhật user edit
                dispatch({
                  type: EDIT_USER,
                  editUser: record,
                });
              }}
              className="btn btn-primary"
            >
              <EditOutlined />
            </button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_USER_API,
                  userId: user.userId,
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
      <h3 className="m-2 fs-1 heading">User Management</h3>
      <div
        className="d-flex"
        style={{
          gap: 8,
          marginBottom: 32,
        }}
      >
        <Input
          onChange={(e) => {
            if (searchRef.current) clearTimeout(searchRef.current);
            searchRef.current = setTimeout(() => {
              dispatch({
                type: GET_USER_API,
                userKeyword: e.target.value,
              });
            }, 450);
            searchRef.current = e.target.value;
          }}
          className=""
          style={{ maxWidth: "50%" }}
          placeholder="Search user ..."
        />
      </div>
      <Table
        size="small"
        columns={columns}
        rowKey={"userId"}
        dataSource={listUsers}
      />
    </div>
  );
}
