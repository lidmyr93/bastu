import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";
import { FlexContainer } from "../../styles/flex-container";
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <FlexContainer direction="column">
        <h1>Account Page</h1>
        <h3>Reset password</h3>
        <PasswordForgetForm />
        <h3>Byt lösenord</h3>
        <PasswordChangeForm />
      </FlexContainer>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(AccountPage);
