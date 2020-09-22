import React from "react";
import { withAuthorization, AuthUserContext } from "../Session";
import { compose } from "recompose";
import UserTimeList from "./UserTimeList";

const MyBookingsPage = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <UserTimeList authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;
const MyBookings = compose(withAuthorization(condition))(MyBookingsPage);
export default MyBookings;
