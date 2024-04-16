const fs = require("fs");
const path = require("path");
const rootDir = require("../rootDir");
const getGenreFromDB = require("../util/getData");

const genrePath = path.join(rootDir, "data", "genreList.json");

module.exports = class Genre {
  static getGenre(cb) {
    getGenreFromDB(genrePath, cb);
  }
};
