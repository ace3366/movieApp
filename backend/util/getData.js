const fs = require("fs");
module.exports = (dataPath, cb) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};
