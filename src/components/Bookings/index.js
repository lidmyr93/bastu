import React from "react";
import { withAuthorization, AuthUserContext } from "../Session";
const Bookings = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => <div>Bookings</div>}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Bookings);
