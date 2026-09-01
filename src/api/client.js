const axios = require('axios');

async function uploadSnapshot(payload, options = {}) {
  const apiUrl = options.apiUrl || 'http://localhost:4000/api';

  try {
    const response = await axios.post(`${apiUrl}/snapshots`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Backend upload failed: ${error.response.status} ${error.response.statusText}`);
    }

    throw new Error(`Backend upload failed: ${error.message}`);
  }
}

module.exports = {
  uploadSnapshot,
};
