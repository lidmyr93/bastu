import React, { useState, useEffect } from "react";
import { withAuthorization, AuthUserContext } from "../Session";

import Schedule from "../Schedule";
import TimeBooking from "./TimeBooking";
import { getDate } from "../../Utils/date";
import TimeCard from "../Card/Card";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import syncLocalTimeListToFirebase from "../../Utils/syncLocalTimeListToFirebase";

const BookingsBase = ({ firebase, authUser }) => {
  const [date, setDate] = useState("");
  const [timeList, setTimeList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDate(getDate);
  }, []);
  const getSchedule = () => {
    setLoading(true);
    if (date) {
      firebase.times(date).on("value", (snapshot) => {
        const timesObject = snapshot.val();
        if (!timesObject) return setTimeList(null);
        const timesList = Object.keys(timesObject).map((key) => ({
          ...timesObject[key],
          bookedBy: key,
        }));
        const timeListToRender = syncLocalTimeListToFirebase(timesList)
        setTimeList(timeListToRender);
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    getSchedule();
  }, [date]);
  return (
    <div>
      <TimeBooking authUser={authUser} syncedDate={date} setDate={setDate} />

      {timeList && <Schedule
        syncedDate={date}
        timeList={timeList}
        loading={loading}
      />}
      {/* <TimeCard date={date}/> */}
    </div>
  );
};

const condition = (authUser) => !!authUser;

const Booking = compose(withFirebase)(BookingsBase);
const test = () => (
  <AuthUserContext.Consumer>
    {(authUser) => <Booking authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default withAuthorization(condition)(test);
