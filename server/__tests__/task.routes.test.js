const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const Task = require('../models/Task');
const indexRouter = require('../routes/index');
const errorHandler = require('../middleware/errorHandler');

let app;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/task_tracker_test');
  app = express();
  app.use(express.json());
  app.use('/api', indexRouter);
  app.use(errorHandler);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await Task.deleteMany({});
});

describe('GET /api/tasks', () => {
  it('returns empty array when no tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all tasks', async () => {
    await Task.create({ title: 'Task 1' });
    await Task.create({ title: 'Task 2' });
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('filters by status', async () => {
    await Task.create({ title: 'Todo task', status: 'todo' });
    await Task.create({ title: 'Done task', status: 'done' });
    const res = await request(app).get('/api/tasks?status=done');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].status).toBe('done');
  });

  it('filters by priority', async () => {
    await Task.create({ title: 'High task', priority: 'high' });
    await Task.create({ title: 'Low task', priority: 'low' });
    const res = await request(app).get('/api/tasks?priority=high');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].priority).toBe('high');
  });

  it('searches by title', async () => {
    await Task.create({ title: 'Buy groceries' });
    await Task.create({ title: 'Read book' });
    const res = await request(app).get('/api/tasks?search=groceries');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Buy groceries');
  });
});

describe('POST /api/tasks', () => {
  it('creates a task with valid data', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'New task', priority: 'high' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New task');
    expect(res.body.priority).toBe('high');
  });

  it('returns 400 without title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ priority: 'high' });
    expect(res.status).toBe(400);
  });
});

describe('PUT /api/tasks/:id', () => {
  it('updates a task', async () => {
    const task = await Task.create({ title: 'Old title' });
    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send({ title: 'New title' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New title');
  });

  it('returns 404 for non-existent task', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/tasks/${fakeId}`)
      .send({ title: 'Updated' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('deletes a task', async () => {
    const task = await Task.create({ title: 'To delete' });
    const res = await request(app).delete(`/api/tasks/${task._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });

  it('returns 404 for non-existent task', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/tasks/${fakeId}`);
    expect(res.status).toBe(404);
  });
});
