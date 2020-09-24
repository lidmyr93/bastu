import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider, Button } from "@material-ui/core";
import { RULES } from "../../constants/rules";
import { timestampToDate } from "../../Utils/date";

const useStyles = makeStyles((theme, props) => ({
  root: {
    display: "flex",
    margin: "1rem 0",
    height: 150,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "calc(100% - 101px)",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "green",
  },
  divider: {
    height: "90%",
    alignSelf: "center",
  },
}));
const BookingCard = ({
  item,
  authUser,
  onDelete,
  handleClick,
  index,
  date = null,
  userBookingAmount,
}) => {
  const classes = useStyles();
  const handleDelete = () => onDelete(item.status.date);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} color="red">
        <Typography variant="h5">{item.startTime} -</Typography>
        <Typography variant="h6"> {item.endTime}</Typography>
      </CardMedia>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <div className={classes.details}>
        <CardContent>
          {/* The time is booked */}
          {item.status === Object(item.status) && (
            <>
              {/* Is viewing self booked or not */}
              {item.status.bookedBy === authUser.uid ? (
                <>
                  {date !== null && (
                    <Typography>Datum : {item.date}</Typography>
                  )}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleDelete}
                    size="large"
                  >
                    Avboka
                  </Button>
                  {/* Viewing self in mybookings page */}
                </>
              ) : (
                <Typography>
                  Bokad av: {item.status.user.username}
                  {/* <span>{item.type}</span> */}
                </Typography>
              )}
            </>
          )}
          {/* No Booked time on the slot */}
          {item.status !== Object(item.status) &&
            item.type === "private" &&
            date === null &&
            userBookingAmount < RULES.maxBookingAmount && (
              <Button
                variant="outlined"
                className={classes.button}
                value={index}
                onClick={(e) => handleClick(e)}
                size="large"
              >
                Boka nu
              </Button>
            )}
          {/* Max amount of bookings during time period  */}
          {item.status !== Object(item.status) &&
            item.type === "private" &&
            userBookingAmount >= RULES.maxBookingAmount && (
              <Typography>
                Max boxningar under tidsintervall: {RULES.timePeroidWeeks}{" "}
                veckor nåd
              </Typography>
            )}
          {/* Non-bookable time */}
          {item.status !== Object(item.status) && item.type === "general" && (
            <Typography>Gemensam bastu</Typography>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
export default BookingCard;
