import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { sv } from "date-fns/locale";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { formatISO } from "date-fns";
import { getDatePeriod, timestampToDate } from "../../Utils/date";

const TimeBookingBase = ({ syncedDate, setDate }) => {
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
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={sv}>
        <DatePicker
          orientation="portrait"
          variant="dialog"
          openTo="date"
          inputVariant="standard"
          value={syncedDate}
          onChange={onDateChange}
          disablePast={true}
          maxDate={timestampToDate(getDatePeriod().endDate)}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

const TimeBooking = compose(withRouter, withFirebase)(TimeBookingBase);
export default TimeBooking;
