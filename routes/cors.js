var config = require('../config');
var param = process.argv[2];
var whitelist = [config[param], config[param+'Web'], config[param+'Web2']];
module.exports = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      // callback(null, true)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}