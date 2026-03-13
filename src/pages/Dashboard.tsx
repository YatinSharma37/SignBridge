import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Award, BarChart2, Settings, Calendar, ChevronRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import ProgressChart from '../components/dashboard/ProgressChart';
import ActivityCard from '../components/dashboard/ActivityCard';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, enrolledCourses, completedLessons } = useCourses();
  
  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Please log in to access your dashboard</h2>
            <Link to="/login" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
              Log In
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Mock data for the activity chart
  const activityData = [
    { day: 'Mon', minutes: 15 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 45 },
    { day: 'Thu', minutes: 20 },
    { day: 'Fri', minutes: 60 },
    { day: 'Sat', minutes: 10 },
    { day: 'Sun', minutes: 25 },
  ];
  
  // Get user's enrolled courses
  const userCourses = courses.filter(course => enrolledCourses.includes(course.id));
  
  // Calculate total lessons
  const totalLessons = userCourses.reduce((acc, course) => acc + course.lessons.length, 0);
  
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pt-20 pb-10">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 mt-1">
                  You've completed {completedLessons.length} of {totalLessons} lessons. Keep it up!
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Link to="/courses" className="flex items-center">
                    Continue Learning <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ActivityCard 
                title="Learning Streak" 
                value={`${user.progress.streak} days`}
                icon={<Calendar className="w-6 h-6" />}
                color="bg-blue-100"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ActivityCard 
                title="Time Learned" 
                value={`${user.progress.totalMinutesLearned} mins`}
                icon={<Clock className="w-6 h-6" />}
                color="bg-green-100"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ActivityCard 
                title="Completed Lessons" 
                value={completedLessons.length}
                icon={<Award className="w-6 h-6" />}
                color="bg-yellow-100"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ActivityCard 
                title="Enrolled Courses" 
                value={enrolledCourses.length}
                icon={<BookOpen className="w-6 h-6" />}
                color="bg-purple-100"
              />
            </motion.div>
          </div>
          
          {/* Charts and Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <ProgressChart data={activityData} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Your Courses</h3>
                <Link to="/courses" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {userCourses.length > 0 ? (
                  userCourses.slice(0, 3).map((course) => {
                    const totalLessons = course.lessons.length;
                    const completedCount = course.lessons.filter(lesson => 
                      completedLessons.includes(lesson.id)
                    ).length;
                    const progress = Math.round((completedCount / totalLessons) * 100);
                    
                    return (
                      <Link to={`/courses/${course.id}`} key={course.id}>
                        <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="ml-4 flex-grow">
                            <h4 className="text-sm font-medium text-gray-800">{course.title}</h4>
                            <div className="flex items-center mt-1">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{progress}% complete</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                    <Link 
                      to="/courses" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;