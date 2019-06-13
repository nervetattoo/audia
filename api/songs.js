const express = require('express');
const multer = require('multer');
const compose = require('lodash/fp/compose');
const partialRight = require('lodash/fp/partialRight');

const songs = require('../lib/songs');
const modifyRequest = require('../lib/modify-request');
const { encodeNdjson } = require('../lib/util');

// Formatting the song to add link to playable media
// TODO Pull some of this out of the route config
function formatSong(data, { STATIC_ROOT }) {
  return {
    id: data.key,
    meta: data.value.meta,
    created: new Date(data.value.created),
    file: `${STATIC_ROOT}/songs/${data.key}`,
  };
}

function listSongs(req, res) {
  const config = { STATIC_ROOT: req.app.get('STATIC_ROOT') };
  songs.list({
    onData: compose(
      res.write.bind(res),
      encodeNdjson,
      partialRight(formatSong, [config]),
    ),
    onEnd: res.end.bind(res),
    limit: req.query.limit,
    startAfter: req.query.startAfter,
  });
}

async function addSong(req, res) {
  const data = {
    meta: req.body,
    created: Date.now(),
    file: {
      name: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mime: req.file.mimetype,
    },
  };
  await songs.add(req.songId, data);

  res.send({ id: req.songId });
}

function createSongsRouter({ UPLOAD_ROOT }) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `${UPLOAD_ROOT}/songs`),
    filename: (req, file, cb) => cb(null, req.songId),
  });
  const upload = multer({ storage });

  const router = express.Router();

  // Index endpoints
  router
    .route('/')
    .get(listSongs)
    .post(
      modifyRequest(req => (req.songId = songs.generateId())),
      upload.single('file'),
      addSong,
    );

  return router;
}

module.exports = createSongsRouter;
