import express from 'express';
import dotenv from 'dotenv';
import { logger } from './utils/logger';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Server!');
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});