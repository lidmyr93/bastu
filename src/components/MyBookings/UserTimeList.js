import React, { useEffect, useState } from "react";
import BookingCard from "../Card/Card";
import { withFirebase } from "../Firebase";

const UserTimeList = ({ firebase, authUser }) => {
  const [userTimes, setUserTimes] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserTimes = () => {
    setLoading(true);
    firebase.getUserTimes(authUser.uid).on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("mybookings", data);
      if (!data) return;

      //TODO: refactor this to match new data
      const list = Object.keys(data).map((key) => ({
        date: key,
        startTime: data[key].time.time.startTime,
        endTime: data[key].time.time.endTime,
        status: {
          time: { ...data[key].time.time },
          user: { ...data[key].time.user },
          bookedBy: data[key].time.user.uid,
        },
      }));

      setUserTimes(list);
    });
  };
  const onDelete = (date) => {
    try {
      firebase.bookTime(date, authUser.uid).remove();
      firebase.timeToUser(authUser.uid, date).remove();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserTimes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);
  return (
    <div>
      {!loading &&
        userTimes &&
        userTimes.map((item) => (
          <BookingCard
            item={item}
            authUser={authUser}
            date={item.date}
            onDelete={onDelete}
          />
        ))}

      {loading && <div>Loading</div>}
    </div>
  );
};

export default withFirebase(UserTimeList);
