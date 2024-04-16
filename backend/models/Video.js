const fs = require("fs");
const path = require("path");
const rootDir = require("../rootDir");
const getVideoFromDB = require("../util/getData");

const videoPath = path.join(rootDir, "data", "videoList.json");

module.exports = class Video {
  static getVideo(id, cb) {
    getVideoFromDB(videoPath, (videosInfo) => {
      // Lọc video list có id trùng với id cần tìm
      // Nếu không có id trùng thì trả về empty array
      const getVideos = videosInfo.find((videoInfo) => videoInfo.id == id);
      if (!getVideos) {
        cb([]);
        return;
      }
      // Sau đó lọc những video đạt tiêu chuẩn official và site = 'Youtube'
      const filteredVideos = getVideos.videos.filter(
        (video) => video.official === true && video.site === "YouTube"
      );
      // Tiếp theo tìm video loại Trailer trước, nếu không có chuyển sang tìm loại Teaser
      let filteredTypes = filteredVideos.filter(
        (video) => video.type === "Trailer"
      );
      if (filteredTypes.length === 0) {
        filteredTypes = filteredVideos.filter(
          (video) => video.type === "Teaser"
        );
      }
      // Nếu vẫn không có type thoả thì trả về empty array
      if (filteredTypes.length === 0) {
        cb(filteredTypes);
        return;
      }

      // Tìm index video có ngày public gần nhất
      const finalResultIndex = filteredTypes.reduce(
        (iMax, video, i, arr) =>
          Date.parse(video.published_at) > Date.parse(arr[iMax].published_at)
            ? i
            : iMax,
        0
      );
      // Return về Controller Info của Video đã được lọc
      cb(filteredTypes[finalResultIndex]);
    });
  }
};
