import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider, Button } from "@material-ui/core";
import { timestampToDate } from "../../Utils/date";
import { formatISO } from "date-fns";

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
const UserTimeCard = ({ item, onDelete }) => {
  const classes = useStyles();
  const handleDelete = () => onDelete(item.status.date);
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} color="red">
        <Typography variant="h5">{item.status.time.startTime} -</Typography>
        <Typography variant="h6"> {item.status.time.endTime}</Typography>
      </CardMedia>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <div className={classes.details}>
        <CardContent>
          {/* The time is booked */}
          {item.status === Object(item.status) && (
            <>
              {/* Is viewing self booked or not */}
              <div>
                {item.status.date && (
                  <Typography>
                    Datum :{" "}
                    {formatISO(timestampToDate(item.status.date), {
                      representation: "date",
                    })}
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleDelete}
                  size="large"
                >
                  Avboka
                </Button>
              </div>
            </>
          )}
          {/* No Booked time on the slot */}
        </CardContent>
      </div>
    </Card>
  );
};
export default UserTimeCard;
