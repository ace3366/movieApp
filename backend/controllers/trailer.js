const Video = require("../models/Video");

module.exports = (req, res, next) => {
  // Nếu không nhập id thì return error 400
  if (req.body.id == "") {
    return res.status(400).send("Not found film_id parram");
  }
  Video.getVideo(req.body.id, (video) => {
    // Nếu là empty array ( tức không có video thoả điều kiện ) thì return error 404
    if (video.length === 0) {
      return res.status(404).send("Not found video");
    } else {
      return res.status(200).send(video);
    }
  });
};
