import React from "react";
import { Spin } from "antd";
import Loadable from 'react-loadable';

const Loading = () => {
  return <Spin><div style={{minHeight: 200}}></div></Spin>
}

export default function SplitComponent(load) {
  return Loadable({
    loader: load,
    loading: Loading
  })
}