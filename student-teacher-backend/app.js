import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { logStream}  from "./utils/logger.js";
import { db } from "./config/firebase.js";
import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from './routes/teacherRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.get("/test-firebase", async (req, res) => {
  try {
    const snapshot = await db.collection("test").get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

dotenv.config();

app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.onrender.com', 'http://localhost:5173']
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(morgan("combined", { stream: logStream }));

// Now add your routes
app.use("/api/auth", authRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Student-Teacher Booking Backend is Running!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Backend is running",
    timestamp: new Date().toISOString()
  });
});

export default app; 