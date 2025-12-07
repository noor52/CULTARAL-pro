# Bangla Learning LMS - MVP

A comprehensive Learning Management System for foreigners to learn the Bengali language. This MVP includes a fully functional React frontend with mock data and a complete Java Spring Boot backend ready for deployment.

## Project Structure

```
project/
├── frontend/          (React Application - LIVE & RUNNING)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CourseList.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   └── LessonPlayer.jsx
│   │   ├── services/
│   │   │   └── mockData.js
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── backend/           (Java Spring Boot - Code Only)
    ├── src/main/java/com/bangla/lms/
    │   ├── BanglaLearningLmsApplication.java
    │   ├── entity/
    │   ├── repository/
    │   ├── service/
    │   ├── controller/
    │   └── dto/
    └── pom.xml
```

## Features Implemented

### ✅ Frontend (Live & Functional)
1. **Course Catalog**
   - Grid display of all available courses
   - Course cards with thumbnails, titles (Bangla/English), difficulty levels
   - Filter by: All Courses, My Learning, Beginner, Intermediate
   - Beautiful, modern UI with Tailwind CSS

2. **Course Detail Page**
   - Course information and enrollment button
   - Lesson list sidebar with progress tracking
   - Lock/unlock mechanism (content hidden until enrolled)
   - Enrollment status persistence using localStorage

3. **Lesson Player**
   - Video player (YouTube embed placeholder)
   - Content viewer with Bangla text rendering
   - Tab interface: Video / Notes
   - Mark as complete functionality
   - Next lesson navigation
   - Progress tracking

4. **Mock Data Service**
   - 3 sample courses with authentic Bangla content
   - 5 lessons per course
   - Full Bangla text with translations
   - Enrollment management
   - Progress tracking

### ✅ Backend (Ready for Deployment)
1. **RESTful API Endpoints**
   - Course CRUD operations
   - Lesson CRUD operations
   - Filter by level
   - Proper DTO pattern

2. **Database Design**
   - Course entity with UTF-8 support
   - Lesson entity with Bangla content support
   - One-to-many relationship
   - H2 in-memory database

3. **Architecture**
   - Clean layered architecture
   - Repository pattern
   - Service layer with business logic
   - DTOs for API responses
   - CORS enabled for development

## Tech Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Language:** TypeScript/JavaScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Content:** React Markdown

### Backend
- **Language:** Java 17
- **Framework:** Spring Boot 3.2.0
- **Database:** H2 In-Memory
- **ORM:** Spring Data JPA
- **Build Tool:** Maven

## Running the Application

### Frontend (Already Running)
The frontend is live and accessible in your browser preview. All features are functional with mock data.

To run locally:
```bash
npm install
npm run dev
```

### Backend (Download & Run)
1. Navigate to the backend directory
2. Ensure Java 17+ and Maven are installed
3. Run:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. API will be available at: http://localhost:8080
5. H2 Console: http://localhost:8080/h2-console

## Sample Data

### Courses
1. **বাংলা বর্ণমালা - Bangla Alphabet** (Beginner, Free)
   - Vowels (স্বরবর্ণ)
   - Consonants (ব্যঞ্জনবর্ণ)
   - Compound letters (যুক্তাক্ষর)

2. **প্রাথমিক কথোপকথন - Basic Conversations** (Beginner, Free)
   - Greetings (অভিবাদন)
   - Introduction (পরিচয়)
   - Numbers (সংখ্যা)
   - Daily phrases (দৈনন্দিন বাক্য)
   - Ordering food (খাবারের অর্ডার)

3. **বাংলা ব্যাকরণ - Bangla Grammar** (Intermediate, Paid)
   - Nouns (বিশেষ্য)
   - Pronouns (সর্বনাম)
   - Verbs (ক্রিয়া)
   - Adjectives (বিশেষণ)
   - Sentence structure (বাক্য গঠন)

## User Experience Flow

1. **Landing Page**
   - Browse all courses in a beautiful grid
   - Filter by level or enrollment status
   - Click any course to view details

2. **Course Detail**
   - View course information
   - Click "Enroll Now" to access content
   - Browse lesson list in sidebar

3. **Learning**
   - Watch video lessons
   - Read Bangla content with translations
   - Mark lessons as complete
   - Track your progress
   - Navigate to next lesson

## API Endpoints (Backend)

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get course details
- `GET /api/courses/level/{level}` - Filter by level
- `POST /api/courses` - Create course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Lessons
- `GET /api/lessons/course/{courseId}` - Get course lessons
- `GET /api/lessons/{id}` - Get lesson details
- `POST /api/lessons/course/{courseId}` - Create lesson
- `PUT /api/lessons/{id}` - Update lesson
- `DELETE /api/lessons/{id}` - Delete lesson

## Design Highlights

- **Modern UI:** Clean, professional design with emerald/teal color scheme
- **Responsive:** Works on mobile, tablet, and desktop
- **Bangla Support:** Full UTF-8 support for Bengali script
- **User-Friendly:** Intuitive navigation and clear visual feedback
- **Production-Ready:** Beautiful, polished interface suitable for real users

## Future Enhancements (Post-MVP)

1. User authentication & authorization
2. Payment integration for paid courses
3. Quiz and assessment system
4. Certificate generation
5. Progress analytics dashboard
6. Discussion forums
7. Mobile app
8. Advanced search and recommendations

## Notes

- Frontend uses localStorage for enrollment and progress tracking
- Backend is fully configured for UTF-8 Bangla text
- CORS is enabled for development (configure for production)
- Mock data can be easily replaced with real API calls
- All components are modular and maintainable

## Getting Started

1. The frontend is already running - explore the UI!
2. Try enrolling in courses and watching lessons
3. Download the backend folder to run the Java API locally
4. Connect frontend to backend by replacing mock data service with API calls

Enjoy learning বাংলা! 🇧🇩
