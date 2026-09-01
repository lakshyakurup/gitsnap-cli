const express = require('express');
const { saveSnapshot, listSnapshots, getSnapshotById } = require('../storage/db');

function attachSnapshotRoutes(app) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const snapshots = await listSnapshots();
      res.json({ snapshots });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const snapshot = req.body;
      if (!snapshot || !snapshot.branch) {
        return res.status(400).json({ error: 'Invalid snapshot payload.' });
      }

      const saved = await saveSnapshot(snapshot);
      res.status(201).json(saved);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const snapshot = await getSnapshotById(req.params.id);
      if (!snapshot) {
        return res.status(404).json({ error: 'Snapshot not found.' });
      }
      res.json(snapshot);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use('/api/snapshots', router);
}

module.exports = {
  attachSnapshotRoutes,
};
