import React from "react";
import { withAuthorization, AuthUserContext } from "../Session";

const MyBookings = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => <div>My Bookings</div>}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(MyBookings);
