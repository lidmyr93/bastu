import React from "react";

import { FirebaseContext } from "../Firebase";

const Home = () => (
  <FirebaseContext.Consumer>
    {(firebase) => {
      return <div>Home I've acces to Firebase and render something.</div>;
    }}
  </FirebaseContext.Consumer>
);

export default Home;
