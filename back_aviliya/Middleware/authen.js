const jwt = require("jsonwebtoken");

const authen = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];

    const decode = await jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    res.json({ error: error.message + "  authen failed" });
  }
};
module.exports = authen;
