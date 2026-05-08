import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app';

describe('Fastify app', () => {
  it('GET /health returns ok status', async () => {
    const app = buildApp({ logger: false });
    const response = await app.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
    await app.close();
  });

  it('GET / returns app message and version', async () => {
    const app = buildApp({ logger: false });
    const response = await app.inject({
      method: 'GET',
      url: '/'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().message).toBe('CI/CD Lab Fastify app is running');
    await app.close();
  });

  it('GET / returns APP_VERSION when env is provided', async () => {
    process.env.APP_VERSION = '1.2.3';
    const app = buildApp({ logger: false });
    const response = await app.inject({
      method: 'GET',
      url: '/'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      message: 'CI/CD Lab Fastify app is running',
      version: '9.9.9'
    });

    await app.close();
    delete process.env.APP_VERSION;
  });
});
