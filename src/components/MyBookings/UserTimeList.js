import React, { useEffect, useState } from "react";
import UserTimeCard from "../Card/UserTimeCard";
import { withFirebase } from "../Firebase";

const UserTimeList = ({ firebase, authUser }) => {
  const [userTimes, setUserTimes] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserTimes = () => {
    setLoading(true);
    firebase.getUserTimes(authUser.uid).on("value", (snapshot) => {
      const data = snapshot.val();
      if (!data) return null;
      const list = Object.keys(data).map((key) => ({
        status: {
          ...data[key],
          bookingId: key,
        },
      }));
      setUserTimes(list);
      setLoading(false);
    });
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
  useEffect(() => {
    getUserTimes();

    //TODO: Look into calling query methods for different scenarios in the get functions 
    //instead on the refs , looks weird to call off on the "base listener"
    return () => firebase.bookTime().off()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);
  return (
    <div>
      {!loading &&
        userTimes &&
        userTimes.map((item) => (
          <UserTimeCard item={item} onDelete={onDelete} />
        ))}

      {loading && <div>Loading</div>}
    </div>
  );
};

export default withFirebase(UserTimeList);
