import React from "react";
import { observer, inject } from "mobx-react";
import { Form, Button, Drawer, Input } from "antd";
import { formItemLayout } from "@/utils/constants";

const FormItem = Form.Item;

@Form.create()
@inject(stores => ({
    store: stores.demoStore,
}))
@observer
export default class Edit extends React.Component {
    render() {
        const { store, form } = this.props;
        const { getFieldDecorator } = form;
        const { editType, editItem, showEdit } = store;
        return (
            <Drawer
                className="edit-box"
                visible={showEdit}
                width={600}
                onClose={this.back}
                title={editType == "add" ? "新建" : "编辑"}
            >
                <Form onSubmit={this.onSubmit} {...formItemLayout}>
                    <FormItem label="合作方">
                        {getFieldDecorator("name", {
                            initialValue: editItem.name || "",
                            rules: [
                                {
                                    required: true,
                                    message: "必填!",
                                },
                            ],
                        })(<Input size="default" placeholder="" />)}
                    </FormItem>
                </Form>
                <div className="drawer-footer">
                    <Button onClick={this.onSubmit} type="primary">
                        {editType === "add" ? "新建" : "保存"}
                    </Button>
                    <Button onClick={this.back} className="ml10">
                        取消
                    </Button>
                </div>
            </Drawer>
        );
    }

    onSubmit = e => {
        e.preventDefault();
        const { editType } = this.props.store;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (editType == "add") {
                    this.props.store.add(values);
                } else {
                    this.props.store.edit(values);
                }
            }
        });
    };

    back = () => {
        this.props.store.changeAttr({
            showEdit: false,
        });
        this.props.form.resetFields();
    };
}
