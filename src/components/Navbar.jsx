import { BookOpen, GraduationCap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">বাংলা শিখুন</h1>
              <p className="text-sm text-emerald-100">Learn Bangla Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition">
              <BookOpen className="w-5 h-5" />
              <span className="hidden md:inline">My Courses</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
