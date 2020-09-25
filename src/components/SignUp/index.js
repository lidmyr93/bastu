import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import CustomizedInput from "../Input/Input";
import { Button } from "@material-ui/core";
import { FlexForm, FlexContainer } from "../../styles/flex-container";
import { debounce } from "../../Utils/debounce";
import { RULES } from "../../constants/rules";
import { HOUSE_NUMBERS } from "../../constants/house-numbers";
import * as ROLES from "../../constants/roles";

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
  houseNumber: "",
  accountAmount: 0,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  checkHouseAccountAmount = debounce((houseNumber) => {
    //check if house exists
    const houseExists = HOUSE_NUMBERS.find(
      (element) => element === Number(houseNumber)
    );
    !houseExists
      ? this.setState({ ...this.state, error: { message: "Hus finns inte" } })
      : this.setState({ ...this.state, error: null });

    this.props.firebase
      .checkHouseAccountAmount(houseNumber)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (!data) return this.setState({ ...this.state, accountAmount: 0 });
        const array = Object.keys(data).map((key) => data[key]);
        return this.setState({ ...this.state, accountAmount: array.length });
      });
    return this.setState({ ...this.state, accountAmount: 0 });
  }, 1000);

  onSubmit = (e) => {
    const {
      username,
      email,
      passwordOne,
      houseNumber,
      accountAmount,
    } = this.state;

    const roles = { USER: ROLES.USER };

    e.preventDefault();
    if (accountAmount < RULES.maxAccountsPerHouse) {
      try {
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then((authUser) => {
            return this.props.firebase
              .user(authUser.user.uid)
              .set({ username, email, houseNumber, roles });
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch((error) => {
            this.setState({ error });
          });
      } catch (error) {
        this.setState({ error });
      }
    } else {
      this.setState({
        error: {
          message: `Max antal(${RULES.maxAccountsPerHouse}) konton uppnåt per bostad`,
        },
      });
    }
  };
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.houseNumber !== this.state.houseNumber) {
      this.checkHouseAccountAmount(this.state.houseNumber);
    }
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      houseNumber,
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
          placeholder="Namn"
        />
        <CustomizedInput
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <CustomizedInput
          name="houseNumber"
          value={houseNumber}
          onChange={this.onChange}
          type="number"
          placeholder="Hus Nummer"
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
        <Button
          disabled={isInvalid}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
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
