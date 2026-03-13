import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BarChart2, ArrowLeft, BookOpen } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import LessonCard from '../components/courses/LessonCard';
import { useCourses } from '../context/CourseContext';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCurrentCourse, completedLessons, enrollInCourse, enrolledCourses } = useCourses();
  
  const course = getCurrentCourse(courseId || '');
  
  if (!course) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Course not found</h2>
            <Link to="/courses" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
              Back to Courses
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const isEnrolled = enrolledCourses.includes(course.id);
  const totalLessons = course.lessons.length;
  const completedCount = course.lessons.filter(lesson => 
    completedLessons.includes(lesson.id)
  ).length;
  const progress = Math.round((completedCount / totalLessons) * 100);

  // Determine if lesson is locked (for simple sequential progression)
  const isLessonLocked = (index: number) => {
    if (index === 0) return false; // First lesson is never locked
    
    // Previous lesson must be completed to unlock current lesson
    const prevLesson = course.lessons[index - 1];
    return !completedLessons.includes(prevLesson.id);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          {/* Course Header */}
          <div className="mb-6">
            <Link to="/courses" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Courses
            </Link>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-48 md:h-64 relative">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === 'beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : course.level === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">
                      {course.title}
                    </h1>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-700">{course.lessonsCount} lessons</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-700">
                          {course.lessons.reduce((acc, lesson) => acc + lesson.durationMinutes, 0)} mins total
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {!isEnrolled && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => enrollInCourse(course.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                      Enroll Now
                    </motion.button>
                  )}
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">About this course</h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>
                
                {isEnrolled && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Your Progress</h3>
                      <span className="text-sm text-gray-500">{progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="bg-blue-600 h-2.5 rounded-full"
                        transition={{ duration: 1 }}
                      ></motion.div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Lessons Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Course Content</h2>
            
            {!isEnrolled ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-md">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Enroll to access course content</h3>
                <p className="text-gray-600 mb-6">Join this course to get access to all lessons and track your progress.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => enrollInCourse(course.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Enroll Now
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    courseId={course.id}
                    isCompleted={completedLessons.includes(lesson.id)}
                    isLocked={isLessonLocked(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetail;