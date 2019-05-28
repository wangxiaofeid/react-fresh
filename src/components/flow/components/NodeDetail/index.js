import React from 'react';
import { Card, Form, Input } from "antd";
import { withPropsAPI } from 'gg-editor';

const { Item } = Form;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

class NodeDetail extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      this.update(values);
    });
  }

  render() {
    const { form, propsAPI, Detail } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;

    const item = getSelected()[0];

    if (!item) {
      return null;
    }

    const value = item.getModel();
    const { label } = value;

    return (
      <Card type="inner" title="节点属性" bordered={false}>
        {
          Detail ? <Detail value={value} onChange={this.update}/>
            :
            <Form onSubmit={this.handleSubmit}>
              <Item
                label="标签"
                {...inlineFormItemLayout}
              >
                {
                  getFieldDecorator('label', {
                    initialValue: label,
                  })(<Input onBlur={this.handleSubmit} />)
                }
              </Item>
            </Form>
        }
      </Card>
    );
  }

  update = (values) => {
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    const item = getSelected()[0];

    if (!item) {
      return;
    }

    executeCommand(() => {
      update(item, {
        ...values
      });
    });
  }
}

export default Form.create()(withPropsAPI(NodeDetail));
