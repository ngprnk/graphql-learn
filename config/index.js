import dotEnv from 'dotenv';

/* load environment variables */
dotEnv.load();

const config = {
  mongoURL: process.env.MONGOURL,
};

export default config;
