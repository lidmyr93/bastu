import React, { useState, useEffect } from "react";
import { withAuthorization, AuthUserContext } from "../Session";

import Schedule from "../Schedule";
import TimeBooking from "./TimeBooking";
import { getDate } from "../../Utils/date";
import TimeCard from "../Card/Card";
const Bookings = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(getDate);
  }, []);
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <TimeBooking
            authUser={authUser}
            syncedDate={date}
            setDate={setDate}
          />

          <Schedule syncedDate={date} />
          <TimeCard date={date}/>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Bookings);
