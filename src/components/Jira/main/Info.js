import React from "react";
import { Avatar } from "antd";
export default function Info(props) {
  const { listMembers } = props;
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        {listMembers?.map((member, index) => {
          return <Avatar src={member.avatar} key={index}></Avatar>
        })}
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
