import { useState, useEffect } from 'react';
import { mockCourses, getUserEnrollments } from '../services/mockData';
import CourseCard from './CourseCard';

export default function CourseList({ onCourseClick }) {
  const [courses, setCourses] = useState(mockCourses);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const enrollments = getUserEnrollments();
    const updatedCourses = mockCourses.map(course => ({
      ...course,
      enrolled: enrollments.includes(course.id)
    }));
    setCourses(updatedCourses);
  }, []);

  const filteredCourses = courses.filter(course => {
    if (filter === 'enrolled') return course.enrolled;
    if (filter === 'beginner') return course.level === 'Beginner';
    if (filter === 'intermediate') return course.level === 'Intermediate';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Bangla Language Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your journey to learn Bengali with our comprehensive course collection.
            From alphabet to advanced grammar, we have everything you need.
          </p>
        </div>

        <div className="flex justify-center mb-8 space-x-3 flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setFilter('enrolled')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'enrolled'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            My Learning
          </button>
          <button
            onClick={() => setFilter('beginner')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'beginner'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setFilter('intermediate')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'intermediate'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Intermediate
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onCourseClick(course.id)}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No courses found. Try selecting a different filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
