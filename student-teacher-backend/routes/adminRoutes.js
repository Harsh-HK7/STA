import express from 'express';

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    res.json([
      { _id: '1', email: 'admin@example.com', role: 'admin' },
      { _id: '2', email: 'teacher@example.com', role: 'teacher' },
      { _id: '3', email: 'student@example.com', role: 'student' }
    ]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

export default router; 