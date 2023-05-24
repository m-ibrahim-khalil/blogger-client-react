import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import server from '../src/mocks/server';

expect.extend(matchers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => {
  cleanup();
  server.close();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
