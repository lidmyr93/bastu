import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { FlexContainer, FlexForm } from "../../styles/flex-container";
import { Button } from "@material-ui/core";
import CustomizedInput from "../Input/Input";

const PasswordForgetPage = () => (
  <FlexContainer direction="column">
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </FlexContainer>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
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
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <FlexForm onSubmit={this.onSubmit}>
        <CustomizedInput
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button
          disabled={isInvalid}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </FlexForm>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
