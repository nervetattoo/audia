const path = require('path');

module.exports = {
  UPLOAD_ROOT: process.env.UPLOAD_ROOT || path.join(__dirname, 'data'),
  STATIC_ROOT: process.env.STATIC_ROOT || '/files',
};
