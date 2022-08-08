import { Layout } from "antd";
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
export const UserLoginTemplate = (props) => {
  const { Sider, Content } = Layout;
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerWidth,
      });
    };
  }, []);
  let { Component, ...restParams } = props;
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <>
            <Layout>
              <Sider
                width={size.width / 2}
                style={{
                  height: size.height,
                  background: `url(https://images.unsplash.com/photo-1495314736024-fa5e4b37b979?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=${Math.round(size.width/2)}&h=${Math.round(size.height)}&q=60) center no-repeat `,
                }}
              ></Sider>
              <Content>
                <Component {...propsRoute}></Component>
              </Content>
            </Layout>
          </>
        );
      }}
    ></Route>
  );
};
