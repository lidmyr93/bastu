import React from "react";
import { withFirebase } from "../Firebase";
import Box from "@material-ui/core/Box";
import CustomizedInput from "../Input/Input";
import CustomSnackbar from "../Snackbar/Snackbar";
import { FIREBASE_ERRORS } from "../../constants/firebase-errors";
import { StyledButton } from "../../styles/Button";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class PasswordChangeForm extends React.Component {
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

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
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Nytt password"
        />
        <CustomizedInput
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Bekräfta nytt Password"
        />
        <StyledButton
          disabled={isInvalid}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          fontSize="0.75rem"
        >
          Återställ mitt lösenord
        </StyledButton>

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

export default withFirebase(PasswordChangeForm);
