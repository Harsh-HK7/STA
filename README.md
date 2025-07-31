# Student-Teacher Appointment Booking System

A full-stack web application for managing appointments between students and teachers, built with React (Frontend) and Node.js/Express (Backend) with Firebase Firestore as the database.

## 🚀 Features

- **User Authentication**: Login/Signup with role-based access (Student, Teacher, Admin)
- **Appointment Booking**: Students can book appointments with available teachers
- **Appointment Management**: Teachers can view and manage appointment requests
- **Real-time Updates**: Firebase Firestore for real-time data synchronization
- **Responsive Design**: Modern UI with Material-UI and Tailwind CSS
- **Role-based Access Control**: Different dashboards for different user roles

## 📁 Project Structure

```
student-teacher-booking-system/
├── student-teacher-frontend/     # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── api/                # API configuration
│   │   ├── utils/              # Utility functions
│   │   └── assets/             # Static assets
│   └── package.json
├── student-teacher-backend/      # Node.js Backend
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Custom middleware
│   ├── models/                 # Data models
│   ├── routes/                 # API routes
│   ├── utils/                  # Utility functions
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Material-UI** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Firebase Admin SDK** - Firebase services
- **Firestore** - NoSQL database
- **JWT** - Authentication tokens
- **Morgan** - HTTP request logger
- **Winston** - Logging library

## 🔧 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `student-teacher-backend` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Logging Configuration
LOG_LEVEL=info
LOG_FILE_PATH=./logs/app.log
```

### Frontend Environment Variables

Create a `.env` file in the `student-teacher-frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_NAME=Student-Teacher Booking System

# Development Configuration
VITE_DEV_MODE=true
```

## 🔥 Firebase Configuration

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Set up Authentication (Email/Password)

### 2. Generate Service Account Key

1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Place it in `student-teacher-backend/config/firebaseKey.json`

### 3. Firestore Security Rules

Set up Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Appointments collection
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
    
    // Teachers collection
    match /teachers/{teacherId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == teacherId;
    }
    
    // Students collection
    match /students/{studentId} {
      allow read, write: if request.auth != null && request.auth.uid == studentId;
    }
  }
}
```

### 4. Firestore Collections Structure

```javascript
// Users Collection
users: {
  userId: {
    email: string,
    role: "student" | "teacher" | "admin",
    name: string,
    createdAt: timestamp,
    updatedAt: timestamp
  }
}

// Appointments Collection
appointments: {
  appointmentId: {
    studentId: string,
    teacherId: string,
    date: string,
    time: string,
    status: "pending" | "accepted" | "rejected" | "completed",
    createdAt: timestamp,
    updatedAt: timestamp
  }
}

// Teachers Collection
teachers: {
  teacherId: {
    userId: string,
    specialization: string,
    availability: string,
    bio: string,
    createdAt: timestamp
  }
}

// Students Collection
students: {
  studentId: {
    userId: string,
    grade: string,
    subjects: array,
    createdAt: timestamp
  }
}
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd student-teacher-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Place your `firebaseKey.json` in the `config/` directory
   - Update environment variables in `.env` file

4. **Start the server:**
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd student-teacher-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create `.env` file with the provided variables

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📱 Available Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔐 Authentication & Authorization

### User Roles
- **Student**: Can book appointments with teachers
- **Teacher**: Can view and manage appointment requests
- **Admin**: Full system access and user management

### JWT Token Structure
```javascript
{
  "userId": "user-id",
  "email": "user@example.com",
  "role": "student|teacher|admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id/status` - Update appointment status
- `GET /api/appointments/teacher` - Get teacher's appointments

### Users
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user role

## 🎨 UI Components

### AuthFormWrapper
Reusable wrapper for authentication forms with consistent styling.

### TeacherCard
Displays teacher information with booking functionality.

## 🔧 Development

### Code Style
- ESLint configuration for consistent code style
- Prettier for code formatting
- React Hooks ESLint plugin

### Logging
- Winston for structured logging
- Morgan for HTTP request logging
- Log files stored in `logs/` directory

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Build the application
3. Deploy to your preferred hosting service (Heroku, Vercel, etc.)

### Frontend Deployment
1. Update API base URL for production
2. Build the application: `npm run build`
3. Deploy to static hosting (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Note**: Make sure to replace all placeholder values in the environment variables with your actual Firebase project credentials and configuration details. 