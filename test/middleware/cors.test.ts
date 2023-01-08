import app from '@/app';
import supertest from 'supertest';

const allowedOrigins = ['http://localhost:3000'];
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

const disallowedOrigins = ['https://example.com'];
const disallowedMethods = ['PATCH'];

describe('Allowed Preflight Test', () => {
  allowedOrigins.forEach((domain) => {
    it(`Preflight to '${domain}' should be allowed`, async () => {
      const result = await supertest(app).options('/health').set({
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers':
          'accept, origin, authorization, content-type, referer',
        Origin: domain,
      });

      expect(result.status).toBe(204);
      expect(result.headers['access-control-allow-origin']).toBe(domain);
      expect(result.headers['access-control-allow-methods']).toMatch(
        new RegExp(`^.*GET.*$`)
      );
    });

    allowedMethods.forEach((method) => {
      it(`Preflight with method ${method} should be allowed`, async () => {
        const result = await supertest(app).options('/').set({
          'Access-Control-Request-Method': method,
          'Access-Control-Request-Headers':
            'accept, origin, authorization, content-type, referer',
        });

        expect(result.status).toBe(204);
        expect(result.headers['access-control-allow-methods']).toMatch(
          new RegExp(`^.*${method}.*$`)
        );
      });
    });
  });

  it('Preflight should give OK with not found path', async () => {
    const result = await supertest(app).options('/').set({
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers':
        'accept, origin, authorization, content-type, referer',
      Origin: allowedOrigins[0],
    });

    expect(result.status).toBe(204);
    expect(result.headers['access-control-allow-origin']).toBe(
      allowedOrigins[0]
    );
    expect(result.headers['access-control-allow-methods']).toMatch(
      new RegExp(`^.*GET.*$`)
    );
  });

  it('Preflight should give OK with slashed path', async () => {
    const result = await supertest(app).options('/health/').set({
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers':
        'accept, origin, authorization, content-type, referer',
      Origin: allowedOrigins[0],
    });

    expect(result.status).toBe(204);
    expect(result.headers['access-control-allow-origin']).toBe(
      allowedOrigins[0]
    );
    expect(result.headers['access-control-allow-methods']).toMatch(
      new RegExp(`^.*GET.*$`)
    );
  });
});

describe('Unallowed Preflight Test', () => {
  disallowedOrigins.forEach((domain) => {
    it(`Preflight to '${domain}' should be allowed`, async () => {
      const result = await supertest(app).options('/').set({
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers':
          'accept, origin, authorization, content-type, referer',
        Origin: domain,
      });

      expect(result.status).toBe(204);
      expect(result.headers['access-control-allow-origin']).not.toBe(domain);
    });

    disallowedMethods.forEach((method) => {
      it(`Preflight with method ${method} should be allowed`, async () => {
        const result = await supertest(app).options('/').set({
          'Access-Control-Request-Method': method,
          'Access-Control-Request-Headers':
            'accept, origin, authorization, content-type, referer',
        });

        expect(result.status).toBe(204);
        expect(result.headers['access-control-allow-methods']).not.toMatch(
          new RegExp(`^.*${method}.*$`)
        );
      });
    });
  });
});

describe('Additional Positive Cors Test', () => {
  allowedOrigins.forEach((domain) => {
    it(`Request from '${domain}' should be responded with CORS header`, async () => {
      const result = await supertest(app).get('/').set({
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers':
          'accept, origin, authorization, content-type, referer',
        Origin: domain,
      });

      expect(result.status).toBe(200);
      expect(result.headers['access-control-allow-origin']).toBe(domain);
    });
  });
});

describe('Additional Negative Cors Test', () => {
  disallowedOrigins.forEach((domain) => {
    it(`Request from '${domain}' should be responded with CORS header`, async () => {
      const result = await supertest(app).get('/').set({
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers':
          'accept, origin, authorization, content-type, referer',
        Origin: domain,
      });

      expect(result.status).toBe(200);
      expect(result.headers['access-control-allow-origin']).toBeUndefined();
    });
  });
});
