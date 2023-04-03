const request = require('supertest');
const server = require('../server');

describe('Server Test', () => {
  let app;

  beforeAll(async () => {
    app = await server;
  });

  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toEqual(404);
  });

  describe('GET ALL /instructors', () => {
    it('Should be connected to DB', async () => {
      const res = await request(app).get('/instructors');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array); // assert that the response is an array
      expect(res.body.length).toBeGreaterThan(0); // assert that the array has at least one element
    });
  });
});
