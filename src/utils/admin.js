var admin = require("firebase-admin");
const path = require("path");
const sdkPath = path.resolve(__dirname, process.env.FIREBASE_ADMIN_SDK_PATH);
var serviceAccount = require(sdkPath);

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
