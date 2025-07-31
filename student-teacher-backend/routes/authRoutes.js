import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Login route
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // For demo purposes, create a simple token
    const token = 'demo-token-' + Date.now();
    const user = {
      email: email,
      role: email.includes('admin') ? 'admin' : email.includes('teacher') ? 'teacher' : 'student'
    };

    res.json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Signup route
router.post('/signup', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty(),
  body('role').isIn(['student', 'teacher'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role } = req.body;

    // For demo purposes, create a simple token
    const token = 'demo-token-' + Date.now();
    const user = { email, name, role };

    res.json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
});

export default router; 