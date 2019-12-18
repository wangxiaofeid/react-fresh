import React from "react";
import { Card } from "antd";
import { NodePanel, EdgePanel, DetailPanel, withPropsAPI } from "gg-editor";
import NodeDetail from "../NodeDetail";
import EdgeDetail from "../EdgeDetail";
import "./index.less";

class FlowDetailPanel extends React.Component {
    render() {
        const { Node, Edge, detailProps } = this.props;
        return (
            <DetailPanel className="detail-panel">
                <NodePanel>
                    <NodeDetail Detail={Node} detailProps={detailProps} />
                </NodePanel>
                <EdgePanel>
                    <EdgeDetail Detail={Edge} detailProps={detailProps} />
                </EdgePanel>
            </DetailPanel>
        );
    }
}

export default FlowDetailPanel;
