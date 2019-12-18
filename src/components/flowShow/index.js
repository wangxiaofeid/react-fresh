import React, { Component } from "react";
import { Row, Col } from "antd";
import GGEditor, { Flow } from "gg-editor";
import EditorDetailPanel from "./components/EditorDetailPanel";
import NodeDetail from "./components/NodeDetail";
import EdgeDetail from "./components/EdgeDetail";
import "./index.less";

export default class FlowShow extends Component {
    static defaultProps = {
        value: {},
        event: {},
        NodeDetail: NodeDetail,
        EdgeDetail: EdgeDetail,
    };

    render() {
        const { value = {}, NodeDetail, EdgeDetail, detailProps, event, children } = this.props;
        return (
            <GGEditor className="editor editor-show">
                <Row type="flex" className="editor-bd">
                    <Col span={24} className="editor-content">
                        <Flow
                            className="flow"
                            noEndEdge={false}
                            data={value}
                            shortcut={{
                                delete: false,
                            }}
                            {...event}
                        />
                    </Col>
                </Row>
                <div>
                    <EditorDetailPanel Node={NodeDetail} Edge={EdgeDetail} detailProps={detailProps} />
                </div>
                {children}
            </GGEditor>
        );
    }
}
