import React, { Component } from "react";

import { withFirebase } from "../Firebase";
const UserList = ({ users }) => {
  console.log(users);
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

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

export default withFirebase(AdminPage);
