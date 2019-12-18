import React from "react";
import { withPropsAPI } from "gg-editor";

@withPropsAPI
export default class NodeDetail extends React.Component {
    render() {
        const { propsAPI, Detail, detailProps } = this.props;
        const { getSelected } = propsAPI;

        const item = getSelected()[0];

        if (!item) {
            return null;
        }

        const value = item.getModel();
        const { label } = value;

        if (Detail) {
            return <Detail value={value} {...detailProps} />;
        }
        return null;
    }
}
