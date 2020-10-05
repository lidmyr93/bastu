import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const SkeletonCardStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "0.25rem auto",
    height: 150,
    width: "100%",
  },
  timeCardRoot: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeCard: {
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
  button: {},
  divider: { height: 140, marginTop: "5px" },
}));
const SkeletonCard = ({ count }) => {
  const classes = SkeletonCardStyles();
  const list = Array(count).fill("");

  return list.map((item, index) => (
    <Card className={classes.root} key={index}>
      <div className={classes.timeCardRoot}>
        <Skeleton width={"70%"} height={"90%"}>
          <CardMedia className={classes.timeCard} color="red">
            <Typography variant={"h5"}>
              <Skeleton />
            </Typography>
            <Typography variant={"h6"}>
              <Skeleton />
            </Typography>
          </CardMedia>
        </Skeleton>
      </div>
      <Divider orientation="vertical" flexItem className={classes.divider} />

      <CardContent className={classes.details}>
        <div>
          <Typography variant="h3" style={{ textAlign: "center" }}>
            <Skeleton width={75} />
          </Typography>
        </div>

        <Skeleton>
          <Button variant="outlined" className={classes.button} size="large">
            text
          </Button>
        </Skeleton>
      </CardContent>
    </Card>
  ));
};

export default SkeletonCard;
