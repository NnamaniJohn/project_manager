import request from 'supertest';
import { app, server } from '../index';

describe('GET /', () => {
  it('should return a greeting message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('My Personal Project Management App!');
  });
});

afterAll(() => {
  server.close();
});
