const path = require('path');

const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const i18nextMiddleware = require('i18next-http-middleware');

const i18next = require('./buketbayram/v1/helpers/i18n');
const buketbayramV1Router = require('./buketbayram/v1');

const environment = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.resolve(__dirname, `.env.${environment}`),
  quiet: true
});
dotenv.config({
  path: path.resolve(__dirname, '.env'),
  override: false,
  quiet: true
});

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(helmet());
app.use(i18nextMiddleware.handle(i18next));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS origin is not allowed.'));
    }
  })
);
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: false, limit: '1mb'}));

app.use('/api/buketbayram/v1', buketbayramV1Router);

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: req.t('errors.not_found')
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  console.error(error);
  res.status(500).json({
    status: false,
    message: req.t('errors.server_error')
  });
});

const port = Number(process.env.PORT) || 4000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Buket Bayram API ${port} portunda çalışıyor.`);
  });
}

module.exports = app;
