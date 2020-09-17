import React, { useState, useEffect } from "react";
import { withAuthorization, AuthUserContext } from "../Session";

import Schedule from "../Schedule";
import TimeBooking from "./TimeBooking";
import { getDate } from "../../Utils/date";
import TimeCard from "../Card/Card";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import syncLocalTimeListToFirebase from "../../Utils/syncLocalTimeListToFirebase";
import { AVAILABLE_TIMES } from "../../constants/times";

const BookingsBase = ({ firebase, authUser }) => {
  const [date, setDate] = useState("");
  const [timeList, setTimeList] = useState(null);
  const [loading, setLoading] = useState(false);
  /* const [time, setTime] = useState(""); */

  const onSubmit = (time) => {
    setLoading(true);
    console.log(`Tid bokad, ${JSON.stringify(time)}, datum : ${date}`);
    firebase.bookTime(date, authUser.uid).set({
      date: date,
      time: time,
      user: authUser,
    });
    firebase.timeToUser(authUser.uid).push({
      date: date,
      time: time,
    });
    setLoading(false);
  };
  useEffect(() => {
    /* setDate(getDate); */
    setDate("2020-09-01");
  }, []);
  const getSchedule = () => {
    setLoading(true);
    if (date) {
      firebase.times(date).on("value", async (snapshot) => {
        const timesObject = snapshot.val();
        if (!timesObject) return setTimeList(AVAILABLE_TIMES);
        const timesList = Object.keys(timesObject).map((key) => ({
          ...timesObject[key],
          bookedBy: key,
        }));
        const timeListToRender = await syncLocalTimeListToFirebase(timesList);

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

      {timeList && (
        <Schedule
          syncedDate={date}
          timeList={timeList}
          loading={loading}
          onSubmit={onSubmit}
        />
      )}
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
