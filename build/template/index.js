import React from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'classnames';
import { Form, Row, Col, Input, Select, Button, Table, Icon, Spin } from 'antd';
import Edit from './edit';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const Column = Table.Column;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

@inject('__pageName__Store')
@observer
export default class __pageName2__ extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTable = () => {
        const { pageSize, currentPage, total, dataList, rowKey } = this.props.__pageName__Store;
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
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="name" dataIndex="name" key="name" />
                <Column title="phone" dataIndex="phone" key="phone" />
                <Column
                    title="操作"
                    dataIndex="actions"
                    key="actions"
                    render={(text, item) => {
                        return (
                            <span className="action-btns">
                                <a
                                    href="javascript:;"
                                    onClick={() => {
                                        this.props.__pageName__Store.changeAttr({
                                            editType: 'edit',
                                            editItem: item,
                                            showEdit: true,
                                        });
                                    }}
                                >
                                    <Icon type="edit" />
                                </a>
                                <a
                                    href="javascript:;"
                                    onClick={() => {
                                        this.props.__pageName__Store.delete(item[rowKey]);
                                    }}
                                >
                                    <Icon type="delete" />
                                </a>
                            </span>
                        );
                    }}
                />
            </Table>
        );
    };

    render() {
        const { loading } = this.props.__pageName__Store;
        return (
            <Spin spinning={loading} wrapperClassName="page __pageName__">
                <div className="page-form">
                    <div className="new-btns">
                        <Button type="primary" onClick={this.create}>
                            新建
                        </Button>
                    </div>
                    <__pageName2__SearchForm submit={this.submit} />
                </div>
                <div className="page-content">{this.renderTable()}</div>
                <Edit />
            </Spin>
        );
    }

    componentDidMount() {
        this.props.__pageName__Store.search();
    }

    create = () => {
        this.props.__pageName__Store.changeAttr({
            editType: 'add',
            editItem: {},
            showEdit: true,
        });
    };

    submit = values => {
        const { pageSize } = this.props.__pageName__Store;
        this.props.__pageName__Store.search(1, pageSize, values);
    };

    pageOnChange = current => {
        const { searchForm, pageSize } = this.props.__pageName__Store;
        this.props.__pageName__Store.search(current, pageSize, searchForm);
    };

    showSizeChange = (current, pageSize) => {
        const { searchForm } = this.props.__pageName__Store;
        this.props.__pageName__Store.search(1, pageSize, searchForm);
    };
}

@Form.create()
class __pageName2__SearchForm extends React.Component {
    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submit(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.onSubmit}>
                <Row>
                    <Col span={5}>
                        <FormItem {...formItemLayout} label="指标编号">
                            {getFieldDecorator('indexId')(<Input size="default" placeholder="" />)}
                        </FormItem>
                    </Col>
                    <Col span={5}>
                        <FormItem {...formItemLayout} label="行业">
                            {getFieldDecorator('industry')(
                                <Select size="default" allowClear>
                                    <Option value="key">xxx</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Button className="ml20 pr5" type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button className="ml10 pr5" onClick={this.resetFields}>
                            重置
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }

    resetFields = () => {
        this.props.form.resetFields();
    };
}
