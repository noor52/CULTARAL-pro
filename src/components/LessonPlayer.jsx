import { useState } from 'react';
import { CheckCircle, ChevronRight, Video, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function LessonPlayer({ lesson, onComplete, onNext, hasNext }) {
  const [activeTab, setActiveTab] = useState('video');
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
              activeTab === 'video'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Video className="w-5 h-5" />
            <span>Video</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
              activeTab === 'content'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Notes</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'video' && (
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
            <iframe
              src={lesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={lesson.title}
            ></iframe>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="prose prose-lg max-w-none mb-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg bangla-content">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-teal-200" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3" {...props} />,
                  p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4 text-lg" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-teal-700 text-xl" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-none space-y-2 mb-4" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-none space-y-2 mb-4" {...props} />,
                  li: ({ node, ...props }) => <li className="text-gray-700 text-lg pl-4 border-l-4 border-teal-300 py-1" {...props} />,
                  code: ({ node, ...props }) => <code className="bg-white px-2 py-1 rounded text-teal-600 font-mono" {...props} />
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={handleComplete}
            disabled={completed}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              completed
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>{completed ? 'Completed' : 'Mark as Complete'}</span>
          </button>

          {hasNext && (
            <button
              onClick={onNext}
              className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
