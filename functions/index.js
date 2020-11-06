const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const dateFNS = require("date-fns");

admin.initializeApp();
exports.helloWorld = functions.https.onRequest((request, response) => {
  try {
    cors(request, response, () => {
      response.status(200).send({ data: { message: "Hello World" } });
    });
  } catch (error) {
    response.status(500).send({ data: { message: error } });
  }
});

exports.addAdminRole = functions.https.onRequest((request, response) => {
  try {
    cors(request, response, async () => {
      const { data } = request.body;
      const user = await admin.auth().getUserByEmail(data.email);
      if (!user)
        return response.status(404).send({
          data: { message: `User not found with email: ${data.email}` },
        });
      return admin
        .auth()
        .setCustomUserClaims(user.uid, { admin: true })
        .then(() => {
          return response.status(200).send({
            data: {
              message: `User with email: ${data.email} has been admin`,
            },
          });
        });
    });
  } catch (error) {
    response.status(500).send({ data: { message: error } });
  }
});

exports.scheduledDeleteOldBookings = functions.pubsub
  .schedule("every 24 hours")
  .timeZone("Europe/Stockholm")
  .onRun(async (context) => {
    //Get the endDate to query the database
    const endDate = dateFNS.subWeeks(new Date(), 2);
    const formatted = dateFNS.formatISO(endDate, { representation: "date" });
    const timestamp = dateFNS.getUnixTime(new Date(formatted));

    //db ref
    const db = admin.database();
    const ref = db.ref("booking/").orderByChild("date").endAt(timestamp);

    await ref
      .once("value")
      .then((snapshot) => snapshot.forEach((booking) => booking.ref.remove()));

    return null;
  });

exports.testScheduledDeleteOldBookings = functions.https.onRequest(
  (request, response) => {
    const endDate = dateFNS.subWeeks(new Date(), 2);
    const formatted = dateFNS.formatISO(endDate, { representation: "date" });
    const timestamp = dateFNS.getUnixTime(new Date(formatted));
    const db = admin.database();
    const ref = db.ref("booking/").orderByChild("date").endAt(timestamp);
    const obj = {};

    ref
      .once("value")
      .then((snapshot) =>
        snapshot.forEach((snap) => (obj[snap.key] = snap.val()))
      )
      .then(() => response.status(200).send({ data: obj }))
      .catch((error) =>
        response.status(500).send({ data: { message: error } })
      );
  }
);

exports.addBookingsForTesting = functions.https.onRequest(
  (request, response) => {
    const db = admin.database();
    const ref = db.ref("booking/");

    //Create multiple bookings with varius endates before enddate
    for (let i = 0; i < 10; i++) {
      const endDate = dateFNS.subWeeks(new Date(), i + 2);
      const formatted = dateFNS.formatISO(endDate, { representation: "date" });
      const timestamp = dateFNS.getUnixTime(new Date(formatted));
      ref.push({
        date: timestamp,
        time: {
          endTime: "09.00",
          startTime: "08.00",
          type: "private",
        },
        user: {
          email: "test@gmail.com",
          houseNumber: "test",
          roles: {},
          uid: 23813021328173,
          username: "test",
        },
        wantCompany: true,
      });
    }
  }
);
