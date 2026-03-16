import express from 'express';
import { Model, InferenceRequest, InferenceResponse, ModelStatus } from 'dummyai-shared-types';

const app = express();
app.use(express.json());

app.get('/models', (req, res) => {
  res.json([
    { id: 'model-001', name: 'sentiment-v3', version: '3.1.0', createdAt: '2026-01-15' },
    { id: 'model-002', name: 'summarizer-v2', version: '2.0.1', createdAt: '2026-02-20' },
  ] as Model[]);
});

app.post('/models/:id/infer', (req, res) => {
  const { id } = req.params;
  const body = req.body as InferenceRequest;
  const response: InferenceResponse = {
    requestId: crypto.randomUUID(),
    modelId: id,
    output: { result: 'positive', confidence: 0.94 },
    latencyMs: 127,
  };
  res.json(response);
});

app.get('/models/:id/status', (req, res) => {
  const { id } = req.params;
  const status: ModelStatus = {
    modelId: id,
    status: 'training',
    progress: 42,
    lastUpdated: new Date().toISOString(),
  };
  res.json(status);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway on port ${PORT}`));
