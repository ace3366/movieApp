const User = require("../models/User.js");

module.exports = (req, res, next) => {
  if (!req.query.token) {
    res.status(401).send("Unauthorized");
  } else {
    User.authCheck(req.query.token, (isAuth) => {
      if (isAuth) next();
      else res.status(401).send("Unauthorized");
    });
  }
};
