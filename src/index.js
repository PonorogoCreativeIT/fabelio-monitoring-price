const http = require('http');
const express = require('./config/express');
const logger = require('./config/logger');

require('dotenv-safe').config();

const { PORT, NODE_ENV } = process.env;
const server = http.createServer(express);

server.listen(PORT, () => logger.info(`server started on port ${PORT} (${NODE_ENV})`));
