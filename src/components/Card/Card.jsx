import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MY_BOOKINGS } from "../../constants/routes";
import { timeStampToFormattedDate } from "../../Utils/date";
import UpdateTime from "../UpdateTime/Switch";
const CardStyles = makeStyles((theme) => ({
  root: ({ color, order, activeTime }) => ({
    display: "flex",
    margin: "0.25rem auto",
    height: activeTime ? 150 : 50,
    border: activeTime ? `1px solid ${color}` : "none",
    width: "100%",
    order: order,
  }),
  timeCardRoot: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeCard: ({ activeTime }) => ({
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    height: "70%",
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: activeTime ? "column" : "initial",
  }),
  details: ({ activeTime }) => ({
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: activeTime ? "space-around" : "",
    alignItems: "center",
  }),
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
  showDate = false,
  activeTime = true,
  header = "",
  subHeader = false,
  buttonText = "",
  headerVariant = "h6",
  subHeaderVariant = "h6",
  wantCompany,
  viewingSelf,
  color,
  buttonColor,
  order = 2,
}) => {
  const classes = CardStyles({ color, buttonColor, order, activeTime });

  return (
    <Card className={classes.root}>
      <div className={classes.timeCardRoot}>
        <CardMedia className={classes.timeCard} color="red">
          <Typography variant={activeTime ? "h5" : "p"}>
            {startTime} -
          </Typography>
          <Typography variant={activeTime ? "h6" : "p"}> {endTime}</Typography>
        </CardMedia>
      </div>
      <Divider orientation="vertical" flexItem className={classes.divider} />

      <CardContent className={classes.details}>
        {activeTime ? (
          <Grid
            component="div"
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            width="100%"
          >
            <div>
              <div>
                <Typography variant={headerVariant}>{header}</Typography>
                {subHeader && (
                  <Typography variant={subHeaderVariant}>
                    {subHeader}
                  </Typography>
                )}
                {wantCompany && !viewingSelf && (
                  <Typography variant={subHeaderVariant}>
                    Öppen för sällskap
                  </Typography>
                )}
                {showDate && (
                  <Typography>{timeStampToFormattedDate(index)}</Typography>
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
            </div>
            {viewingSelf && (
              <UpdateTime checked={wantCompany || false} timeToUpdate={index} />
            )}
          </Grid>
        ) : (
          <div>
            {showDate && (
              <Typography>{timeStampToFormattedDate(index)}</Typography>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
