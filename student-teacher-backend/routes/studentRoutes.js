import express from 'express';

const router = express.Router();

// Get student profile
router.get('/profile', async (req, res) => {
  try {
    res.json({
      email: 'student@example.com',
      name: 'Student Name',
      role: 'student'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student profile', error: error.message });
  }
});

export default router; 