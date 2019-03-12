import React from "react";
import { Spin } from "antd";
import Loadable from "react-loadable";

const Loading = () => (
  <Spin>
    <div style={{ minHeight: 200 }} />
  </Spin>
);

export default function SplitComponent(load) {
  return Loadable({
    loader: load,
    loading: Loading
  });
}
