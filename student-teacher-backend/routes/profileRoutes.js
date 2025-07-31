import express from 'express';

const router = express.Router();

// Get user profile
router.get('/', async (req, res) => {
  try {
    res.json({
      email: 'user@example.com',
      name: 'User Name',
      role: 'student'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

export default router; 