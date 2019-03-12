import React from "react";
import { Route } from "react-router-dom";
import SplitComponent from "@/utils/splitComponent";

const router = <Route key="demo" path="/demo" component={SplitComponent(() => import(/* webpackChunkName: "demo" */'./index'))} />;

export default router;
