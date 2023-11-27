import React from "react";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import { Route, Router } from "react-router-dom/cjs/react-router-dom.min";

import {
  page as pageRoutes
} from "./indexUser"

import AuthLayout from "../../layouts/Auth";
import Page404 from "../../pages/auth/Page404";
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
        
        {childRoutes(AuthLayout, pageRoutes)}
    
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