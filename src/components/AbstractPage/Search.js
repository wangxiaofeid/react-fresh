import React, { PureComponent } from "react";
import { SchemaForm, createFormActions, FormButtonGroup, Submit, Reset } from "@uform/antd";

const actions = createFormActions();

export default class Search extends PureComponent {
    render() {
        const { search } = this.props.store;
        if (!search) {
            return null;
        }

        return (
            <SchemaForm actions={actions} schema={search} layout="inline" className="base-form">
                <FormButtonGroup>
                    <Submit>搜索</Submit>
                    <Reset />
                </FormButtonGroup>
            </SchemaForm>
        );
    }

    onSubmit = values => {
        this.props.submit(values);
    };
}
