const express = require('express');
const path = require('path');
const logger = require('morgan');
const config = require('./config');

const createSongsRouter = require('./routes/songs');

const app = express();

app.set('STATIC_ROOT', config.STATIC_ROOT);
app.set('UPLOAD_ROOT', config.UPLOAD_ROOT);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(config.STATIC_ROOT, express.static(config.UPLOAD_ROOT));

app.use('/songs', createSongsRouter(config));

module.exports = app;
