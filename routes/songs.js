const express = require('express');
const getDb = require('../lib/db');
const nanoid = require('nanoid');

const router = express.Router();

const db = getDb('songs', { valueEncoding: 'json' });

function encodeNdjson(data) {
  return JSON.stringify(data) + '\n';
}

function listSongs(req, res) {
  db.createReadStream()
    .on('data', data => {
      res.write(encodeNdjson(data));
    })
    .on('end', () => res.end())
    .on('close', () => res.end());
}

async function addSong(req, res) {
  const id = `song:${nanoid()}`;
  await db.put(id, req.body.metadata);

  res.send({ id });
}

// Index endpoints
router
  .route('/')
  .get(listSongs)
  .post(addSong);

module.exports = router;
