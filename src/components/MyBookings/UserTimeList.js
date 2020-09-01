import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";

const UserTimeList = ({ firebase, authUser }) => {
  const [userTimes, setUserTimes] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserTimes = () => {
    firebase.timeToUser(authUser.uid).on("value", (snapshot) => {
      const data = snapshot.val();
      const list = Object.keys(data).map((key) => ({ ...data[key] }));
      setUserTimes(list);
    });
  };
  useEffect(() => {
    getUserTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);
  return (
    <div>
      {/* 
            time.date
            time.time.end/start
          */}
      {!loading &&
        userTimes &&
        userTimes.map((time) => (
          <div key={time.date}>
            <span>Datum: {time.date}</span>
            <span>Starttid : {time.time.startTime}</span>
            <span>Sluttid : {time.time.endTime}</span>
          </div>
        ))}
      {loading && <div>Loading</div>}
    </div>
  );
};

export default withFirebase(UserTimeList);
