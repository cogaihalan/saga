import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../../components/Jira/Sidebar";
import Menu from "../../components/Jira/Menu";
import ModalInfo from "../../components/Jira/Modal/ModalInfo";
import ModalSearch from "../../components/Jira/Modal/ModalSearch";
export const JiraTemplate = (props) => {
  const { Component, ...restParams } = props;
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <Sidebar></Sidebar>
              <Menu></Menu>
              <Component {...propsRoute}></Component>
            </div>
            <ModalInfo></ModalInfo>
            <ModalSearch></ModalSearch>
          </>
        );
      }}
    />
  );
};
