const {curry, compose} = require('rambda');
const cors = require('micro-cors');
const compress = require('micro-compress');
const rateLimit = require('micro-ratelimit');

const middleware = compose(
  cors({
    allowMethods: ['POST'],
    allowHeaders: [],
    origin: '*'
  }),
  compress,
  curry(rateLimit)({window: 1000, limit: 1})
);

module.exports = middleware;

