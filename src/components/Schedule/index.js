import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Divider, Button, Box } from "@material-ui/core";

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

const ScheduleBase = ({ timeList, loading, onSubmit, authUser, onDelete }) => {
  const handleClick = (e) => {
    if (!isNaN(e.currentTarget.value)) {
      onSubmit(timeList[e.currentTarget.value]);
    }
  };
  const classes = useStyles();
  return (
    <div>
      <p>Max 1 bokning per dag, för att byta tid , boka en ny ledig bastu</p>

      {!loading &&
        timeList &&
        timeList.map((item, i) => (
          <Card className={classes.root}>
            <CardMedia className={classes.cover} color="red">
              <Typography variant="h5">{item.startTime} -</Typography>
              <Typography variant="h6"> {item.endTime}</Typography>
            </CardMedia>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.divider}
            />
            <div className={classes.details}>
              <CardContent>
                {item.status === Object(item.status) && (
                  <>
                    <Typography>
                      Bokad av: {item.status.user.username}
                      {/* <span>{item.type}</span> */}
                    </Typography>
                    {item.status.bookedBy === authUser.uid && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onDelete}
                      >
                        Avboka
                      </Button>
                    )}
                  </>
                )}
                {item.status !== Object(item.status) &&
                  item.type === "private" && (
                    <Button
                      variant="outlined"
                      className={classes.button}
                      value={i}
                      onClick={(e) => handleClick(e)}
                      size="large"
                    >
                      Boka nu
                    </Button>
                  )}
                {item.status !== Object(item.status) &&
                  item.type === "general" && (
                    <Typography>Gemensam bastu</Typography>
                  )}
              </CardContent>
            </div>
          </Card>
        ))}
      {loading && <div>Loading....</div>}
    </div>
  );
};

const Schedule = compose(withFirebase)(ScheduleBase);
export default Schedule;
