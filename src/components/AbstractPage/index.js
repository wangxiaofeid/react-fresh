import React from "react";
import { Button, Table, Spin, Divider } from "antd";
import Edit from "./Edit";
import Search from "./Search";
import "./index.less";

const Column = Table.Column;

export default class AbstractPage extends React.Component {
    render() {
        const { loading, pageName } = this.props.store;
        return (
            <Spin spinning={loading} wrapperClassName={"page " + pageName}>
                <div className="page-form">
                    {this.renderSearch()}
                    {this.renderTools()}
                </div>
                <div className="page-content">{this.renderTable()}</div>
                {this.renderEdit()}
            </Spin>
        );
    }

    renderSearch = () => {
        return <Search store={this.props.store} />;
    };

    renderEdit = () => {
        const { edit } = this.props.store;
        if (edit) {
            return <Edit />;
        }
        return null;
    };

    renderTools = () => {
        return (
            <div className="new-btns">
                <Button type="primary" onClick={this.create}>
                    新建
                </Button>
            </div>
        );
    };

    renderTable = () => {
        const { pageSize, currentPage, total, dataList, rowKey, table, hideAction } = this.props.store;
        if (table) {
            const { columns } = table;
            return (
                <Table
                    dataSource={dataList.toJS()}
                    rowKey={rowKey}
                    bordered
                    pagination={{
                        current: currentPage,
                        total: total,
                        pageSize: pageSize,
                        onChange: this.pageOnChange,
                        showSizeChanger: true,
                        onShowSizeChange: this.showSizeChange,
                        showTotal: total => `总共 ${total} 条`,
                    }}
                >
                    {columns.map(column => (
                        <Column {...column} />
                    ))}
                    {!hideAction && (
                        <Column title="操作" dataIndex="__actions__" key="__actions__" render={this.renderActions} />
                    )}
                </Table>
            );
        }
        return null;
    };

    renderActions = (text, item) => {
        return (
            <span className="action-btns">
                <a
                    href="javascript:;"
                    onClick={() => {
                        this.props.store.changeAttr({
                            editType: "edit",
                            editItem: item,
                            showEdit: true,
                        });
                    }}
                >
                    编辑
                </a>
                <Divider type="vertical" />
                <a
                    href="javascript:;"
                    onClick={() => {
                        this.props.store.delete(item[rowKey]);
                    }}
                >
                    删除
                </a>
            </span>
        );
    };

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.props.store.query();
    };

    create = () => {
        this.props.store.changeAttr({
            editType: "add",
            editItem: {},
            showEdit: true,
        });
    };

    submit = values => {
        const { pageSize } = this.props.store;
        this.props.store.query(1, pageSize, values);
    };

    pageOnChange = current => {
        const { searchForm, pageSize } = this.props.store;
        this.props.store.query(current, pageSize, searchForm);
    };

    showSizeChange = (current, pageSize) => {
        const { searchForm } = this.props.store;
        this.props.store.query(1, pageSize, searchForm);
    };
}
