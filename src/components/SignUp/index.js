import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import CustomizedInput from "../Input/Input";
import { Button } from "@material-ui/core";
import { FlexForm , FlexContainer} from "../../styles/flex-container";

const SignUpPage = () => (
  <FlexContainer direction="column">
    <h1>SignUp</h1>

    <SignUpForm />
  </FlexContainer>
);
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  isAdmin: false,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email, roles });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCheckBox = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      isAdmin,
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <FlexForm onSubmit={this.onSubmit}>
        {" "}
        
        <CustomizedInput
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <CustomizedInput
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <CustomizedInput
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <CustomizedInput
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        {/* <label>
          Admin:
          <CustomizedInput
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckBox}
          />
        </label> */}
        <Button disabled={isInvalid} type="submit" color="primary" variant="contained" fullWidth>
          Sign Up
        </Button>
        {error && <p>{error.message}</p>}
        
      </FlexForm>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default SignUpPage;

export { SignUpForm, SignUpLink };
