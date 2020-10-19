import React from "react";
import Navigation from "../Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignInPage from "../SignIn";
import Bookings from "../Bookings";
import MyBookings from "../MyBookings";
import SignUpPage from "../SignUp";

import { withAuthentication } from "../Session";
import PasswordForgetPage from "../PasswordForget";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { Container } from "@material-ui/core";
import { Grid } from "../../styles/Grid";

const App = (props) => {
  //props.authUser
  //TODO: Investigate rendering diff routes depening on logged in or not
  // rootpage sign in logged out and bookings logged in
  return (
    <div>
      <Router>
        <Grid>
          <Navigation />
          <Container maxWidth="sm" >

            {/* <Route exact path={ROUTES.HOME} component={HomePage} /> */}
            <Route exact path={ROUTES.BOOKINGS} component={Bookings} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />

            <Route path={ROUTES.MY_BOOKINGS} component={MyBookings} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
          </Container>
        </Grid>
      </Router>
    </div>
  );
};

export default withAuthentication(App);

//TODO:
/* Critical, user can reset passwords for others :P */
/* 
Material UI:
Backdrop - loading || Skeleton
Snackbar error messages / success messages
Avatar Icon for menu

*/
