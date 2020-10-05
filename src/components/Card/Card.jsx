import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MY_BOOKINGS } from "../../constants/routes";
const CardStyles = makeStyles((theme) => ({
  root: ({ color }) => ({
    display: "flex",
    margin: "1rem 0",
    height: 150,
    border: `1px solid ${color}`,
    width: "100%",
  }),
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
    flexDirection: "column",
  },
  details: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: ({ buttonColor }) => ({
    color: buttonColor,
    border: `1px solid ${buttonColor}`,
  }),
  divider: { height: 140, marginTop: "5px" },
}));

const BookingCard = ({
  startTime,
  endTime,
  index,
  onClick = false,
  navigate,
  header = "",
  subHeader = false,
  buttonText = "",
  headerVariant = "h6",
  subHeaderVariant = "h6",
  color,
  buttonColor,
}) => {
  const classes = CardStyles({ color, buttonColor });

  return (
    <Card className={classes.root}>
      <div className={classes.timeCardRoot}>
        <CardMedia className={classes.timeCard} color="red">
          <Typography variant="h5">{startTime} -</Typography>
          <Typography variant="h6"> {endTime}</Typography>
        </CardMedia>
      </div>
      <Divider orientation="vertical" flexItem className={classes.divider} />

      <CardContent className={classes.details}>
        <div>
          <Typography variant={headerVariant} style={{ textAlign: "center" }}>
            {header}
          </Typography>
          {subHeader && (
            <Typography variant={subHeaderVariant}>{subHeader}</Typography>
          )}
        </div>
        {onClick && (
          <Button
            variant="outlined"
            className={classes.button}
            value={index}
            onClick={(e) => onClick(e)}
            size="large"
          >
            {buttonText}
          </Button>
        )}
        {navigate && (
          <Link to={MY_BOOKINGS} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              className={classes.button}
              size="medium"
              color="primary"
            >
              Mina bokningar
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
