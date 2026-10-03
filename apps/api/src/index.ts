import express from 'express';

const app = express();
const port = Number(process.env.API_PORT ?? 3000);

app.get('/healthz', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/events', (_request, response) => {
  response.json([
    {
      id: 'event-001',
      title: 'Rencontres du produit numerique',
      category: 'Conference',
      location: 'Paris',
      date: '2026-10-17T09:00:00.000Z',
    },
    {
      id: 'event-002',
      title: 'Atelier creation de communaute',
      category: 'Atelier',
      location: 'Lyon',
      date: '2026-10-24T13:30:00.000Z',
    },
  ]);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`EventHub API listening on ${port}`);
});
