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

//TODO:

/* 
Material UI:
Backdrop - loading
Snackbar error messages / success messages
Avatar Icon for menu

Skeleton from Material Lab
But when it comes to other components, you may not want to repeat the width and height. 
In these instances, you can pass children and it will infer its width and height from them.
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />


Firebase

Rework userTimelist to not save more than 1 booking done on same day

*/
