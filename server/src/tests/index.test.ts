import request from 'supertest';
import { app, server } from '../index';
import mongoose from 'mongoose';
import sequelize from '../database';

let projectId: number;
beforeAll(async () => {
  const response = await request(app)
    .post('/projects')
    .send({ title: 'Test Project', description: 'Description' });

  projectId = response.body.data.id;
});

describe('GET /', () => {
  it('should return a greeting message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('My Personal Project Management App!');
  });
});

describe('Project Routes', () => {
  it('GET /projects', async () => {
    const response = await request(app).get('/projects');

    expect(response.status).toBe(200);
  });

  it('POST /projects', async () => {
    const response = await request(app)
      .post('/projects')
      .send({ title: 'Test Project', description: 'Description' });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('GET /projects/:id', async () => {
    const response = await request(app).get(`/projects/${projectId}`);

    expect(response.status).toBe(200);
  });

  it('PUT /projects/:id', async () => {
    const response = await request(app)
      .put(`/projects/${projectId}`)
      .send({ title: 'Updated Project', description: 'Updated Description' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('DELETE /projects/:id', async () => {
    const response = await request(app).delete(`/projects/${projectId}`);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('GET /projects/:id/tasks', async () => {
    const response = await request(app).get(`/projects/${projectId}/tasks`);

    expect(response.status).toBe(200);
  });

  it('POST /projects/:id/tasks', async () => {
    const response = await request(app)
      .post(`/projects/${projectId}/tasks`)
      .send({
        title: 'Test Task',
        description: 'Task Description',
        status: 'pending',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await sequelize.close();
  server.close();
});
