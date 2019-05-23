import mongoose from 'mongoose';
import 'dotenv/config';
import { getDirFiles, logger } from '../helpers';

const { DATABASE_URL, DATABASE_URL_TEST, NODE_ENV } = process.env;
const URL = NODE_ENV === 'test' ? DATABASE_URL_TEST : DATABASE_URL;

const connectDb = () => {
  try {
    return mongoose.connect(URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  } catch (err) {
    logger.error(err.message);
  }
};

const db = {
  connectDb,
  ...getDirFiles(__dirname, __filename),
};

module.exports = db;
