import { Button, Drawer, Space } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/types/JiraConstants";

export default function JiraModal() {
  const { visible, ComponentDrawer, submitFunction , title } = useSelector(
    (state) => state.JiraDrawerReducer
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={submitFunction} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <ComponentDrawer />
      </Drawer>
    </>
  );
}
