import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  landing as landingRoutes,
  dashboard as dashboardRoutes,
  page as pageRoutes,

} from "../../routes/index";

import DashboardLayout from "../../layouts/Dashboard";
import LandingLayout from "../../layouts/Landing";
import AuthLayout from "../../layouts/Auth";
import Page404 from "../../pages/auth/Page404";

//user
import LayoutUser from "../layout/LayoutUser";
import { UserHome } from "./indexUser";

import ScrollToTop from "../../components/ScrollToTop";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const RoutesUser = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {/*{childRoutes(LandingLayout, landingRoutes)}
        {childRoutes(DashboardLayout, dashboardRoutes)} */}
        {childRoutes(AuthLayout, pageRoutes)}
        {childRoutes(LayoutUser, UserHome)}
        
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default RoutesUser;
