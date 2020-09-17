import React, { useState } from "react";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { formatISO } from "date-fns";

const TimeBookingBase = ({ syncedDate, setDate }) => {
  const [open, setOpen] = useState(false);
  const onDateChange = (date) =>
    setDate(formatISO(new Date(date), { representation: "date" }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
        margin: "0 auto",
      }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          orientation="portrait"
          variant="dialog"
          openTo="date"
          inputVariant="standard"
          value={syncedDate}
          onChange={onDateChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

const TimeBooking = compose(withRouter, withFirebase)(TimeBookingBase);
export default TimeBooking;
