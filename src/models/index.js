import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import 'dotenv/config';

const basename = path.basename(__filename);
const models = {};

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach(file => {
    models[file.slice(0, -3)] = require(path.join(__dirname, file));
  });

export const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

export default models;
