# Frontend-Backend Integration Guide

This guide explains how to connect the React frontend to the Java Spring Boot backend when you're ready to move from mock data to real API calls.

## Current Setup

The frontend currently uses `src/services/mockData.js` which provides:
- Mock course data
- Mock lesson data
- LocalStorage-based enrollment tracking

## Integration Steps

### Step 1: Create API Service

Create a new file `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const courseApi = {
  getAllCourses: () => api.get('/courses'),
  getCourseById: (id) => api.get(`/courses/${id}`),
  getCoursesByLevel: (level) => api.get(`/courses/level/${level}`),
  createCourse: (course) => api.post('/courses', course),
  updateCourse: (id, course) => api.put(`/courses/${id}`, course),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
};

export const lessonApi = {
  getLessonsByCourseId: (courseId) => api.get(`/lessons/course/${courseId}`),
  getLessonById: (id) => api.get(`/lessons/${id}`),
  createLesson: (courseId, lesson) => api.post(`/lessons/course/${courseId}`, lesson),
  updateLesson: (id, lesson) => api.put(`/lessons/${id}`, lesson),
  deleteLesson: (id) => api.delete(`/lessons/${id}`),
};

export default api;
```

### Step 2: Update CourseList Component

Replace mock data imports with API calls:

```javascript
import { useState, useEffect } from 'react';
import { courseApi } from '../services/api';
import CourseCard from './CourseCard';

export default function CourseList({ onCourseClick }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let response;
      if (filter === 'all') {
        response = await courseApi.getAllCourses();
      } else if (filter === 'beginner' || filter === 'intermediate') {
        const level = filter.charAt(0).toUpperCase() + filter.slice(1);
        response = await courseApi.getCoursesByLevel(level);
      } else {
        response = await courseApi.getAllCourses();
      }
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of component remains the same
  // ...
}
```

### Step 3: Update CourseDetail Component

Replace mock lesson data with API calls:

```javascript
import { useState, useEffect } from 'react';
import { courseApi, lessonApi } from '../services/api';
import LessonPlayer from './LessonPlayer';

export default function CourseDetail({ courseId, onBack }) {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const [courseResponse, lessonsResponse] = await Promise.all([
        courseApi.getCourseById(courseId),
        lessonApi.getLessonsByCourseId(courseId),
      ]);
      setCourse(courseResponse.data);
      setLessons(lessonsResponse.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of component remains the same
  // ...
}
```

### Step 4: Add Axios to Dependencies

If not already installed:

```bash
npm install axios
```

### Step 5: Environment Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Update your API service to use it:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
```

### Step 6: Handle CORS

The backend already has CORS enabled with `@CrossOrigin(origins = "*")` in the controllers.

For production, update the controllers to specify allowed origins:

```java
@CrossOrigin(origins = "https://yourdomain.com")
```

### Step 7: Add Loading States

Update components to show loading indicators:

```javascript
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

### Step 8: Add Error Handling

```javascript
const [error, setError] = useState(null);

const fetchCourses = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await courseApi.getAllCourses();
    setCourses(response.data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    setError('Failed to load courses. Please try again later.');
  } finally {
    setLoading(false);
  }
};

if (error) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchCourses}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
```

## Testing the Integration

1. **Start the Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Verify Backend is Running:**
   - Visit http://localhost:8080/api/courses
   - You should see JSON data

3. **Update Frontend Code:**
   - Replace mock data imports with API service
   - Add loading and error states

4. **Test Frontend:**
   - Refresh the application
   - Courses should load from the backend
   - Enrolling should work with backend persistence (requires user auth)

## Next Steps: User Authentication

To fully integrate enrollment tracking, you'll need to:

1. Add Spring Security to the backend
2. Implement user registration and login
3. Create enrollment endpoints
4. Add JWT token handling
5. Update frontend to send auth tokens with requests

## Troubleshooting

### CORS Issues
- Ensure backend has `@CrossOrigin` annotation
- Check browser console for CORS errors
- Verify API URLs are correct

### Connection Refused
- Backend must be running on port 8080
- Check if another service is using the port
- Verify firewall settings

### Data Not Displaying
- Check browser console for errors
- Verify API response format matches frontend expectations
- Check network tab in browser DevTools

## Production Deployment

### Frontend
- Build: `npm run build`
- Deploy `dist` folder to hosting service (Vercel, Netlify, etc.)
- Update API URL to production backend

### Backend
- Package: `mvn clean package`
- Deploy JAR to cloud service (AWS, Heroku, Railway, etc.)
- Replace H2 with production database (PostgreSQL, MySQL)
- Configure CORS for production domain
- Set up environment variables

## Summary

The current setup allows you to:
1. Develop frontend independently with mock data
2. Test UI/UX without backend dependency
3. Easily switch to real API when ready
4. Maintain clean separation of concerns

This integration guide provides a clear path from mock data to a fully connected full-stack application.
