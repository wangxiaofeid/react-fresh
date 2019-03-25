import React from "react"
import { observer, inject } from "mobx-react"
import { Form, Button, Loading, Select, Input } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
@inject(stores => ({
  store: stores.demoStore
}))
@observer
export default class Edit extends React.Component {
  
  render() {
    const { store, form } = this.props;
    const { getFieldDecorator } = form;
    const { editType, editItem, loading }=  store;
    return (
      <div className="edit-box">
        <Form onSubmit={this.onSubmit}>
          <div className="formitem">
            <div className="label">合作方 *</div>
            <div className="right">
              {getFieldDecorator("id", {
                initialValue: editItem.id || ''
              })(
                <Input size="default" placeholder=''/>
              )}
            </div>
          </div>
          <div className="formitem">
            <div className="label"></div>
            <div className="right">
              <Button type="primary" htmlType="submit">{editType === 'add'? '新建' : '保存'}</Button>
              <Button className="ml10" onClick={this.back}>取消</Button>
            </div>
          </div>
        </Form>
      </div>
    )
  }

  onSubmit = e => {
    e.preventDefault();
    const { editType } = this.props.store;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (editType == 'add') {
          this.props.store.add(values);
        } else {
          this.props.store.edit(values);
        }
      }
    });
  }

  back = () => {
    this.props.store.changeAttr({
      showEdit: false
    });
  }
}