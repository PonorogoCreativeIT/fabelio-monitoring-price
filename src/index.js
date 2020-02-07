const http = require('http');
const app = require('./config/app');
const logger = require('./config/logger');

require('dotenv-safe').config();

const { PORT, NODE_ENV } = process.env;
const server = http.createServer(app);

server.listen(PORT, () => logger.info(`server started on port ${PORT} (${NODE_ENV})`));
