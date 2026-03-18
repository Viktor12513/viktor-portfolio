import { customAlphabet } from 'nanoid';

const createShortCode = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

export function generateShortCode() {
  return createShortCode();
}
