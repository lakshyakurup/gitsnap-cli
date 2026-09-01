const express = require('express');
const cors = require('cors');
const { attachSnapshotRoutes } = require('./routes/snapshot');
const { initializeDb } = require('./storage/db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gitsnap-cli' });
});

attachSnapshotRoutes(app);

initializeDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Gitsnap backend listening on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to initialize database:', error.message);
  process.exit(1);
});
