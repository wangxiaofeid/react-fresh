import React from "react";
import { Route, Redirect } from 'react-router-dom'
import SplitComponent from "./utils/splitComponent";

const router = [<Route
  key="index"
  path="/"
  exact
  render={() => <Redirect to="/demo" />} />];

const req = require.context('./pages', true, /router$/);
req.keys().map(key => {
  const r = req(key).default;
  router.push(r);
});

export default function Router() {
  return router
}