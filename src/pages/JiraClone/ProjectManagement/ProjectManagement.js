import { Button, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
const data = [
  {
    members: [
      {
        userId: 850,
        name: "AnhHoang",
        avatar: "https://ui-avatars.com/api/?name=AnhHoang",
      },
      {
        userId: 984,
        name: "Change Name123123",
        avatar: "https://ui-avatars.com/api/?name=Change Name123123",
      },
      {
        userId: 1027,
        name: "thanh",
        avatar: "https://ui-avatars.com/api/?name=thanh",
      },
    ],
    creator: {
      id: 2092,
      name: "chien khu",
    },
    id: 6797,
    projectName: "chien khu viet bac 1",
    description: "<p>s</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "chien-khu-viet-bac-1",
    deleted: false,
  },
  {
    members: [
      {
        userId: 1557,
        name: "huyen",
        avatar: "https://ui-avatars.com/api/?name=huyen",
      },
      {
        userId: 1996,
        name: "tuan",
        avatar: "https://ui-avatars.com/api/?name=tuan",
      },
      {
        userId: 2009,
        name: "long",
        avatar: "https://ui-avatars.com/api/?name=long",
      },
      {
        userId: 2071,
        name: "anh Quan",
        avatar: "https://ui-avatars.com/api/?name=anh Quan",
      },
    ],
    creator: {
      id: 2092,
      name: "chien khu",
    },
    id: 6798,
    projectName: "chien khu viet bac 2",
    description: "<p>chien khu viet bac 2</p>",
    categoryId: 3,
    categoryName: "Dự án di động",
    alias: "chien-khu-viet-bac-2",
    deleted: false,
  },
  {
    members: [
      {
        userId: 1027,
        name: "thanh",
        avatar: "https://ui-avatars.com/api/?name=thanh",
      },
    ],
    creator: {
      id: 2092,
      name: "chien khu",
    },
    id: 6799,
    projectName: "chien khu viet bac 3",
    description: "<p>chien khu viet bac 3</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "chien-khu-viet-bac-3",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 2344,
      name: "Bao",
    },
    id: 6800,
    projectName: "Test1",
    description: "<p>123123</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "test1",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 2360,
      name: "Hoàng",
    },
    id: 6804,
    projectName: "ProjectName",
    description: "<p>test project</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "projectname",
    deleted: false,
  },
  {
    members: [
      {
        userId: 850,
        name: "AnhHoang",
        avatar: "https://ui-avatars.com/api/?name=AnhHoang",
      },
      {
        userId: 1861,
        name: "Khoasharp",
        avatar: "https://ui-avatars.com/api/?name=Khoasharp",
      },
      {
        userId: 1191,
        name: "khai 123",
        avatar: "https://ui-avatars.com/api/?name=khai 123",
      },
      {
        userId: 827,
        name: "hohoka",
        avatar: "https://ui-avatars.com/api/?name=hohoka",
      },
      {
        userId: 984,
        name: "Change Name123123",
        avatar: "https://ui-avatars.com/api/?name=Change Name123123",
      },
      {
        userId: 1024,
        name: "zoro112212",
        avatar: "https://ui-avatars.com/api/?name=zoro112212",
      },
    ],
    creator: {
      id: 2229,
      name: "string",
    },
    id: 6822,
    projectName: "newss",
    description: "<p>newss</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "newss",
    deleted: false,
  },
];
export default function ProjectManagement(props) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
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
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (creator, index) => {
        return <div key={index}>{creator.name}</div>;
      },
    },
    // {
    //   title: "Members",
    //   dataIndex: "members",
    //   key: "members",
    // //   render: (members, index) => {
    // //     return members.map((member) => (
    // //       <span key={index + 1}>{member.name},</span>
    // //     ));
    // //   },
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
            <button className="btn btn-danger">
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
      <Table columns={columns} dataSource={data} onChange={handleChange} />
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
    </div>
  );
}
