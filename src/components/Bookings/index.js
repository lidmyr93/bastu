import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { withAuthorization, AuthUserContext } from "../Session";
import Schedule from "../Schedule";
import TimeBooking from "./TimeBooking";
import { dateToTimestamp, getDate, getDatePeriod } from "../../Utils/date";
import { withFirebase } from "../Firebase";
import syncLocalTimeListToFirebase from "../../Utils/syncLocalTimeListToFirebase";
import { AVAILABLE_TIMES } from "../../constants/times";

const BookingsBase = ({ firebase, authUser }) => {
  const [date, setDate] = useState("");
  const [timeList, setTimeList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userBookingAmount, setUserBookingAmount] = useState(false);

  const checkUserBookingAmount = async () => {
    const datePeriod = getDatePeriod();

    //TODO: check if you can query this from firebase directly

    firebase
      .checkUserBookingAmount(datePeriod.startDate, datePeriod.endDate)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (!data) return setUserBookingAmount(0);
        const array = Object.keys(data).filter(
          (key) => data[key].user.uid === authUser.uid
        );
        setUserBookingAmount(array.length);
      });

    return null;
  };

  const getSchedule = () => {
    if (date) {
      //Gets users total booking during a 2 week timespan from todays date
      checkUserBookingAmount();
      firebase
        .getTimesByDate(dateToTimestamp(date))
        .on("value", async (snapshot) => {
          const timesObject = snapshot.val();
          if (!timesObject) return setTimeList(AVAILABLE_TIMES);
          const timesList = Object.keys(timesObject).map((key) => ({
            ...timesObject[key],
            bookedBy: timesObject[key].user.uid,
          }));

          const timeListToRender = await syncLocalTimeListToFirebase(timesList);

          setTimeList(timeListToRender);
        });
    }
  };
  useEffect(() => {
    setLoading(true);
    getSchedule();
    setLoading(false);

    return () => firebase.bookTime().off()
  }, [date]);

  useEffect(() => {
    setDate(getDate);
  }, []);

  const onSubmit = (time) => {
    setLoading(true);
    firebase.bookTime().push({
      date: dateToTimestamp(date),
      time: time,
      user: authUser,
    });
    setLoading(false);
  };

  const onDelete = (date) => {
    try {
      firebase.getTimesByDate(date).once("value", (snapshot) => {
        const timeObject = snapshot;
        timeObject.forEach((child) => {
          if (child.val().user.uid === authUser.uid) child.ref.remove();
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <TimeBooking authUser={authUser} syncedDate={date} setDate={setDate} />

      {timeList && (
        <Schedule
          syncedDate={date}
          timeList={timeList}
          loading={loading}
          onSubmit={onSubmit}
          authUser={authUser}
          onDelete={onDelete}
          userBookingAmount={userBookingAmount}
        />
      )}
    </div>
  );
};

const condition = (authUser) => !!authUser;

const Booking = compose(withFirebase)(BookingsBase);
const BookingHOC = () => (
  <AuthUserContext.Consumer>
    {(authUser) => <Booking authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default withAuthorization(condition)(BookingHOC);
