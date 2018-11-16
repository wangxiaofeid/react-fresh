import React, { Component, Fragment } from "react";

export default class Other extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }
  handleChange = event => {
    /**
     * 这是“防抖”函数的简单实现，它会以队列的方式在 250 ms 内调用
     * 表达式并取消所有挂起的队列表达式。以这种方式我们可以在用户停止输
     * 入时延迟 250 ms 来调用表达式。
     */
    console.log(event.target.value, event.nativeEvent);
    const v = event.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log(event.target);
      // this.setState({
      //   search: event.target.value
      // })
      this.setState({
        search: v
      })
    }, 250);
  }
  render() {
    return <>
      <Fragment>
        <div>xxx1</div>
        <div>xxx2</div>
      </Fragment>
      <>
        <div>xxx3</div>
        <div>xxx4</div>
        <div>xxx5</div>
        <div>
          <input type="text" onChange={this.handleChange} />
          {this.state.search ? <p>Search for: {this.state.search}</p> : null}
        </div>
      </>
    </>
  }
}