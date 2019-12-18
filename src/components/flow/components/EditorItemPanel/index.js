import React from "react";
import { Card } from "antd";
import { ItemPanel, Item } from "gg-editor";
import "./index.less";
import inputImg from "@/images/input.svg";
import actionImg from "@/images/action.svg";
import ifImg from "@/images/if.svg";

class EditorItemPanel extends React.Component {
    render() {
        if (this.props.items) {
            return <ItemPanel className="item-panel">{this.props.items}</ItemPanel>;
        }

        return (
            <ItemPanel className="item-panel">
                <Card bordered={false}>
                    <Item
                        type="node"
                        size="72*72"
                        shape="flow-circle"
                        model={{
                            color: "#FA8C16",
                            label: "数据输入",
                        }}
                        src={inputImg}
                    />
                    <Item
                        type="node"
                        size="80*48"
                        shape="flow-rect"
                        model={{
                            color: "#1890FF",
                            label: "数据处理",
                        }}
                        src={actionImg}
                    />
                    <Item
                        type="node"
                        size="80*72"
                        shape="flow-rhombus"
                        model={{
                            color: "#13C2C2",
                            label: "条件判断",
                        }}
                        src={ifImg}
                    />
                    {/* <Item
            type="node"
            size="80*48"
            shape="flow-capsule"
            model={{
              color: '#1890FF',
              label: '任务模板',
            }}
            src="https://portal-static.tongdun.cn/gaea/lib/images/rQMUhHHSqwYsPwjXxcfP.svg"
          /> */}
                </Card>
            </ItemPanel>
        );
    }
}

export default EditorItemPanel;
