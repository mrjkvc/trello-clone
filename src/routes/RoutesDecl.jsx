import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/AppLayout";
import BoardPage from "../pages/BoardPage/BoardPage";
import HomePage from "../pages/HomePage/HomePage";
import LogInPage from "../pages/LoginPage/LoginPage";
import RouteWrapper from "./RouteWrapper";

const RoutesDecl = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <RouteWrapper>
              <AppLayout>
                <HomePage></HomePage>
              </AppLayout>
            </RouteWrapper>
          }
        ></Route>
        <Route
          path="/board/:id"
          element={
            <RouteWrapper>
              <AppLayout>
                <BoardPage></BoardPage>
              </AppLayout>
            </RouteWrapper>
          }
        ></Route>

        <Route path="/*" element={<LogInPage />}></Route>
      </Routes>
    </Router>
  );
};

export default RoutesDecl;
