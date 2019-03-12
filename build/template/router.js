import React from "react";
import { Route } from "react-router-dom";
import SplitComponent from "@/utils/splitComponent";

const router = <Route
                  key="__pageName__"
                  path="/__pageName__"
                  component={SplitComponent(() => import(/* webpackChunkName: "__pageName__" */'./index'))} 
                />

export default router;
