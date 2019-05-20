import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import joiErrors from './middlewares/joiErrors';
import { connectDb } from './models';
import logger from './helpers/logger';

const isProd = process.env.NODE_ENV === 'production';
const app = express();

connectDb().then(async () => {
  logger.info('Mongodb connected');
});

app.use(cors());
app.use(morgan(isProd ? 'combined' : 'dev'));

app.use(joiErrors());

export default app;
