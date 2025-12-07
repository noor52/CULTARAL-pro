import { useState, useEffect } from 'react';
import { ArrowLeft, Lock, PlayCircle, CheckCircle } from 'lucide-react';
import { mockCourses, mockLessons, isEnrolled, enrollInCourse } from '../services/mockData';
import LessonPlayer from './LessonPlayer';

export default function CourseDetail({ courseId, onBack }) {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const foundCourse = mockCourses.find(c => c.id === courseId);
    setCourse(foundCourse);
    setLessons(mockLessons[courseId] || []);
    setEnrolled(isEnrolled(courseId));

    const completed = localStorage.getItem(`completed_${courseId}`);
    if (completed) {
      setCompletedLessons(JSON.parse(completed));
    }
  }, [courseId]);

  const handleEnroll = () => {
    enrollInCourse(courseId);
    setEnrolled(true);
    if (lessons.length > 0) {
      setSelectedLesson(lessons[0]);
    }
  };

  const handleLessonClick = (lesson) => {
    if (enrolled) {
      setSelectedLesson(lesson);
    }
  };

  const handleLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      localStorage.setItem(`completed_${courseId}`, JSON.stringify(updated));
    }
  };

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < lessons.length - 1) {
      setSelectedLesson(lessons[currentIndex + 1]);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 mb-6 hover:bg-white/10 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Courses</span>
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full md:w-80 h-48 object-cover rounded-lg shadow-xl"
            />

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-emerald-100 text-lg mb-6">{course.description}</p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{lessons.length} Lessons</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{course.price}</span>
                </div>
              </div>

              {!enrolled && (
                <button
                  onClick={handleEnroll}
                  className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all shadow-lg"
                >
                  Enroll Now - Start Learning
                </button>
              )}

              {enrolled && (
                <div className="bg-white/20 px-4 py-2 rounded-lg inline-block">
                  <span className="font-semibold">✓ Enrolled</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Course Content</h3>

              <div className="space-y-2">
                {lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isActive = selectedLesson?.id === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        isActive
                          ? 'bg-teal-50 border-2 border-teal-500'
                          : enrolled
                          ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                          : 'bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          {!enrolled ? (
                            <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <PlayCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 mb-1">Lesson {index + 1}</p>
                            <p className={`text-sm font-medium line-clamp-2 ${
                              enrolled ? 'text-gray-800' : 'text-gray-400'
                            }`}>
                              {lesson.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {!enrolled && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Enroll to Access Course Content
                </h3>
                <p className="text-gray-600 mb-6">
                  Click the "Enroll Now" button above to start learning this course.
                </p>
              </div>
            )}

            {enrolled && !selectedLesson && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <PlayCircle className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Select a Lesson to Begin
                </h3>
                <p className="text-gray-600">
                  Choose any lesson from the course content on the left to start learning.
                </p>
              </div>
            )}

            {enrolled && selectedLesson && (
              <LessonPlayer
                lesson={selectedLesson}
                onComplete={() => handleLessonComplete(selectedLesson.id)}
                onNext={handleNextLesson}
                hasNext={lessons.findIndex(l => l.id === selectedLesson.id) < lessons.length - 1}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
