import React from "react";

import { withFirebase } from "../Firebase";
import { Button } from "@material-ui/core";

const SignOutButton = ({ firebase }) => {
  const logout = () => {
    localStorage.removeItem("currentUser");
    firebase.doSignOut();
  };
  return (
    <Button type="button" variant="text" color="secondary" size="medium" onClick={logout}>
      Logga ut
    </Button>
    
  );
};

export default withFirebase(SignOutButton);
