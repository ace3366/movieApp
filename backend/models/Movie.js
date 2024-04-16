const fs = require("fs");
const path = require("path");
const rootDir = require("../rootDir");
const getMovieFromDB = require("../util/getData");
const pagingList = require("../util/paging");
const moviePath = path.join(rootDir, "data", "movieList.json");

module.exports = class Movie {
  // Lấy list movie
  static getMovie(cb) {
    getMovieFromDB(moviePath, cb);
  }

  // Lấy list popularity
  static getTrendingMovie(cb) {
    getMovieFromDB(moviePath, (movies) => {
      // Sort theo popularity từ cao đến thấp
      movies.sort((a, b) => b["property"] - a["property"]);
      // Trả dữ liệu ra Controller để response
      cb(pagingList(movies, 20));
    });
  }

  // Lấy list vote_average
  static getRatingMovie(cb) {
    getMovieFromDB(moviePath, (movies) => {
      // Sort theo rating từ cao đến thấp
      movies.sort((a, b) => b["vote_average"] - a["vote_average"]);
      // Trả dữ liệu ra Controller để response
      cb(pagingList(movies, 20));
    });
  }

  // Lấy list theo genre
  static getGenreMovie(idGenre, cb) {
    getMovieFromDB(moviePath, (movies) => {
      // Lọc xem movie nào có chứa genre đó không đưa về 1 array
      const filteredList = movies.filter((movie) =>
        movie.genre_ids.includes(idGenre)
      );
      // Trả dữ liệu ra Controller để response
      cb(pagingList(filteredList, 20));
    });
  }

  // Lấy list theo search
  static getSearchMovie(keyword, genre, mediaType, language, year, cb) {
    getMovieFromDB(moviePath, (movies) => {
      // Chuyển đổi cả keyword lẫn property cần tìm sang lower case
      // Lọc những movie thoả 1 trong 2 tiêu chí

      let filteredMovies = movies.filter(
        (movie) =>
          (movie.title ? movie.title : movie.name)
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          movie.overview.toLowerCase().includes(keyword.toLowerCase())
      );

      // Lọc theo tiêu chí phụ
      filteredMovies = filteredMovies.filter(
        (movie) =>
          (genre === "all" || movie.genre_ids.includes(parseInt(genre))) &&
          (mediaType === "all" || movie["media_type"] === mediaType) &&
          (language === "all" || movie["original_language"] === language) &&
          (year === "all" ||
            (movie["release_date"] || movie["first_air_date"]).split("-")[0] ==
              year)
      );

      cb(pagingList(filteredMovies, 21));
    });
  }
};
