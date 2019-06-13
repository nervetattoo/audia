# 🎙 Audia

> A simple embeddable music app built on web technology

This is only meant to be an educational project for fun, but if you like anything in it, hey, go use it for something.

## Features

- Upload and categorise songs
- Find and play songs

## Development

Audia is built and tested on Node v12. Older versions might work but that is out of luck.

In order to get started just use npm or yarn to install the dependencies and then run `npm|yarn start` or `npm|yarn dev`. The dev command will give you live reloads via nodemon and debug logging.

## Tech stack & design

Audia consists of an API component and a client UI.

The API uses Express.js for routing and LevelDB with `level` in order to be an embeddable project in for example an Electron app. One of the goals is to keep a simple tech stack that is portable.

LevelDB gives us a portable database that is both fast and lightweight enough, but it comes with some gotchas:

- Listing data can easily be limitted, but providing an offset is harder
- Filtering requires clever key composition or filtering a stream over the values (fast enough up for medium sized datasets)

## Todo

High level action items

- [ ] Schema validation for endpoints with Joi. Specifically the endpoint to add songs
- [ ] Rethink db keys for songs:
  - [ ] Can we generate chronological keys for songs to provide pagination offset more easily?
  - [ ] Should we use compound keys to allow certain filtering capabilities based on key ranges?
- [ ] Consider how static file serving might better be defined as part of the specific api that offers files
- [ ] Shard uploaded files across folders; Perhaps with a compound key representing artist←song?
- [ ] Define a schema for song metadata
- [ ] Read ID3 data from mp3s to populate metadata
- [ ] Enforce a maximum filesize for uploads
- [ ] Integration tests for endpoints
