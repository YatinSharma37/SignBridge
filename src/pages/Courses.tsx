import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, SlidersHorizontal } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import CourseCard from '../components/courses/CourseCard';
import { useCourses } from '../context/CourseContext';

const Courses: React.FC = () => {
  const { courses, enrolledCourses, enrollInCourse } = useCourses();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [levelFilter, setLevelFilter] = React.useState('all');

  // Filter courses based on search, category, and level
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || course.category === activeFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-800">Browse Courses</h1>
              <p className="text-gray-600 mt-1">Discover our comprehensive sign language courses</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 md:mt-0 w-full md:w-72"
            >
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          </div>
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-4 mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <Filter className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Categories:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['all', 'alphabet', 'numbers', 'common-phrases', 'conversation'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilter === category
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' 
                      ? 'All Categories' 
                      : category.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <SlidersHorizontal className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Level:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setLevelFilter(level)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      levelFilter === level
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level === 'all' 
                      ? 'All Levels' 
                      : level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <CourseCard 
                  key={course.id}
                  course={course}
                  enrolled={enrolledCourses.includes(course.id)}
                  onEnroll={() => enrollInCourse(course.id)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;