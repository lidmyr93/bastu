import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">Mitt konto</Typography>

        <Typography variant="h6">Återställ lösenord</Typography>
        <PasswordForgetForm />
        <Typography variant="h6">Byt lösenord</Typography>
        <PasswordChangeForm />
      </Box>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(AccountPage);
