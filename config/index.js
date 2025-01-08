require('dotenv/config');

module.exports = {
  PORT: process.env.PORT || 3000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_API_BASE: process.env.OPENAI_API_BASE,
  MODEL_NAME: process.env.MODEL_NAME,
};
