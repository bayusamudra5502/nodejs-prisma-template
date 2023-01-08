import supertest from 'supertest';
import app from '@/app';

describe('Test health check path', () => {
  it('should return 200 at GET / request', async () => {
    const result = await supertest(app).get('/');

    expect(result.statusCode).toEqual(200);
  });

  it('should return 200 at GET /health request', async () => {
    const result = await supertest(app).get('/health');

    expect(result.statusCode).toEqual(200);
  });
});
