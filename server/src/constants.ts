import * as process from 'process';

export const MONGODB_URL =
  process.env.MONGODB_URL ?? 'mongodb://127.0.0.1:27017/contacts-management';
