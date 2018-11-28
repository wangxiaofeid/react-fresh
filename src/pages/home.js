import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import SplitComponent from "@/utils/splitComponent";
import { plus } from "@xiaofei.wang/float.js";

const Other = SplitComponent(() => import(/* webpackChunkName: "other" */'./other'))

@inject('appStore')
@observer
export default class Home extends Component {
  render() {
    return <div className="home">
      <div className="botton" onClick={() => {
        this.props.appStore.plus()
      }}>{this.props.appStore.num}</div>
      <Other />
      {plus(.2, .1)}
    </div>
  }
}