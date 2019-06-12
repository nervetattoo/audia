const level = require('level');

module.exports = function(dbName, options) {
  return level(dbName, options);
};
