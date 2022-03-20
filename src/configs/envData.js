const dotenv = require('dotenv');

dotenv.config();

const envData = {
  PORT: process.env.PORT || 9700,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE
};

export default envData;
