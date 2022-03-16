const dotenv = require('dotenv');

dotenv.config();

const envData = {
  PORT: process.env.PORT || 9700,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DIALECT: process.env.DIALECT,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE
};

export default envData;
