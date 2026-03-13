import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Play, BookOpen } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { useCourses } from '../context/CourseContext';
import HandAnimation from '../components/translation/HandAnimation';

const LessonDetail: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { getCurrentCourse, completedLessons, completeLesson } = useCourses();
  const navigate = useNavigate();
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const course = getCurrentCourse(courseId || '');
  const lesson = course?.lessons.find(l => l.id === lessonId);
  
  useEffect(() => {
    if (completedLessons.includes(lessonId || '')) {
      setLessonCompleted(true);
    }
  }, [lessonId, completedLessons]);
  
  if (!course || !lesson) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Lesson not found</h2>
            <Link to="/courses" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
              Back to Courses
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const handleComplete = () => {
    completeLesson(lesson.id);
    setLessonCompleted(true);
    setShowCompletion(true);
    
    // Hide completion message after 3 seconds
    setTimeout(() => {
      setShowCompletion(false);
    }, 3000);
  };
  
  const nextLesson = course.lessons[
    course.lessons.findIndex(l => l.id === lesson.id) + 1
  ];
  
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          {/* Lesson Header */}
          <div className="mb-6">
            <Link to={`/courses/${courseId}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Course
            </Link>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    lessonCompleted ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {lessonCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{lesson.durationMinutes} minutes</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{lesson.description}</p>
                
                {showCompletion && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Great job! You've completed this lesson.</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Lesson Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Lesson Content</h2>
                <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <HandAnimation letter="A" playing={true} />
                  <p className="text-center text-gray-600 mt-8 max-w-lg">
                    This lesson teaches you how to sign "{lesson.title}". Follow along with the 
                    animated demonstration above and practice the hand positions.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    <span>Watch Video Tutorial</span>
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your Progress</h3>
                
                {!lessonCompleted ? (
                  <div className="space-y-6">
                    <p className="text-gray-600">
                      Complete this lesson to track your progress and unlock the next one.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleComplete}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Mark as Completed</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Lesson Completed</span>
                    </div>
                    
                    {nextLesson ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/courses/${courseId}/lessons/${nextLesson.id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        <span>Next Lesson: {nextLesson.title}</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/courses/${courseId}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        <span>Back to Course</span>
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LessonDetail;