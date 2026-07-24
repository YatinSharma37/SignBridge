import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Users, Award, Languages, Hand,
  Camera, Globe, Sparkles, Zap, Play, Star, ChevronRight,
  Brain, Shield, Clock, TrendingUp
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

/* ── Animated counter ── */
const CountUp: React.FC<{ end: number; suffix?: string }> = ({ end, suffix = '' }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count}{suffix}</>;
};

/* ── Feature card ── */
const FeatureCard: React.FC<{
  icon: React.ReactNode; title: string; description: string;
  gradient: string; delay: number;
}> = ({ icon, title, description, gradient, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative glass rounded-2xl p-6 overflow-hidden neon-border cursor-default"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
    <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-5 blur-2xl group-hover:opacity-15 transition-opacity`} />
  </motion.div>
);

/* ── Tool launch card ── */
const ToolCard: React.FC<{
  title: string; desc: string; badge: string; badgeColor: string;
  icon: React.ReactNode; gradient: string; href: string; delay: number;
}> = ({ title, desc, badge, badgeColor, icon, gradient, href, delay }) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -6, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className="group relative glass rounded-2xl p-5 overflow-hidden block neon-border"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColor}`}>{badge}</span>
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors font-['Outfit']">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
        <span>Launch Tool</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
    <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-xl group-hover:opacity-25 transition-opacity`} />
  </motion.a>
);

/* ── Stat pill ── */
const StatPill: React.FC<{ value: number; suffix: string; label: string; color: string }> = ({ value, suffix, label, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass rounded-2xl p-5 text-center neon-border"
  >
    <p className={`text-3xl font-bold font-['Outfit'] bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
      <CountUp end={value} suffix={suffix} />
    </p>
    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{label}</p>
  </motion.div>
);

const Home: React.FC = () => {
  const tools = [
    {
      title: 'ASL Translator',
      desc: 'Convert any text to beautiful animated sign language visuals instantly.',
      badge: '🔥 Popular',
      badgeColor: 'text-orange-300 bg-orange-500/10 border-orange-500/25',
      icon: <Languages className="w-6 h-6 text-white" />,
      gradient: 'from-indigo-500 to-purple-600',
      href: '/Translate.html',
    },
    {
      title: 'Fingerspelling AI',
      desc: 'Practice and verify fingerspelling with AI-powered gesture recognition.',
      badge: '🤖 AI',
      badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/25',
      icon: <Hand className="w-6 h-6 text-white" />,
      gradient: 'from-cyan-500 to-blue-600',
      href: '/Fingerspelling.html',
    },
    {
      title: 'Live Gesture Camera',
      desc: 'Real-time webcam gesture detection powered by machine learning.',
      badge: '📷 Live',
      badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25',
      icon: <Camera className="w-6 h-6 text-white" />,
      gradient: 'from-emerald-500 to-teal-600',
      href: '/HandgesturedLive.html',
    },
    {
      title: 'Online Gesture Mode',
      desc: 'Practice sign language directly in your browser — no setup needed.',
      badge: '🌐 Online',
      badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-500/25',
      icon: <Globe className="w-6 h-6 text-white" />,
      gradient: 'from-pink-500 to-rose-600',
      href: '/onlinegesture.html',
    },
  ];

  const features = [
    {
      icon: <Languages className="w-7 h-7 text-white" />,
      title: 'Interactive Translation',
      description: 'Convert text to animated sign language with stunning visual demonstrations for every letter and word.',
      gradient: 'from-indigo-500 to-purple-600',
      delay: 0.1,
    },
    {
      icon: <BookOpen className="w-7 h-7 text-white" />,
      title: 'Structured Courses',
      description: 'Progress from beginner to advanced with carefully designed lessons, quizzes, and certificates.',
      gradient: 'from-cyan-500 to-blue-600',
      delay: 0.2,
    },
    {
      icon: <Brain className="w-7 h-7 text-white" />,
      title: 'AI Gesture Recognition',
      description: 'Our machine learning model identifies your signs in real-time and gives instant feedback.',
      gradient: 'from-violet-500 to-pink-600',
      delay: 0.3,
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-white" />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics, streaks, and milestone achievements.',
      gradient: 'from-emerald-500 to-teal-600',
      delay: 0.4,
    },
    {
      icon: <Shield className="w-7 h-7 text-white" />,
      title: 'Accessibility First',
      description: 'Built with deaf and hard-of-hearing users in mind — every feature designed for accessibility.',
      gradient: 'from-amber-500 to-orange-600',
      delay: 0.5,
    },
    {
      icon: <Users className="w-7 h-7 text-white" />,
      title: 'Community Learning',
      description: 'Join thousands of learners. Practice together and celebrate milestones as a community.',
      gradient: 'from-rose-500 to-pink-600',
      delay: 0.6,
    },
  ];

  const testimonials = [
    {
      initials: 'VS',
      name: 'Vihaan Sharma',
      role: 'Student',
      text: 'SignVerse transformed how I learn ASL. The animations make it so intuitive — I learned the entire alphabet in just two days!',
      stars: 5,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      initials: 'AM',
      name: 'Aanya Mehra',
      role: 'Teacher',
      text: "As a special education teacher, I recommend SignVerse to every student. The structured courses and visual feedback are outstanding.",
      stars: 5,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      initials: 'IR',
      name: 'Ishaan Reddy',
      role: 'Professional Interpreter',
      text: 'The live gesture recognition is incredibly accurate. I use it daily to practice new signs and maintain fluency in different dialects.',
      stars: 5,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <MainLayout>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-white dark:bg-[#0a0f1e] bg-grid-pattern overflow-hidden">
        {/* Background orbs */}
        <div className="orb bg-indigo-600 w-[500px] h-[500px] opacity-15 -top-40 -left-32" />
        <div className="orb bg-cyan-600 w-96 h-96 opacity-10 top-20 right-0" />
        <div className="orb bg-purple-600 w-80 h-80 opacity-8 bottom-0 left-1/3" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-32 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-indigo-500/25 text-indigo-300 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Sign Language Platform
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-6 font-['Outfit']">
                Learn Sign<br />
                Language{' '}
                <span className="gradient-text">Interactively</span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
                Break communication barriers with our AI-powered platform. Practice ASL with live gesture recognition, animated tutorials, and structured courses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/signup"
                    className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base"
                  >
                    <Play className="w-5 h-5" />
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <a
                    href="/Translate.html"
                    className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base"
                  >
                    <Zap className="w-5 h-5" />
                    Try ASL Translator
                  </a>
                </motion.div>
              </div>

              {/* Trust row */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {['VS', 'AM', 'IR', 'KP'].map((ini, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 border-2 border-white dark:border-[#0a0f1e] flex items-center justify-center text-xs font-bold text-white"
                    >
                      {ini}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Trusted by <span className="text-slate-900 dark:text-white font-semibold">5,000+</span> learners</p>
                </div>
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-1/2 flex flex-col gap-4"
            >
              {/* Floating hero card */}
              <div className="glass rounded-3xl p-6 card-glow relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Hand className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold font-['Outfit']">Live Gesture Recognition</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-xs">AI Engine Active</span>
                    </div>
                  </div>
                </div>
                {/* Mock camera frame */}
                <div className="bg-slate-100 dark:bg-slate-900/80 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-cyan-900/20" />
                  {/* Scanning line animation */}
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60"
                    style={{ animation: 'scanline 2s linear infinite', top: '50%' }} />
                  <div className="relative text-center">
                    <div className="w-20 h-20 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-3 float-animation">
                      <Hand className="w-10 h-10 text-indigo-400" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Recognizing ASL signs…</p>
                    <div className="flex justify-center gap-1 mt-2">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-indigo-400"
                          style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Detected: <span className="text-slate-900 dark:text-white font-medium">HELLO WORLD</span></span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">98% confidence</span>
                </div>
              </div>

              {/* Mini stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '500+', label: 'Signs', color: 'text-indigo-400' },
                  { value: '10+', label: 'Courses', color: 'text-cyan-400' },
                  { value: '98%', label: 'Accuracy', color: 'text-emerald-400' },
                ].map(s => (
                  <div key={s.label} className="glass rounded-2xl p-3 text-center">
                    <p className={`text-xl font-bold font-['Outfit'] ${s.color}`}>{s.value}</p>
                    <p className="text-slate-500 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-slate-50 dark:bg-[#0a0f1e] border-y border-slate-200 dark:border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatPill value={5000} suffix="+" label="Active Learners" color="from-indigo-400 to-purple-400" />
            <StatPill value={500} suffix="+" label="ASL Signs" color="from-cyan-400 to-blue-400" />
            <StatPill value={98} suffix="%" label="AI Accuracy" color="from-emerald-400 to-teal-400" />
            <StatPill value={10} suffix="+" label="Courses" color="from-amber-400 to-orange-400" />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white dark:bg-[#0a0f1e] bg-grid-pattern py-24 relative overflow-hidden">
        <div className="orb bg-indigo-600 w-96 h-96 opacity-8 -top-10 right-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-cyan-500/25 text-cyan-300 text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4" />
              Platform Capabilities
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
              Everything You Need to
              <span className="gradient-text"> Master ASL</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              A complete ecosystem of tools designed to make learning sign language intuitive, engaging, and effective.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── Tools / Quick Launch ── */}
      <section className="bg-slate-50 dark:bg-[#080c18] py-24 relative overflow-hidden">
        <div className="orb bg-cyan-600 w-80 h-80 opacity-8 top-0 left-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-indigo-500/25 text-indigo-300 text-sm font-medium mb-5">
              <Zap className="w-4 h-4" />
              Interactive Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
              Launch a Tool <span className="gradient-text">Right Now</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              No sign-up required. Jump straight into any of our powerful sign language tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((t, i) => <ToolCard key={t.title} {...t} delay={i * 0.1} />)}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors group"
            >
              See all features in Dashboard
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Courses CTA ── */}
      <section className="bg-white dark:bg-[#0a0f1e] py-24 relative overflow-hidden">
        <div className="orb bg-purple-600 w-96 h-96 opacity-10 -bottom-20 right-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-violet-500/25 text-violet-300 text-sm font-medium mb-5">
                <BookOpen className="w-4 h-4" />
                Structured Learning
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-5 font-['Outfit']">
                Follow a Path from <span className="gradient-text">Beginner to Expert</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                Our courses are designed by ASL experts with bite-sized lessons, visual demonstrations, and progress checkpoints to keep you on track.
              </p>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link to="/courses" className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold">
                    <BookOpen className="w-5 h-5" />
                    Browse Courses
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link to="/signup" className="btn-secondary flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold">
                    Sign Up Free
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { label: 'ASL Fundamentals', pct: 100, color: 'from-indigo-500 to-purple-500', tag: 'Beginner' },
                { label: 'Conversational ASL', pct: 65, color: 'from-cyan-500 to-blue-500', tag: 'Intermediate' },
                { label: 'Advanced Expressions', pct: 30, color: 'from-emerald-500 to-teal-500', tag: 'Advanced' },
              ].map((c) => (
                <div key={c.label} className="glass rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-900 dark:text-white font-medium">{c.label}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">{c.tag}</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-slate-500">{c.pct}% complete</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 2-4 weeks
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-slate-50 dark:bg-[#080c18] py-24 relative overflow-hidden">
        <div className="orb bg-indigo-600 w-80 h-80 opacity-8 top-10 left-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
              Loved by <span className="gradient-text">Our Community</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Thousands of learners improving their sign language skills with SignVerse</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 neon-border relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-white dark:bg-[#0a0f1e] py-24 relative overflow-hidden">
        <div className="orb bg-indigo-600 w-[600px] h-[600px] opacity-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 card-glow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
              Start Your ASL Journey <span className="gradient-text">Today</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
              Join 5,000+ learners and master sign language with AI-powered tools, structured courses, and real-time gesture recognition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link to="/signup" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base">
                  <Sparkles className="w-5 h-5" />
                  Get Started — It's Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <a href="/Fingerspelling.html" className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base">
                  Try Fingerspelling
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;