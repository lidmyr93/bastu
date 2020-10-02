import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider, Button } from "@material-ui/core";
import { RULES } from "../../constants/rules";

const BookingCard = ({
  item,
  authUser,
  onDelete,
  handleClick,
  index,
  bookingPerDayLimit,
  bookingPerWeeksLimit,
}) => {
  const handleDelete = () => onDelete(item.status.date);
  
  return (
    <>
      {bookedTimeSelf(item, authUser, handleDelete)}
      {bookedTime(item, authUser, handleClick)}
      {userCanBook(item, bookingPerWeeksLimit, bookingPerDayLimit)}
      {reachedMaxBookingDuringTimePeroid(
        item,
        bookingPerDayLimit,
        bookingPerWeeksLimit,
        index
      )}
      {timeAlreadyBookedSameDay(item, bookingPerDayLimit)}
      {NonBookableTime(item)}
    </>
  );
};
export default BookingCard;

function bookedTimeSelf(item, authUser, handleDelete) {
  if (
    item.status === Object(item.status) &&
    item.status.user.uid === authUser.uid
  ) {
    return (
      <div>
        <Typography>Din tid</Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDelete}
          size="large"
        >
          Avboka
        </Button>
      </div>
    );
  }
  return null;
}

function bookedTime(item, authUser) {
  if (
    item.status === Object(item.status) &&
    item.status.user.uid !== authUser.uid
  ) {
    return (
      <Typography>
        Bokad av: {item.status.user.username}
        {/* <span>{item.type}</span> */}
      </Typography>
    );
  }
  return null;
}

function userCanBook(
  item,
  bookingPerWeeksLimit,
  bookingPerDayLimit,
  handleClick,
  index
) {
  if (
    item.status !== Object(item.status) &&
    item.type === "private" &&
    bookingPerWeeksLimit < RULES.maxBookingAmount &&
    !bookingPerDayLimit
  ) {
    const userCanBookStyles = makeStyles((theme, props) => ({
      root: {
        display: "flex",
        margin: "1rem 0",
        height: 150,
        border: "1px solid green",
        width: "100%",
      },
      timeCardRoot: {
        width: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      timeCard: {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        height: "70%",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      },
      details: {
        width: "60%",
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      },  
      button: {color: "green"},
      divider: {height: 140, marginTop: "5px"}
    }));
    const classes = userCanBookStyles();
    return (
      <Card className={classes.root}>
        <div className={classes.timeCardRoot}>
          <CardMedia className={classes.timeCard} color="red">
            <Typography variant="h5">{item.startTime} -</Typography>
            <Typography variant="h6"> {item.endTime}</Typography>
          </CardMedia>
        </div>
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h5" style={{textAlign: "center"}}>Ledig tid</Typography>
            <Button
              variant="outlined"
              className={classes.button}
              value={index}
              onClick={(e) => handleClick(e)}
              size="large"
            >
              Boka nu
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  }
  return null;
}
function reachedMaxBookingDuringTimePeroid(
  item,
  bookingPerDayLimit,
  bookingPerWeeksLimit
) {
  if (
    item.status !== Object(item.status) &&
    item.type === "private" &&
    bookingPerWeeksLimit >= RULES.maxBookingAmount &&
    !bookingPerDayLimit
  ) {
    return (
      <Typography>
        Max bokningar under tidsintervall: {RULES.timePeroidWeeks} veckor
      </Typography>
    );
  }
  return null;
}
function timeAlreadyBookedSameDay(item, bookingPerDayLimit) {
  if (
    item.status !== Object(item.status) &&
    item.type === "private" &&
    bookingPerDayLimit
  ) {
    return (
      <Typography>
        Tid redan bokad för datumet, avboka tiden för att boka om
      </Typography>
    );
  }
  return null;
}

function NonBookableTime(item) {
  if (item.status !== Object(item.status) && item.type === "general") {
    return <Typography>Gemensam bastu</Typography>;
  }
  return null;
}
