const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
const DB_FILE = path.join(__dirname, 'snapshots.json');

if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'gitsnap-cli' }));
app.get('/api/snapshots', (req, res) => res.json(JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))));
app.post('/api/snapshots', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  const snap = { id: Date.now().toString(), ...req.body, generatedAt: new Date().toISOString() };
  data.push(snap);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.status(201).json(snap);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
