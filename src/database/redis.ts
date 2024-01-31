// npx ts-node src/database/redis.ts

import Redis from 'ioredis';
import { logger } from '../utils/logger';
const redis = new Redis(); // Redis 서버에 연결

// 데이터 저장
redis.set('start-key', 'redis start');

// 데이터 검색
redis.get('start-key', (err: any, data: any) => {
  if (err) {
    logger.error(`Redis start error`, {err});
  } else {
    logger.info(`Data from Redis: ${data}`);
  }
});

// Redis 연결 닫기
redis.quit();

