import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import HomePage from "../Home";
import SignInPage from "../SignIn";
import Bookings from "../Bookings";
import MyBookings from "../MyBookings";
import SignUpPage from "../SignUp";

import { withAuthentication } from "../Session";
import PasswordForgetPage from "../PasswordForget";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { Container } from "@material-ui/core";
const App = (props) => {
  return (
    <div>
      <Router>
        

          <Navigation />
          <Container maxWidth="sm">

          <hr />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

          <Route path={ROUTES.BOOKINGS} component={Bookings} />
          <Route path={ROUTES.MY_BOOKINGS} component={MyBookings} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          </Container>
        
      </Router>
    </div>
  );
};

export default withAuthentication(App);
