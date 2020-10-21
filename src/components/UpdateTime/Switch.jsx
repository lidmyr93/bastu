import React from "react";
import { Grid, Switch } from "@material-ui/core";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withAuthentication } from "../Session";
import { ToggleButtonGroup } from "@material-ui/lab";

const UpdateTimeBase = ({ firebase, authUser, timeToUpdate, checked }) => {
  //TODO: Debounce!!
  const handleChange = (e) => {
    upDateWantCompany(timeToUpdate, authUser);
  };
  const upDateWantCompany = (time, authUser) => {
    const date = Number(time);
    if (isNaN(date)) return;
    try {
      firebase.getTimesByDate(date).once("value", (snapshot) => {
        snapshot.forEach((child) => {
          const data = child.val();
          if (data.user.uid === authUser.uid && data.date === date)
            child.ref.update({ ...data, wantCompany: !data.wantCompany });
        });
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ToggleButtonGroup orientation="vertical">
      <Grid
        component="label"
        container
        alignItems="center"
        direction="column"
        spacing={1}
      >
        <Grid item>Nej</Grid>
        <Grid item style={{ transform: "rotate(90deg)" }}>
          <Switch checked={checked} onChange={handleChange} color="primary" />
        </Grid>
        <Grid item>Ja</Grid>
      </Grid>
    </ToggleButtonGroup>
  );
};
const UpdateTime = compose(withFirebase, withAuthentication)(UpdateTimeBase);
export default UpdateTime;
