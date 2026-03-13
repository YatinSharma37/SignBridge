import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Course } from '../../context/CourseContext';

interface CourseCardProps {
  course: Course;
  enrolled: boolean;
  onEnroll: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, enrolled, onEnroll }) => {
  const levelColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{course.lessonsCount} lessons</span>
          {enrolled ? (
            <Link
              to={`/courses/${course.id}`}
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnroll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Enroll Now
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;