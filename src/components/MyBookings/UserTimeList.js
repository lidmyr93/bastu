
import React, { useEffect, useState } from "react";
import {
  getDatePeriod,
  
} from "../../Utils/date";
import BookingCard from "../Card/Card";
import SkeletonCard from "../Card/SkeletonCard";

import { withFirebase } from "../Firebase";

const UserTimeList = ({ firebase, authUser }) => {
  const [userTimes, setUserTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUserTimes = () => {
    setLoading(true);
    firebase.getUserTimes(authUser.uid).on("value", (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setUserTimes(false);
        setLoading(false);
        return;
      }
      const list = Object.keys(data).map((key) => ({
        status: {
          ...data[key],
          bookingId: key,
        },
      }));
      const sortedList = list.sort((a, b) => b.status.date - a.status.date);
      setUserTimes(sortedList);
      setLoading(false);
    });
  };
  const onDelete = (e) => {
    const date = Number(e.currentTarget.value);
    if (isNaN(date)) return;
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
  const checkTimeIsInTimeInterval = (timestamp) => {
    const datePeriod = getDatePeriod();
    return timestamp >= datePeriod.startDate && timestamp <= datePeriod.endDate
      ? true
      : false;
  };

  useEffect(() => {
    getUserTimes();

    //TODO: Look into calling query methods for different scenarios in the get functions
    //instead on the refs , looks weird to call off on the "base listener"
    return () => firebase.bookTime().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);
  return (
    <div>
      {!loading && userTimes ? (
        userTimes.map((item) => (
          <BookingCard
            startTime={item.status.time.startTime}
            endTime={item.status.time.endTime}
            index={item.status.date}
            onClick={onDelete}
            header="Din tid"
            buttonText="Avboka"
            color="blue"
            buttonColor="red"
            order="1"
            showDate
            activeTime={checkTimeIsInTimeInterval(item.status.date)}
          />
        ))
      ) : (
        <SkeletonCard count={2} />
      )}
    </div>
  );
};

export default withFirebase(UserTimeList);
