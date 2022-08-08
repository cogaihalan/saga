import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../../components/Home/Header/Header";
export const HomeTemplate = (props) => {
  const { Component, ...restParams } = props;
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Header></Header>
            <Component {...propsRoute}></Component>
          </Fragment>
        );
      }}
    />
  );
};
