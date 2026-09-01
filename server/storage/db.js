const fs = require('fs');
const path = require('path');

const STORAGE_DIR = path.join(process.cwd(), '.data');
const STORAGE_FILE = path.join(STORAGE_DIR, 'snapshots.json');

async function initializeDb() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORAGE_FILE)) {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify({ snapshots: [] }, null, 2));
  }
}

async function readDb() {
  await initializeDb();
  const raw = fs.readFileSync(STORAGE_FILE, 'utf8');
  return JSON.parse(raw);
}

async function writeDb(data) {
  await initializeDb();
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
}

async function saveSnapshot(snapshot) {
  const db = await readDb();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    ...snapshot,
  };

  db.snapshots.unshift(entry);
  await writeDb(db);
  return entry;
}

async function listSnapshots() {
  const db = await readDb();
  return db.snapshots || [];
}

async function getSnapshotById(id) {
  const db = await readDb();
  return (db.snapshots || []).find((snapshot) => snapshot.id === id) || null;
}

module.exports = {
  initializeDb,
  saveSnapshot,
  listSnapshots,
  getSnapshotById,
};
