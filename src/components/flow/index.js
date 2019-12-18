import React, { Component } from "react";
import { Row, Col } from "antd";
import GGEditor, { Flow, withPropsAPI, RegisterNode } from "gg-editor";
import FlowToolbar from "./components/EditorToolbar";
import EditorItemPanel from "./components/EditorItemPanel";
// import FlowDetailPanel from './components/EditorDetailPanel';
import "./index.less";

export default class FlowEdit extends Component {
    static defaultProps = {
        canEditFlow: true, // 是否可编辑flow图
        toolbar: ["undo", "redo", "delete", "zoomIn", "zoomOut", "autoZoom", "resetZoom"],
        value: {},
        event: {},
    };

    constructor(props) {
        super(props);
    }

    getValue = () => {
        if (this.valueComponent) {
            return this.valueComponent.getValue();
        } else {
            return {};
        }
    };

    onChange = evt => {
        this.props.onChange && this.props.onChange(this.getValue(), evt);
    };

    render() {
        const {
            value = {},
            canEditFlow,
            NodeDetail,
            EdgeDetail,
            ItemPanel,
            children,
            items,
            event,
            toolBarButton,
            style = {},
        } = this.props;
        console.log("flow render...", value);
        return (
            <GGEditor className="editor" style={style}>
                <Row type="flex" className="editor-bd">
                    {canEditFlow && (
                        <Col span={4} className="editor-sidebar">
                            <EditorItemPanel items={items} />
                        </Col>
                    )}
                    <Col span={canEditFlow ? 20 : 24} className="editor-content">
                        {canEditFlow && (
                            <Row type="flex" className="editor-hd">
                                <Col span={24}>
                                    <FlowToolbar toolBarButton={toolBarButton} />
                                </Col>
                            </Row>
                        )}
                        <Flow
                            className="flow"
                            noEndEdge={false}
                            data={value}
                            shortcut={{
                                delete: canEditFlow,
                            }}
                            onAfterChange={this.onChange}
                            {...event}
                        />
                    </Col>
                </Row>

                {/* <FlowDetailPanel Node={NodeDetail} Edge={EdgeDetail} /> */}

                <GetValueComponent ref={node => (this.valueComponent = node)} />

                {this.props.children}

                {/* 自定义图形 */}
                {/* <RegisterNode name="flow-wxf-capsule" extend="flow-capsule" config={{
                    draw: item => {
                        const group = item.getGraphicGroup();
                        const model = item.getModel();
                        const width = 184;
                        const height = 40;
                        }
                    }}/> 
                */}
            </GGEditor>
        );
    }
}

@withPropsAPI
class GetValueComponent extends Component {
    getValue = () => {
        const { save } = this.props.propsAPI;
        return save();
    };
    render() {
        return null;
    }
}
