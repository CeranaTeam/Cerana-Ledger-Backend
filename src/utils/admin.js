var admin = require("firebase-admin");


var serviceAccount = require(process.env.FIREBASE_ADMIN_SDK_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// let uid = "mw89YoGzdFdImIVj2ewpHbPPE5k2";
// // get custom token
// admin
//   .auth()
//   .createCustomToken(uid)
//   .then(function (customToken) {
//     // Send token back to client
//     console.log(customToken);
//   })
//   .catch(function (error) {
//     console.log("Error creating custom token:", error);
//   });

module.exports = { admin };
