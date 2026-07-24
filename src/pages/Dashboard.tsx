import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, BookOpen, Award, Calendar, ChevronRight, Hand, Languages,
  Camera, Mic, Zap, TrendingUp, Star, Play, ExternalLink, ArrowUpRight,
  Target, Flame, Users, Globe, BarChart3, Brain, Sparkles, CheckCircle2,
  Video, FileText, MessageSquare, Volume2, LayoutDashboard, Home,
  GraduationCap, Rocket, Shield, RefreshCw
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import ProgressChart from '../components/dashboard/ProgressChart';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { Link } from 'react-router-dom';

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{
  title: string; value: string | number; icon: React.ReactNode;
  gradient: string; change?: string; delay?: number; sub?: string;
}> = ({ title, value, icon, gradient, change, delay = 0, sub }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="relative glass rounded-2xl p-5 overflow-hidden group cursor-default neon-border"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${gradient} transition-opacity`} />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {change && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            {change}
          </span>
        )}
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">{title}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
    <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />
  </motion.div>
);

// ─── Feature Tool Card ────────────────────────────────────────────────────────
const FeatureToolCard: React.FC<{
  title: string; desc: string; icon: React.ReactNode; gradient: string;
  href: string; badge: string; badgeColor: string; delay?: number;
  isInternal?: boolean;
}> = ({ title, desc, icon, gradient, href, badge, badgeColor, delay = 0, isInternal = false }) => {
  const content = (
    <div className="group relative glass rounded-2xl p-5 overflow-hidden neon-border h-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor} border`}>
            {badge}
          </span>
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors font-['Outfit']">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{desc}</p>
        <div className="flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
          <span>Launch</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-xl group-hover:opacity-25 transition-opacity`} />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      {isInternal ? (
        <Link to={href} className="block h-full">{content}</Link>
      ) : (
        <a href={href} className="block h-full">{content}</a>
      )}
    </motion.div>
  );
};

// ─── Achievement Badge ────────────────────────────────────────────────────────
const AchievementBadge: React.FC<{
  title: string; icon: React.ReactNode; earned: boolean; desc?: string;
}> = ({ title, icon, earned, desc }) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
      earned
        ? 'glass border-indigo-500/30 shadow-lg shadow-indigo-500/10'
        : 'border-white/5 opacity-35 grayscale'
    }`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${earned ? 'bg-indigo-500/20' : 'bg-white/5'}`}>
      {icon}
    </div>
    <span className="text-xs font-medium text-slate-300 text-center leading-tight">{title}</span>
    {desc && <span className="text-[10px] text-slate-500 text-center">{desc}</span>}
    {earned && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
  </motion.div>
);

// ─── Quick Launch Button ──────────────────────────────────────────────────────
const QuickLaunchBtn: React.FC<{
  label: string; icon: React.ReactNode; href: string;
  color: string; isInternal?: boolean;
}> = ({ label, icon, href, color, isInternal = false }) => {
  const cls = `flex items-center gap-3 p-3.5 rounded-xl border glass transition-all group ${color}`;
  const inner = (
    <>
      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
      <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 ml-auto transition-colors" />
    </>
  );
  return isInternal
    ? <Link to={href} className={cls}>{inner}</Link>
    : <a href={href} className={cls}>{inner}</a>;
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, enrolledCourses, completedLessons } = useCourses();
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'progress'>('overview');

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] bg-grid-pattern relative overflow-hidden">
          <div className="orb bg-indigo-600 w-80 h-80 opacity-20" style={{ top: '20%', left: '30%' }} />
          <div className="orb bg-cyan-600 w-64 h-64 opacity-10" style={{ bottom: '20%', right: '20%' }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-12 text-center max-w-sm mx-4 card-glow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30 float-animation">
              <LayoutDashboard className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">Sign in to continue</h2>
            <p className="text-slate-400 text-sm mb-8">Access your dashboard, tools, and learning progress.</p>
            <div className="flex flex-col gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/login"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-semibold text-sm"
                >
                  Sign In <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/signup"
                  className="btn-secondary w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-semibold text-sm"
                >
                  Create Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  const activityData = [
    { day: 'Mon', minutes: 15 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 45 },
    { day: 'Thu', minutes: 20 },
    { day: 'Fri', minutes: 60 },
    { day: 'Sat', minutes: 10 },
    { day: 'Sun', minutes: 25 },
  ];

  const userCourses = courses.filter(course => enrolledCourses.includes(course.id));
  const totalLessons = userCourses.reduce((acc, course) => acc + course.lessons.length, 0);
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  const toolFeatures = [
    {
      title: 'ASL Translator',
      desc: 'Type any text and see every letter rendered as an animated ASL hand sign. Supports speech input & download.',
      icon: <Languages className="w-6 h-6 text-white" />,
      gradient: 'from-indigo-500 to-purple-600',
      href: '/Translate.html',
      badge: '🔥 Popular',
      badgeColor: 'text-orange-300 bg-orange-500/10 border-orange-500/25',
    },
    {
      title: 'Fingerspelling Practice',
      desc: 'Loads fingerspelling.xyz in-frame to let you practice and score your ASL fingerspelling accuracy.',
      icon: <Hand className="w-6 h-6 text-white" />,
      gradient: 'from-cyan-500 to-blue-600',
      href: '/Fingerspelling.html',
      badge: '✋ Practice',
      badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/25',
    },
    {
      title: 'Live Gesture Camera',
      desc: 'Requires Python + Flask backend. Run cd Gesture && python test.py then open this page for real-time webcam sign detection.',
      icon: <Camera className="w-6 h-6 text-white" />,
      gradient: 'from-emerald-500 to-teal-600',
      href: '/HandgesturedLive.html',
      badge: '🐍 Python',
      badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25',
    },
    {
      title: 'Gesture Animator',
      desc: 'Uses sign.mt to animate a 3D avatar signing your text. May open in new tab due to browser iframe restrictions.',
      icon: <Globe className="w-6 h-6 text-white" />,
      gradient: 'from-pink-500 to-rose-600',
      href: '/onlinegesture.html',
      badge: '🌐 sign.mt',
      badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-500/25',
    },
    {
      title: 'Structured Courses',
      desc: 'Follow guided ASL courses from beginner to advanced with interactive lessons, quizzes and progress tracking.',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      gradient: 'from-violet-500 to-indigo-600',
      href: '/courses',
      badge: '📚 Courses',
      badgeColor: 'text-violet-300 bg-violet-500/10 border-violet-500/25',
      isInternal: true,
    },
    {
      title: 'Sign AI Translator',
      desc: 'Show ASL signs to your webcam — the AI reads your gestures and outputs text. Requires Python Flask server.',
      icon: <Video className="w-6 h-6 text-white" />,
      gradient: 'from-amber-500 to-orange-600',
      href: '/learn',
      badge: '🤖 Live AI',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/25',
      isInternal: true,
    },
  ];


  const achievements = [
    { title: 'First Sign', icon: <Star className="w-5 h-5 text-yellow-400" />, earned: true, desc: 'Learned first sign' },
    { title: '5-Day Streak', icon: <Flame className="w-5 h-5 text-orange-400" />, earned: user.progress.streak >= 5, desc: `${user.progress.streak} day streak` },
    { title: 'Enrolled', icon: <BookOpen className="w-5 h-5 text-blue-400" />, earned: enrolledCourses.length > 0, desc: 'Joined a course' },
    { title: '1 Hour', icon: <Clock className="w-5 h-5 text-purple-400" />, earned: user.progress.totalMinutesLearned >= 60, desc: `${user.progress.totalMinutesLearned}m total` },
    { title: 'Lesson Done', icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, earned: completedLessons.length > 0, desc: `${completedLessons.length} lessons` },
    { title: 'Pro Learner', icon: <Brain className="w-5 h-5 text-pink-400" />, earned: user.progress.totalMinutesLearned >= 120, desc: '120+ minutes' },
    { title: 'Top Scorer', icon: <GraduationCap className="w-5 h-5 text-indigo-400" />, earned: false, desc: '90%+ accuracy' },
    { title: 'Consistent', icon: <Shield className="w-5 h-5 text-cyan-400" />, earned: user.progress.streak >= 10, desc: '10-day streak' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'tools', label: 'All Features', icon: <Zap className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" /> },
  ] as const;

  const quickLinks = [
    { label: 'ASL Translator', icon: <Languages className="w-5 h-5 text-indigo-400" />, href: '/Translate.html', color: 'border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-500/5' },
    { label: 'Fingerspelling', icon: <Hand className="w-5 h-5 text-cyan-400" />, href: '/Fingerspelling.html', color: 'border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5' },
    { label: 'Live Camera', icon: <Camera className="w-5 h-5 text-emerald-400" />, href: '/HandgesturedLive.html', color: 'border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5' },
    { label: 'Online Mode', icon: <Globe className="w-5 h-5 text-pink-400" />, href: '/onlinegesture.html', color: 'border-pink-500/20 hover:border-pink-500/40 hover:bg-pink-500/5' },
    { label: 'Courses', icon: <BookOpen className="w-5 h-5 text-violet-400" />, href: '/courses', color: 'border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/5', isInternal: true },
    { label: 'Sign AI', icon: <Video className="w-5 h-5 text-amber-400" />, href: '/learn', color: 'border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/5', isInternal: true },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#0a0f1e] bg-grid-pattern pt-20 pb-16 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="orb bg-indigo-600 w-96 h-96 opacity-10 top-0 -left-20" />
        <div className="orb bg-cyan-600 w-80 h-80 opacity-8 top-40 right-0" />
        <div className="orb bg-purple-600 w-64 h-64 opacity-8 bottom-0 left-1/3" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 relative z-10">

          {/* ── Welcome Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6 md:p-8 mb-8 card-glow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-cyan-600/5" />
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-2xl shadow-indigo-500/30 font-['Outfit'] flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0a0f1e] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Welcome back 👋</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-['Outfit']">{user.name}</h1>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-orange-400 text-xs font-medium">{user.progress.streak} day streak</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-600" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-400 text-xs font-medium">{user.progress.totalMinutesLearned}m learned</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Progress ring area */}
                <div className="hidden md:flex flex-col items-end mr-2">
                  <p className="text-slate-400 text-xs mb-0.5">Overall Progress</p>
                  <p className="text-3xl font-bold gradient-text font-['Outfit']">{overallProgress}%</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none">
                    <Link
                      to="/courses"
                      id="continue-learning-btn"
                      className="btn-primary flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm w-full"
                    >
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none">
                    <a
                      href="/Translate.html"
                      id="quick-tools-btn"
                      className="btn-secondary flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm w-full"
                    >
                      <Zap className="w-4 h-4" />
                      Quick Tools
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Learning Streak" value={`${user.progress.streak} days`}
              icon={<Flame className="w-5 h-5 text-white" />}
              gradient="from-orange-500 to-red-600" change="+2" delay={0.1}
              sub="Keep it up!"
            />
            <StatCard
              title="Time Learned" value={`${user.progress.totalMinutesLearned}m`}
              icon={<Clock className="w-5 h-5 text-white" />}
              gradient="from-emerald-500 to-teal-600" change="+15m" delay={0.15}
              sub="Total session time"
            />
            <StatCard
              title="Lessons Done" value={completedLessons.length}
              icon={<CheckCircle2 className="w-5 h-5 text-white" />}
              gradient="from-indigo-500 to-purple-600" delay={0.2}
              sub={`of ${totalLessons} total`}
            />
            <StatCard
              title="Courses Enrolled" value={enrolledCourses.length}
              icon={<BookOpen className="w-5 h-5 text-white" />}
              gradient="from-cyan-500 to-blue-600" delay={0.25}
              sub="Active courses"
            />
          </div>

          {/* ── Tabs ── */}
          <div className="flex items-center gap-2 mb-6 glass rounded-2xl p-1.5 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Activity Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-2 glass rounded-2xl p-6 card-glow"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-['Outfit']">Weekly Activity</h3>
                      <p className="text-slate-400 text-sm">Your learning minutes this week</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 glass rounded-xl text-xs font-medium text-indigo-300 border border-indigo-500/20">
                        205 mins total
                      </div>
                    </div>
                  </div>
                  <ProgressChart data={activityData} />
                </motion.div>

                {/* Courses Panel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass rounded-2xl p-6 card-glow"
                >
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-['Outfit']">My Courses</h3>
                    <Link to="/courses" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors">
                      View All <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {userCourses.length > 0 ? (
                      userCourses.slice(0, 4).map((course) => {
                        const cTotal = course.lessons.length;
                        const cDone = course.lessons.filter(l => completedLessons.includes(l.id)).length;
                        const pct = cTotal > 0 ? Math.round((cDone / cTotal) * 100) : 0;
                        return (
                          <Link to={`/courses/${course.id}`} key={course.id}>
                            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer">
                              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/25 transition-colors">
                                <BookOpen className="w-5 h-5 text-indigo-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{course.title}</h4>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <div className="flex-1 bg-white/5 rounded-full h-1.5">
                                    <div
                                      className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-1.5 rounded-full transition-all duration-700"
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-slate-500 w-8 text-right">{pct}%</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3">
                          <BookOpen className="w-7 h-7 text-indigo-400" />
                        </div>
                        <p className="text-slate-400 text-sm mb-4">No courses enrolled yet</p>
                        <Link to="/courses" className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium">
                          Browse Courses
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass rounded-2xl p-6 mt-6 card-glow"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-['Outfit']">Achievements</h3>
                    <p className="text-slate-400 text-sm">{achievements.filter(a => a.earned).length}/{achievements.length} earned</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-xl border border-yellow-500/20">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-medium text-yellow-300">{achievements.filter(a => a.earned).length} Badges</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {achievements.map((a, i) => (
                    <AchievementBadge key={i} {...a} />
                  ))}
                </div>
              </motion.div>

              {/* Quick Access Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass rounded-2xl p-6 mt-6 card-glow"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-['Outfit'] mb-5">Quick Launch</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {quickLinks.map((item) => (
                    <QuickLaunchBtn
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      href={item.href}
                      color={item.color}
                      isInternal={item.isInternal}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── TOOLS TAB ── */}
          {activeTab === 'tools' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-1">All Features & Tools</h2>
                <p className="text-slate-400 text-sm">Everything available in SignVerse — click any card to launch</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {toolFeatures.map((f, i) => (
                  <FeatureToolCard key={f.title} {...f} delay={i * 0.08} />
                ))}
              </div>

              {/* Upcoming features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass rounded-2xl p-6 mt-6 card-glow"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-['Outfit']">Coming Soon</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 ml-auto">
                    Planned Features
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: 'Voice to Sign', icon: <Mic className="w-5 h-5 text-slate-400" />, desc: 'Speech recognition + sign translation', eta: 'Q3 2025' },
                    { title: 'Community Hub', icon: <Users className="w-5 h-5 text-slate-400" />, desc: 'Practice with other learners live', eta: 'Q4 2025' },
                    { title: 'Sign-to-Text', icon: <MessageSquare className="w-5 h-5 text-slate-400" />, desc: 'Translate signs into written text', eta: 'Q4 2025' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/2 opacity-70">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-slate-300">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                        <span className="text-[10px] text-yellow-500 font-medium">{item.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── PROGRESS TAB ── */}
          {activeTab === 'progress' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Learning Goals */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-6 card-glow"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-['Outfit'] mb-6">Learning Goals</h3>
                  <div className="space-y-5">
                    {[
                      { label: 'Course Completion', value: overallProgress, color: 'from-indigo-500 to-purple-500', target: '100%' },
                      { label: 'Lessons Finished', value: Math.min(completedLessons.length * 10, 100), color: 'from-cyan-500 to-blue-500', target: `${completedLessons.length} lessons` },
                      { label: 'Minutes Learned', value: Math.min(user.progress.totalMinutesLearned / 2, 100), color: 'from-emerald-500 to-teal-500', target: `${user.progress.totalMinutesLearned} / 200 min` },
                      { label: 'Streak Goal', value: Math.min(user.progress.streak * 10, 100), color: 'from-orange-500 to-red-500', target: `${user.progress.streak} / 10 days` },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-300">{item.label}</span>
                          <span className="text-xs text-slate-500">{item.target}</span>
                        </div>
                        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          />
                        </div>
                        <div className="text-right mt-1">
                          <span className="text-xs text-slate-500">{item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Detailed Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="glass rounded-2xl p-6 card-glow"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-['Outfit'] mb-6">Detailed Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Total Sessions', value: '24', icon: <Target className="w-4 h-4 text-indigo-400" />, sub: 'sessions' },
                      { label: 'Avg Daily Time', value: '29m', icon: <Clock className="w-4 h-4 text-cyan-400" />, sub: 'per day' },
                      { label: 'Signs Learned', value: '142', icon: <Hand className="w-4 h-4 text-emerald-400" />, sub: 'signs' },
                      { label: 'Accuracy Rate', value: '87%', icon: <TrendingUp className="w-4 h-4 text-purple-400" />, sub: 'avg score' },
                      { label: 'Certificates', value: '1', icon: <Award className="w-4 h-4 text-yellow-400" />, sub: 'earned' },
                      { label: 'Community Rank', value: '#142', icon: <Users className="w-4 h-4 text-pink-400" />, sub: 'of 10k' },
                    ].map((stat) => (
                      <motion.div
                        key={stat.label}
                        whileHover={{ scale: 1.03 }}
                        className="p-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors cursor-default"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {stat.icon}
                          <span className="text-xs text-slate-500">{stat.label}</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.sub}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Weekly Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass rounded-2xl p-6 mt-6 card-glow"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-['Outfit']">Activity This Week</h3>
                    <p className="text-slate-400 text-sm">Daily learning time in minutes</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-xl border border-indigo-500/20">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-medium text-indigo-300">This Week</span>
                  </div>
                </div>
                <ProgressChart data={activityData} />
              </motion.div>
            </motion.div>
          )}

        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;