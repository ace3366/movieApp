const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const movieRouter = require("./routes/movie");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/movies", movieRouter);

app.use((req, res, next) => {
  res.status(404).send(
    JSON.stringify({
      message: "Route not found",
    })
  );
});
app.listen(5000);
