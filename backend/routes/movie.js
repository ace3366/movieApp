const express = require("express");
const movieFetcher = require("../controllers/movie");
const trailerFetcher = require("../controllers/trailer");
const authChecker = require("../controllers/auth");
const router = express.Router();

router.use("/", authChecker);

router.get("/trending", movieFetcher.trendingFetcher);

router.get("/top-rate", movieFetcher.ratingFetcher);

router.get("/discover", movieFetcher.genreFetcher);

router.post("/video", trailerFetcher);

router.post("/search", movieFetcher.searchFetcher);

module.exports = router;
