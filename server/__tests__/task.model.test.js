const mongoose = require('mongoose');
const Task = require('../models/Task');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/task_tracker_test');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await Task.deleteMany({});
});

describe('Task Model', () => {
  it('creates a task with valid fields', async () => {
    const task = await Task.create({ title: 'Test task' });
    expect(task.title).toBe('Test task');
    expect(task.status).toBe('todo');
    expect(task.priority).toBe('med');
  });

  it('fails without a title', async () => {
    await expect(Task.create({})).rejects.toThrow();
  });

  it('fails with invalid status', async () => {
    await expect(Task.create({ title: 'T', status: 'invalid' })).rejects.toThrow();
  });

  it('fails with invalid priority', async () => {
    await expect(Task.create({ title: 'T', priority: 'urgent' })).rejects.toThrow();
  });

  it('trims whitespace from title', async () => {
    const task = await Task.create({ title: '  Clean me  ' });
    expect(task.title).toBe('Clean me');
  });

  it('rejects title longer than 150 characters', async () => {
    await expect(Task.create({ title: 'a'.repeat(151) })).rejects.toThrow();
  });

  it('sets timestamps automatically', async () => {
    const task = await Task.create({ title: 'Timestamps' });
    expect(task.createdAt).toBeDefined();
    expect(task.updatedAt).toBeDefined();
  });
});
