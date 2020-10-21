import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    this.app = app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.functions = app.functions();
  }
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(async (snapshot) => {
            const dbUser = snapshot.val();

            const isAdmin = await this.isAdmin();
            if (isAdmin) {
              dbUser.roles = { ADMIN: "ADMIN" };
            } else {
              dbUser.roles = { USER: "USER" };
            }
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  isAdmin = async () => {
    //TOD: make this return false if not admin
    const claimsObject = await this.auth.currentUser.getIdTokenResult();

    return claimsObject.claims.admin;
  };

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  bookTime = () => this.db.ref(`booking/`);

  getTimesByDate = (date) =>
    this.db.ref(`booking`).orderByChild(`date`).equalTo(date);

  getUserTimes = (uid) =>
    this.db.ref(`booking/`).orderByChild(`/user/uid`).equalTo(uid);

  checkUserBookingAmount = (startDate, endDate) =>
    this.db
      .ref(`booking/`)
      .orderByChild(`date`)
      .startAt(startDate)
      .endAt(endDate);

  checkHouseAccountAmount = (houseNumber) =>
    this.db.ref("users").orderByChild("houseNumber").equalTo(houseNumber);
}
export default Firebase;
