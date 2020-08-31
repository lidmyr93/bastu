import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import SignOut from "../SignOut";
import { AuthUserContext } from "../Session";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);
const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Hem</Link>
    </li>

    <li>
      <SignOut />
    </li>
    <li>
      <Link to={ROUTES.BOOKINGS}>Boka tid</Link>
    </li>
    <li>
      <Link to={ROUTES.MY_BOOKINGS}>Mina tider</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Konto</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
  </ul>
);
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Hem</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.PASSWORD_FORGET}>Password forget</Link>
    </li>
  </ul>
);

export default Navigation;