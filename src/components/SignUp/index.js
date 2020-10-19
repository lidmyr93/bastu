import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import CustomizedInput from "../Input/Input";
import { Button, Typography } from "@material-ui/core";
import { debounce } from "../../Utils/debounce";
import { RULES } from "../../constants/rules";
import { HOUSE_NUMBERS } from "../../constants/house-numbers";
import * as ROLES from "../../constants/roles";
import Box from "@material-ui/core/Box";
import { FIREBASE_ERRORS } from "../../constants/firebase-errors";
import CustomSnackbar from "../Snackbar/Snackbar";

const SignUpPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Typography variant="h4">Skapa konto</Typography>
    <SignUpForm />
  </Box>
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
      : this.setState({ ...this.state, error: null })  
    
      if(houseExists){

       this.props.firebase
        .checkHouseAccountAmount(houseNumber)
        .on("value", (snapshot) => {
          const data = snapshot.val();
          console.log(data)
          if (!data) return this.setState({ ...this.state, accountAmount: 0 });
          const array = Object.keys(data).map((key) => data[key]);

          if(array.length >= RULES.maxAccountsPerHouse){
            return this.setState({...this.state, error: {message: "För många konton per hus"}})
          }

          return this.setState({ ...this.state, accountAmount: array.length });
        });
      }
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
            console.log(error);
            this.setState({
              ...this.state,
              error: {
                ...error,
                translatedMessage: FIREBASE_ERRORS[error.code],
              },
            });
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
      username === "" || this.state.error;
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
          placeholder="Bekräfta Password"
        />
        <Button
          disabled={isInvalid}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          Skapa konto
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

const SignUpLink = () => (
  <p>
    <Button color="primary">
      <Link to={ROUTES.SIGN_UP} style={{ textDecoration: "none" }}>
        Skapa konto
      </Link>
    </Button>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default SignUpPage;

export { SignUpForm, SignUpLink };
