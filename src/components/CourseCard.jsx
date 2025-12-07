import { BookOpen, Clock, Tag } from 'lucide-react';
import { isEnrolled } from '../services/mockData';

export default function CourseCard({ course, onClick }) {
  const enrolled = isEnrolled(course.id);

  const levelColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700'
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level]}`}>
            {course.level}
          </span>
        </div>
        {course.price === 'Free' && (
          <div className="absolute top-3 left-3">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              FREE
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>5 Lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>2h</span>
            </div>
          </div>
        </div>

        <button className={`w-full mt-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
          enrolled
            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
            : 'bg-teal-600 text-white hover:bg-teal-700'
        }`}>
          {enrolled ? 'Continue Learning' : 'Start Learning'}
        </button>
      </div>
    </div>
  );
}
