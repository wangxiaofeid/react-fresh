import React from "react";
import { Card, Form, Input, Select } from "antd";
import { withPropsAPI } from "gg-editor";

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 18 },
    },
};

@withPropsAPI
export default class EdgeDetail extends React.Component {
    // handleSubmit = () => {
    //   const { form, propsAPI } = this.props;
    //   const { getSelected, executeCommand, update } = propsAPI;

    //   setTimeout(() => {
    //     form.validateFieldsAndScroll((err, values) => {
    //       if (err) {
    //         return;
    //       }

    //       const item = getSelected()[0];

    //       if (!item) {
    //         return;
    //       }

    //       executeCommand(() => {
    //         update(item, {
    //           ...values,
    //         });
    //       });
    //     });
    //   }, 0);
    // }

    // renderShapeSelect() {
    //   return (
    //     <Select onChange={this.handleSubmit}>
    //       <Option value="flow-smooth">图曲线</Option>
    //       <Option value="flow-polyline">图折线</Option>
    //       <Option value="flow-polyline-round">圆角折线</Option>
    //     </Select>
    //   );
    // }

    render() {
        const { propsAPI, Detail } = this.props;
        const { getSelected } = propsAPI;

        const item = getSelected()[0];

        if (!item) {
            return null;
        }

        const value = item.getModel();
        const { label = "", shape = "flow-smooth" } = value;

        if (Detail) {
            return (
                <Card type="inner" title="边线属性" bordered={false}>
                    <Detail value={value} onChange={this.update} />
                </Card>
            );
        }
        return null;
    }

    update = values => {
        const { propsAPI } = this.props;
        const { getSelected, executeCommand, update } = propsAPI;

        const item = getSelected()[0];

        if (!item) {
            return;
        }

        executeCommand(() => {
            update(item, {
                ...values,
            });
        });
    };
}

// export default Form.create()(withPropsAPI(EdgeDetail));
