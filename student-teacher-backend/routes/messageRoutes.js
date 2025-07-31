import express from 'express';

const router = express.Router();

// Get messages
router.get('/', async (req, res) => {
  try {
    res.json([
      {
        _id: '1',
        sender: 'teacher@example.com',
        receiver: 'student@example.com',
        message: 'Hello, how can I help you?',
        timestamp: new Date().toISOString()
      }
    ]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

export default router; 