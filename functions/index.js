const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

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
        return response
          .status(404)
          .send({
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
