import React, { useState } from "react";
import { debounce, Grid, SvgIcon, Switch } from "@material-ui/core";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withAuthentication } from "../Session";
import { ToggleButtonGroup } from "@material-ui/lab";
import { PersonAdd, PersonAddDisabled } from "@material-ui/icons";

const UpdateTimeBase = ({ firebase, authUser, timeToUpdate, checked }) => {
  //TODO: Debounce!!
  const [disabled, setDisabled] = useState(false);
  const handleChange = (e) => {
    setDisabled(true);
    handleUpdateFrequency();
    upDateWantCompany(timeToUpdate, authUser);
  };

  const handleUpdateFrequency = debounce(() => {
    setDisabled(false);
  }, 1000);

  const upDateWantCompany = (time, authUser) => {
    setDisabled(true);

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
        <Grid item>
          <SvgIcon color="red">
            <PersonAddDisabled htmlColor={checked ? "gray" : "red"} />
          </SvgIcon>
        </Grid>
        <Grid item style={{ transform: "rotate(90deg)" }}>
          <Switch
            checked={checked}
            onChange={handleChange}
            color="primary"
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <PersonAdd htmlColor={checked ? "green" : "gray"} />
        </Grid>
      </Grid>
    </ToggleButtonGroup>
  );
};
const UpdateTime = compose(withFirebase, withAuthentication)(UpdateTimeBase);
export default UpdateTime;
