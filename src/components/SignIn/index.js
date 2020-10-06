import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { PasswordForgetLink } from "../PasswordForget";
import CustomizedInput from "../Input/Input";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { FIREBASE_ERRORS } from "../../constants/firebase-errors";
import CustomSnackbar from "../Snackbar/Snackbar";

const SignInPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-evenly"
    height="100%"
  >
    <SignInForm />
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <PasswordForgetLink />
      <SignUpLink />
    </Box>
  </Box>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((currentUser) => {
        this.props.firebase
          .user(currentUser.user.uid)
          .once("value")
          .then((snapshot) =>
            localStorage.setItem("currentUser", JSON.stringify(snapshot.val()))
          );
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          error: { ...error, translatedMessage: FIREBASE_ERRORS[error.code] },
        });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Box
        component="form"
        onSubmit={this.onSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="75%"
      >
        <CustomizedInput
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <CustomizedInput
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Button
          disabled={isInvalid}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          Sign In
        </Button>
        {error && (
          <CustomSnackbar
            message={error.translatedMessage || error.message}
            severity="error"
          />
        )}
      </Box>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;
