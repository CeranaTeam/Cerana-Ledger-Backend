const axios = require('axios').default;
const admin = require('firebase-admin');

const path = require("path");
//const sdkPath = path.resolve(__dirname, process.env.FIREBASE_ADMIN_SDK_PATH);
const sdkPath = path.resolve(__dirname, "../../secrets/serviceAccountKey.json");
var serviceAccount = require(sdkPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}, 'test');

const FIREBASE_API_KEY = "AIzaSyAUUfQM2CSEAB3vxNqyoY0N7CWtvGG2I7U";

class FirebaseMock {
  async createIdTokenfromCustomToken(uid, email){
    try {
      
      const customToken = await admin.auth().createCustomToken(uid, {email});
      const res = await axios({
        url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${FIREBASE_API_KEY}`,
        method: 'post',
        data: {
          token: customToken,
          returnSecureToken: true
        },
        json: true,
      });
      console.log(res.data.idToken);
      // using res.data.idToken

  
     
      
      return res.data.idToken;
  
    } catch (e) {
      console.log(e.request);
    }
  }
  
}


//createIdTokenfromCustomToken("testIdToken", "test@gmail.com");


module.exports = FirebaseMock;