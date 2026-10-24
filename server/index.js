const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const DATA_DIR = path.join(__dirname, '../.data');
const DB_FILE = path.join(DATA_DIR, 'snapshots.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));

app.get('/', (req, res) => {
  res.json({ message: 'Gitsnap CLI API is live!', endpoints: ['/health', '/api/snapshots'] });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gitsnap-cli' });
});

app.get('/api/snapshots', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  res.json(data);
});

app.post('/api/snapshots', (req, res) => {
  const snapshots = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  const newSnap = { id: Date.now().toString(), ...req.body, generatedAt: new Date().toISOString() };
  snapshots.push(newSnap);
  fs.writeFileSync(DB_FILE, JSON.stringify(snapshots, null, 2));
  res.status(201).json(newSnap);
});

app.listen(PORT, () => {
  console.log(`🚀 Gitsnap backend server running on port ${PORT}`);
});
