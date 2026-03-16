import request from 'supertest';
import { app } from '../index';

describe('GET /models/:id/status', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/models/model-001/status');
    expect(res.status).toBe(200);
  });

  it('should return modelId matching the path param', async () => {
    const res = await request(app).get('/models/model-001/status');
    expect(res.body.modelId).toBe('model-001');
  });

  it('should return modelId matching a different path param', async () => {
    const res = await request(app).get('/models/model-xyz/status');
    expect(res.body.modelId).toBe('model-xyz');
  });

  it('should return a valid status field', async () => {
    const res = await request(app).get('/models/model-001/status');
    expect(['training', 'ready', 'failed', 'deploying']).toContain(res.body.status);
  });

  it('should return progress as a number between 0 and 100', async () => {
    const res = await request(app).get('/models/model-001/status');
    expect(typeof res.body.progress).toBe('number');
    expect(res.body.progress).toBeGreaterThanOrEqual(0);
    expect(res.body.progress).toBeLessThanOrEqual(100);
  });

  it('should return lastUpdated as a string', async () => {
    const res = await request(app).get('/models/model-001/status');
    expect(typeof res.body.lastUpdated).toBe('string');
  });
});
