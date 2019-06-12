const express = require('express');
const getDb = require('../lib/db');
const nanoid = require('nanoid');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'data/songs/');
  },
  filename(req, file, cb) {
    cb(null, req.songId);
  },
});
const upload = multer({ storage });

const router = express.Router();

const db = getDb('songs', { valueEncoding: 'json' });

function generateSongId(req, res, next) {
  req.songId = nanoid();
  next(null);
}

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
  const id = `songs:${req.songId}`;
  const data = {
    meta: req.body.metadata,
    path: req.file.path,
  };
  await db.put(id, data);

  res.send({ id });
}

// Index endpoints
router
  .route('/')
  .get(listSongs)
  .post(generateSongId, upload.single('file'), addSong);

module.exports = router;
