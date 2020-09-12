import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import { FlexForm } from "../../styles/flex-container";
import CustomizedInput from "../Input/Input";
import { Button } from "@material-ui/core";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <FlexForm onSubmit={this.onSubmit}>
        <CustomizedInput
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <CustomizedInput
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <Button disabled={isInvalid} type="submit" color="primary" variant="contained" fullWidth>
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </FlexForm>
    );
  }
}

export default withFirebase(PasswordChangeForm);
