import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Lesson } from '../../context/CourseContext';

interface LessonCardProps {
  lesson: Lesson;
  courseId: string;
  isCompleted: boolean;
  isLocked: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, courseId, isCompleted, isLocked }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
        isCompleted ? 'border-green-200' : isLocked ? 'border-gray-200 opacity-75' : 'border-blue-200'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{lesson.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{lesson.durationMinutes} minutes</span>
            </div>
          </div>
          <div className="ml-4">
            {isCompleted ? (
              <div className="bg-green-100 text-green-700 rounded-full p-2">
                <CheckCircle className="w-5 h-5" />
              </div>
            ) : isLocked ? (
              <div className="bg-gray-100 text-gray-400 rounded-full p-2">
                <Lock className="w-5 h-5" />
              </div>
            ) : (
              <div className="bg-blue-100 text-blue-700 rounded-full p-2">
                <Clock className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          {isLocked ? (
            <button
              disabled
              className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg text-sm cursor-not-allowed"
            >
              Complete previous lessons first
            </button>
          ) : (
            <Link
              to={`/courses/${courseId}/lessons/${lesson.id}`}
              className={`block w-full text-center py-2 rounded-lg text-sm ${
                isCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isCompleted ? 'Review Lesson' : 'Start Lesson'}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCard;