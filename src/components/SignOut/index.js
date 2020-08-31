import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => {
  const logout = () => {
    localStorage.removeItem("currentUser");
    firebase.doSignOut();
  };
  return (
    <button type="button" onClick={logout}>
      Sign Out
    </button>
  );
};

export default withFirebase(SignOutButton);
