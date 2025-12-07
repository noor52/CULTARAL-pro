import { useState } from 'react';
import Navbar from './components/Navbar';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';

function App() {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const handleCourseClick = (courseId: number) => {
    setSelectedCourseId(courseId);
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {selectedCourseId ? (
        <CourseDetail courseId={selectedCourseId} onBack={handleBackToCourses} />
      ) : (
        <CourseList onCourseClick={handleCourseClick} />
      )}
    </div>
  );
}

export default App;
