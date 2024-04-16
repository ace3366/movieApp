const fs = require("fs");
const path = require("path");
const rootDir = require("../rootDir");
const getUserFromDB = require("../util/getData");

const userPath = path.join(rootDir, "data", "userToken.json");

module.exports = class User {
  static authCheck(token, cb) {
    getUserFromDB(userPath, (users) => {
      cb(users.find((user) => user.token === token) ? true : false);
    });
  }
};
