# Bangla Learning LMS - Backend (Java Spring Boot)

## Overview
This is the backend REST API for the Bangla Learning LMS platform. It's built with Java 17 and Spring Boot 3.x.

## Technology Stack
- **Language:** Java 17
- **Framework:** Spring Boot 3.2.0
- **Database:** H2 In-Memory Database
- **Build Tool:** Maven
- **ORM:** Spring Data JPA
- **Validation:** Spring Boot Starter Validation

## Project Structure
```
backend/
├── src/
│   └── main/
│       ├── java/com/bangla/lms/
│       │   ├── BanglaLearningLmsApplication.java  (Main Application)
│       │   ├── entity/
│       │   │   ├── Course.java
│       │   │   └── Lesson.java
│       │   ├── repository/
│       │   │   ├── CourseRepository.java
│       │   │   └── LessonRepository.java
│       │   ├── service/
│       │   │   ├── CourseService.java
│       │   │   └── LessonService.java
│       │   ├── controller/
│       │   │   ├── CourseController.java
│       │   │   └── LessonController.java
│       │   └── dto/
│       │       ├── CourseDTO.java
│       │       └── LessonDTO.java
│       └── resources/
│           └── application.properties
└── pom.xml
```

## Database Configuration
The application uses H2 in-memory database with the following settings:
- **Database URL:** jdbc:h2:mem:banglalmsdb
- **Username:** sa
- **Password:** (empty)
- **H2 Console:** http://localhost:8080/h2-console

## API Endpoints

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `GET /api/courses/level/{level}` - Get courses by level (Beginner/Intermediate)
- `POST /api/courses` - Create a new course
- `PUT /api/courses/{id}` - Update a course
- `DELETE /api/courses/{id}` - Delete a course

### Lesson Endpoints
- `GET /api/lessons/course/{courseId}` - Get all lessons for a course
- `GET /api/lessons/{id}` - Get lesson by ID
- `POST /api/lessons/course/{courseId}` - Create a new lesson
- `PUT /api/lessons/{id}` - Update a lesson
- `DELETE /api/lessons/{id}` - Delete a lesson

## How to Run

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR file:
   ```bash
   java -jar target/bangla-learning-lms-1.0.0.jar
   ```

4. The API will be available at: http://localhost:8080

5. Access H2 Console at: http://localhost:8080/h2-console

## UTF-8 Support
The application is fully configured to support UTF-8 encoding for Bangla text:
- Character encoding set to UTF-8 in application.properties
- All string fields support Unicode characters
- API responses use UTF-8 encoding

## Sample Data
To populate the database with sample data, you can use the API endpoints or create a DataInitializer class (not included in this MVP).

## Testing
Run tests with:
```bash
mvn test
```

## Notes
- CORS is enabled for all origins (`@CrossOrigin(origins = "*")`) for development purposes
- In production, configure CORS properly with specific allowed origins
- The H2 console is enabled for development; disable it in production
- Data is stored in-memory and will be lost when the application stops
