import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, BookOpen, ArrowRight, Star, Clock, Users,
  CheckCircle, Filter, Zap, Trophy, ChevronDown
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { useCourses } from '../context/CourseContext';
import { Course } from '../context/CourseContext';

const levelConfig = {
  beginner: { label: 'Beginner', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', dot: 'bg-emerald-400' },
  intermediate: { label: 'Intermediate', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', dot: 'bg-amber-400' },
  advanced: { label: 'Advanced', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20', dot: 'bg-rose-400' },
};

const categoryConfig: Record<string, { label: string; icon: string }> = {
  all: { label: 'All Courses', icon: '📚' },
  alphabet: { label: 'Alphabet', icon: '🔤' },
  numbers: { label: 'Numbers', icon: '🔢' },
  'common-phrases': { label: 'Phrases', icon: '💬' },
  conversation: { label: 'Conversation', icon: '🗣️' },
};

// Fake stats for visual richness
const courseStats: Record<string, { students: number; rating: number; hours: number }> = {
  'asl-basics': { students: 1240, rating: 4.8, hours: 3 },
  'numbers-counting': { students: 890, rating: 4.6, hours: 2 },
  'everyday-phrases': { students: 1560, rating: 4.9, hours: 4 },
  'conversation-skills': { students: 640, rating: 4.7, hours: 5 },
};

const CourseCard: React.FC<{
  course: Course;
  enrolled: boolean;
  onEnroll: () => void;
  index: number;
}> = ({ course, enrolled, onEnroll, index }) => {
  const lvl = levelConfig[course.level];
  const stats = courseStats[course.id] || { students: 500, rating: 4.5, hours: 2 };
  const cat = categoryConfig[course.category] || { label: course.category, icon: '📖' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden
                 hover:bg-slate-50 dark:hover:bg-white/[0.07] hover:border-blue-400/40 dark:hover:border-blue-500/30 hover:shadow-xl dark:hover:shadow-[0_8px_40px_rgba(59,130,246,0.15)]
                 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-600 border ${lvl.bg} ${lvl.color} ${lvl.border} backdrop-blur-sm`}>
            <span className={`w-1.5 h-1.5 rounded-full ${lvl.dot}`} />
            {lvl.label}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white border border-white/10">
            {cat.icon} {cat.label}
          </span>
        </div>

        {/* Enrolled badge */}
        {enrolled && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Enrolled
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-700 text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors leading-tight">
          {course.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2 flex-1">
          {course.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">{stats.rating}</span>
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {stats.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {stats.hours}h
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.lessonsCount} lessons
          </span>
        </div>

        {/* Action */}
        {enrolled ? (
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                       bg-blue-500/15 border border-blue-500/25 text-blue-400 font-semibold text-sm
                       hover:bg-blue-500/25 transition-colors"
          >
            Continue Learning <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onEnroll}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                       bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm
                       hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/20"
          >
            <Zap className="w-4 h-4" /> Enroll Free
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const Courses: React.FC = () => {
  const { courses, enrolledCourses, enrollInCourse } = useCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || course.category === activeFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const totalEnrolled = enrolledCourses.length;

  return (
    <MainLayout>
      <div
        className="min-h-screen pt-16 pb-16 bg-slate-50 dark:bg-[#0a0f1e] transition-colors duration-500"
      >
        {/* ── Hero ── */}
        <div className="relative overflow-hidden py-14 px-4 text-center border-b border-slate-200 dark:border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
              <Trophy className="w-3.5 h-3.5" />
              {totalEnrolled > 0 ? `${totalEnrolled} course${totalEnrolled > 1 ? 's' : ''} enrolled` : 'Start learning today'}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
              Sign Language{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Courses
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
              Structured lessons from beginner to advanced. Learn at your own pace, completely free.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-6 mt-8 flex-wrap"
          >
            {[
              { value: courses.length, label: 'Courses' },
              { value: '4,330+', label: 'Students' },
              { value: '4.8★', label: 'Avg Rating' },
              { value: 'Free', label: 'Always' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* ── Search + Filter toggle ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 mb-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search courses…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white
                           placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
                           text-sm transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all
                ${showFilters ? 'bg-blue-500/15 border-blue-500/30 text-blue-400' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20'}`}
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          {/* ── Filter panel ── */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(categoryConfig).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => setActiveFilter(key)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all
                            ${activeFilter === key
                              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-white/5 border border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                            }`}
                        >
                          {val.icon} {val.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-slate-200 dark:border-white/5 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5">Level</p>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setLevelFilter(level)}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all
                            ${levelFilter === level
                              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-white/5 border border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                            }`}
                        >
                          {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Results count ── */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500 text-sm">
              Showing <span className="text-white font-medium">{filteredCourses.length}</span> of{' '}
              <span className="text-white font-medium">{courses.length}</span> courses
            </p>
            {(activeFilter !== 'all' || levelFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => { setActiveFilter('all'); setLevelFilter('all'); setSearchQuery(''); }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear filters ×
              </button>
            )}
          </div>

          {/* ── Course grid ── */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  enrolled={enrolledCourses.includes(course.id)}
                  onEnroll={() => enrollInCourse(course.id)}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-9 h-9 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query</p>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;