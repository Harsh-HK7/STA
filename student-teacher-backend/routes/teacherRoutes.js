import express from 'express';

const router = express.Router();

// Get teacher list
router.get('/list', async (req, res) => {
  try {
    res.json([
      { _id: '1', name: 'John Doe', email: 'john@example.com' },
      { _id: '2', name: 'Jane Smith', email: 'jane@example.com' }
    ]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teachers', error: error.message });
  }
});

export default router; 