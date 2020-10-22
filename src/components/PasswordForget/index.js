import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import { Button, debounce } from "@material-ui/core";
import CustomizedInput from "../Input/Input";
import Box from "@material-ui/core/Box";
import CustomSnackbar from "../Snackbar/Snackbar";
import { FIREBASE_ERRORS } from "../../constants/firebase-errors";

const PasswordForgetPage = () => (
  <Box display="flex" flexDirection="column">
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </Box>
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
    event.preventDefault();
    const { email } = this.state;
    const { firebase, authUser } = this.props;
    if (email !== authUser.email) {
      this.setState({
        ...this.state,
        error: { translatedMessage: "Felaktig mailadress" },
      });
      this.clearError();
      return;
    }
    firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          error: { ...error, translatedMessage: FIREBASE_ERRORS[error.code] },
        });
      });
  };

  clearError = debounce(() => {
    this.setState(INITIAL_STATE);
  }, 3000);

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

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
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <Button
          disabled={isInvalid}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          Återställ mitt Lösenord
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

const PasswordForgetLink = () => (
  <Button color="primary">
    <Link to={ROUTES.PASSWORD_FORGET} style={{ textDecoration: "none" }}>
      Glömt lösenord?
    </Link>
  </Button>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
