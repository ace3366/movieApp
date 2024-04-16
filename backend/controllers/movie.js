const express = require("express");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");

// Lấy list popularity
exports.trendingFetcher = (req, res, next) => {
  Movie.getTrendingMovie((trendingMovies) => {
    // Nếu không có query param (undefined) thì trả về page 1
    // Nếu có query param thì trả về page tương ứng
    res
      .status(200)
      .send(trendingMovies[req.query.page ? req.query.page - 1 : 0]);
  });
};

// Lấy list rating
exports.ratingFetcher = (req, res, next) => {
  Movie.getRatingMovie((ratingMovies) => {
    // Nếu không có query param (undefined) thì trả về page 1
    // Nếu có query param thì trả về page tương ứng
    res.status(200).send(ratingMovies[req.query.page ? req.query.page - 1 : 0]);
  });
};

// Lấy list theo genre
exports.genreFetcher = (req, res, next) => {
  // Nếu không nhập genre param, response lỗi về cho client
  if (!req.query.genre) {
    return res.status(400).send("Not found gerne param");
  }
  Genre.getGenre((genres) => {
    const getGenre = genres.find((genre) => genre.id == req.query.genre);
    // Nếu không tìm được genre param, response lỗi về cho client
    if (!getGenre) {
      return res.status(400).send("Not found that gerne id");
    }
    Movie.getGenreMovie(getGenre.id, (filteredList) => {
      // Nếu không có query param (undefined) thì trả về page 1
      // Nếu có query param thì trả về page tương ứng
      // Gửi giá trị về kèm thêm genre name
      res.status(200).send({
        ...filteredList[req.query.page ? req.query.page - 1 : 0],
        genre_name: getGenre.name,
      });
    });
  });
};

exports.searchFetcher = (req, res, next) => {
  if (req.body.keyword.length === 0) {
    return res.status(400).send("Not found keyword parram");
  } else {
    Movie.getSearchMovie(
      req.body.keyword,
      req.body.genre,
      req.body.mediaType,
      req.body.language,
      req.body.year,
      (movies) => {
        res.status(200).send(movies[req.query.page ? req.query.page - 1 : 0]);
      }
    );
  }
};
