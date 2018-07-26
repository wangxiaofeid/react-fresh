import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import SplitComponent from "@/utils/splitComponent";

const Other = SplitComponent(() => import(/* webpackChunkName: "other" */'./other'))

@inject('appStore')
@observer
export default class Home extends Component {
  render() {
    return <div>
      <div onClick={() => {
        this.props.appStore.plus()
      }}>{this.props.appStore.num}</div>
      <Other />
    </div>
  }
}