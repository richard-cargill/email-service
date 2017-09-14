require('dotenv').config();

const {send, json, createError} = require('micro');
const mailgun = require('mailgun-js')({
  apiKey: process.env.APIKEY,
  domain: process.env.DOMAIN
});

const endpoint = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      throw createError(405, 'Method Not Allowed.');
    }

    const body = await json(req);
    const result = await mailgun.messages().send(body);

    send(res, 200, {
      code: 200,
      status: 'success',
      message: result.message,
      data: result
    });
  } catch (err) {
    send(res, err.statusCode, {
      code: err.statusCode,
      status: 'error',
      message: err.message
    });
  }
};

module.exports = endpoint;
