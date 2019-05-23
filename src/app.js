import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import joiErrors from './middlewares/joiErrors';
import logger from './helpers/logger';
import { connectDb } from './models';
import routes from './routes';

const isProd = process.env.NODE_ENV === 'production';
const app = express();
const swaggerYAMLDocs = YAML.load('./docs/swagger.yml');

connectDb().then(async () => {
  logger.info('Mongodb connected');
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(routes);
app.use(joiErrors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerYAMLDocs));

app.use((req, res) => {
  const status = 404;
  res.status(status).json({
    message: 'Not found',
    status,
  });
});

app.use((err, req, res) => {
  const status = err.status || 500;
  res.status(status).json({
    errors: {
      message: err.message,
      status,
    },
  });
});

export default app;
