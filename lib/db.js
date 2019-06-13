const level = require('level');
const sub = require('subleveldown');

const db = level('leveldb');

module.exports = function(collection, options) {
  return sub(db, collection, options);
};
