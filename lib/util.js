function encodeNdjson(data) {
  return JSON.stringify(data) + '\n';
}

module.exports = { encodeNdjson };
