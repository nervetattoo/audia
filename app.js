const express = require('express');
const path = require('path');
const logger = require('morgan');

const songsRouter = require('./routes/songs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/files', express.static(path.join(__dirname, 'data')));

app.use('/songs', songsRouter);

module.exports = app;
