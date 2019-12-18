import React from "react";
import { observer, inject } from "mobx-react";
import AbstractPage from "@/components/AbstractPage";

@inject(stores => ({
    store: stores.demoStore,
}))
@observer
export default class Demo extends AbstractPage {
    init = () => {
        this.props.store.getRole();
        this.props.store.query();
    };
}
