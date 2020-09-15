import React, { useState, useEffect } from "react";
import { AVAILABLE_TIMES } from "../../constants/times";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";

//TODO: keep track of what times are booked for that and disable the option to book it
const TimeBookingBase = ({ authUser, firebase, syncedDate, setDate }) => {
  
  const onDateChange = (e) => setDate(e.target.value);
  
  
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
      
      
    </div>
  );
};

const TimeBooking = compose(withRouter, withFirebase)(TimeBookingBase);
export default TimeBooking;
