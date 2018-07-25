import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject('appStore')
@observer
export default class Home extends Component {
  render() {
    return <div onClick={() => {
      this.props.appStore.plus()
    }}>{this.props.appStore.num}</div>
  }
}