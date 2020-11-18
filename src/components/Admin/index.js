import React, { Component } from "react";

import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { Box } from "@material-ui/core";
import { timeStampToFormattedDate } from "../../Utils/date";
import { formatISO, getUnixTime, subWeeks } from "date-fns";
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );
};
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      email: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on("value", (snapshot) => {
      const userObject = snapshot.val();
      const userList = Object.keys(userObject).map((key) => ({
        ...userObject[key],
        uid: key,
      }));
      this.setState({
        users: userList,
        loading: false,
      });
    });
  }
  componentWillMount() {
    this.props.firebase.users().off();
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const addAdminRole = this.props.firebase.functions.httpsCallable(
      "addAdminRole"
    );
    addAdminRole({ email: this.state.email }).then((result) => {
      //TODO: Add snackbar with verification
      console.log(result);
    });

    /* const test = this.props.firebase.functions.httpsCallable(
      "addBookingsForTesting"
    ); */
    /* const test = this.props.firebase.functions.httpsCallable(
      "testScheduledDeleteOldBookings"
    ); */

    /* test().then((result) => console.log(result)); */
  };
  handleChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  render() {
    const { users, loading } = this.state;
    return (
      <div>
        {loading && <div>Loading...</div>}
        <UserList users={users} />
        <Box component="form" onSubmit={this.handleSubmit}>
          <label>Lägg till admin rättigheter</label>
          <input type="email" onChange={this.handleChange} />
          <input type="submit" />
        </Box>
      </div>
    );
  }
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition), withFirebase)(AdminPage);
