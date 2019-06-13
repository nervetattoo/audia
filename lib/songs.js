const nanoid = require('nanoid');
const db = require('./db')('songs', { valueEncoding: 'json' });

const generateId = () => nanoid();

function list({ onData, onEnd, limit = 10, startAfter } = {}) {
  const options = { limit: parseInt(limit, 10) };
  if (startAfter) {
    options.gt = startAfter;
  }
  return db
    .createReadStream(options)
    .on('data', onData)
    .on('end', onEnd)
    .on('close', onEnd);
}

async function add(id, data) {
  return db.put(id, data);
}

const assetLink = ({ key }) => `/files/songs/${data.key}`;

module.exports = {
  list,
  add,
  generateId,
  assetLink,
};
