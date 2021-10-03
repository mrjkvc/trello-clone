import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/AppLayout";
import BoardPage from "../pages/BoardPage/BoardPage";

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AppLayout>
            <BoardPage></BoardPage>
          </AppLayout>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
