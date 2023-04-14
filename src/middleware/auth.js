const { admin } = require("../utils/admin");

const auth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization || "";
    const components = authorizationHeader.split(" ");
    if (components.length != 2) {
      return res.status(401).json({ message: "Miss Authorization Header" });
    }
    const token = components[1];
    const decodedClaims = await admin.auth().verifyIdToken(token);
    req.middleware = {
      userId: decodedClaims.uid,
      userEmail: decodedClaims.email,
    };
    return next();
  } catch (error) {
    console.error("\n********** Auth Error **********/\n", error);
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { auth };
