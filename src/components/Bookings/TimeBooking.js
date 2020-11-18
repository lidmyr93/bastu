import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { sv } from "date-fns/locale";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { formatISO } from "date-fns";
import { getDatePeriod, timestampToDate } from "../../Utils/date";
import { Button, createMuiTheme } from "@material-ui/core";
import { indigo, red } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: indigo["500"],
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#000",
      },
      daySelected: {
        backgroundColor: indigo["500"],
      },
      dayDisabled: {
        color: red["400"],
      },
      current: {
        color: indigo["500"],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        backgroundColor: "#000",
      },
    },
  },
});

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
        position: "relative",
      }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={sv}>
        <ThemeProvider theme={materialTheme}>
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
        </ThemeProvider>
      </MuiPickersUtilsProvider>
      <Button
        variant="outlined"
        size="small"
        style={{ position: "absolute", right: 0, zIndex: "-10" }}
      >
        Välj datum
      </Button>
    </div>
  );
};

const TimeBooking = compose(withRouter, withFirebase)(TimeBookingBase);
export default TimeBooking;
