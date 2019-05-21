import app from './app';
import logger from './helpers/logger';

const { PORT = 3000 } = process.env;

const server = app.listen(PORT, () => {
  logger.info(`Listening on port: ${PORT}`);
});

export default server;
