const httpStatus = require('http-status-codes');

const statusCode = {
  0: {
    code: 0,
    message: 'Fetch Product Page Success',
    status: true,
    httpStatus: httpStatus.OK,
  },
  1: {
    code: 1,
    message: 'Invalid Fabilio Product Page',
    status: false,
    httpStatus: httpStatus.BAD_REQUEST,
  },
};

module.exports = statusCode;
