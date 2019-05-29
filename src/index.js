import http from 'http';
import socket from 'socket.io';
import app from './app';
import logger from './helpers/logger';

const { PORT = 3000 } = process.env;

const server = http.Server(app);

export const io = socket(server, { log: true });

export const listener = server.listen(PORT, () => {
  logger.info(`Listening on port: ${PORT}`);
});
