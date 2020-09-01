import React, { useState, useEffect } from "react";
import { AVAILABLE_TIMES } from "../../constants/times";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";

const TimeBookingBase = ({ authUser, firebase, syncedDate, setDate }) => {
  const [time, setTime] = useState("");

  const handleChange = (e) => {
    setTime(JSON.parse(e.target.value));
  };
  const onDateChange = (e) => setDate(e.target.value);
  useEffect(() => {
    setTime(AVAILABLE_TIMES[0]);
  }, []);
  const onSubmit = () => {
    console.log(`Tid bokad, ${JSON.stringify(time)}, datum : ${syncedDate}`);
    firebase.bookTime(syncedDate, authUser.uid).set({
      date: syncedDate,
      time: time,
      user: authUser,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
        margin: "0 auto",
      }}
    >
      <label htmlFor="time">Boka en tid</label>
      <input
        type="date"
        name="date"
        value={syncedDate}
        onChange={(e) => onDateChange(e)}
      />
      <select onChange={(e) => handleChange(e)}>
        {AVAILABLE_TIMES.map((time) => (
          <option
            value={JSON.stringify(time)}
            key={time.startTime}
            disabled={time.type === "general" || time.status === "booked"}
          >{`${time.startTime}-${time.endTime}`}</option>
        ))}
      </select>
      <button onClick={onSubmit}>Boka tid</button>
    </div>
  );
};

const TimeBooking = compose(withRouter, withFirebase)(TimeBookingBase);
export default TimeBooking;
