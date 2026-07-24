import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, LayoutDashboard, Languages, LogOut, LogIn, UserPlus, Hand, ChevronDown, Sparkles, Camera, Video, Globe, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setToolsOpen(false); }, [location]);

  const navLinks = [
    { to: '/', name: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { to: '/courses', name: 'Courses', icon: <Book className="w-4 h-4" /> },
  ];

  const toolLinks = [
    { href: '/Translate.html', name: 'ASL Translator', icon: <Languages className="w-4 h-4" />, badge: 'Popular', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/25', desc: 'Text → animated sign images' },
    { href: '/Fingerspelling.html', name: 'Fingerspelling', icon: <Hand className="w-4 h-4" />, badge: 'AI', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/25', desc: 'Practice & verify your signs' },
    { href: '/HandgesturedLive.html', name: 'Live Gesture AI', icon: <Camera className="w-4 h-4" />, badge: 'Python', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/25', desc: 'Webcam + Python backend' },
    { href: '/onlinegesture.html', name: 'Gesture Animator', icon: <Globe className="w-4 h-4" />, badge: 'sign.mt', badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/25', desc: '3D avatar signs your text' },
    { href: '/learn', name: 'Sign AI (Live)', icon: <Video className="w-4 h-4" />, badge: 'Live AI', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/25', desc: 'Show signs → get text output', isInternal: true },
  ];

  const authLinks = user
    ? [
        { to: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { to: '#', name: 'Logout', icon: <LogOut className="w-4 h-4" />, onClick: () => { logout(); window.location.href = '/'; } },
      ]
    : [
        { to: '/login', name: 'Login', icon: <LogIn className="w-4 h-4" /> },
        { to: '/signup', name: 'Sign Up', icon: <UserPlus className="w-4 h-4" />, highlight: true },
      ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-[#0a0f1e]/95 backdrop-blur-2xl shadow-xl dark:shadow-2xl border-b border-slate-200 dark:border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600/80 to-cyan-600/80 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Hand className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">Sign<span className="text-indigo-500 dark:text-indigo-400">Verse</span></span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/25 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}

              {/* Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200"
                >
                  <Languages className="w-4 h-4" />
                  Tools
                  <ChevronDown className={`w-3 h-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {toolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden"
                    >
                      <div className="p-2">
                        {toolLinks.map((tool) => {
                          const inner = (
                            <>
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors text-indigo-300">
                                {tool.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-slate-900 dark:text-white">{tool.name}</span>
                                  {tool.badge && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${tool.badgeColor}`}>
                                      {tool.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500">{tool.desc}</p>
                              </div>
                            </>
                          );
                          return tool.isInternal ? (
                            <Link
                              key={tool.name}
                              to={tool.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                            >
                              {inner}
                            </Link>
                          ) : (
                            <a
                              key={tool.name}
                              href={tool.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                            >
                              {inner}
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1" />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-white/5 transition-all duration-200 mx-1"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1" />

              {authLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={link.onClick}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      link.highlight
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-500/25 border border-indigo-400/20'
                        : active
                        ? 'bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/25'
                        : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile buttons */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-300 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 w-80 h-full bg-white/95 dark:bg-[#0d1424]/95 backdrop-blur-2xl border-l border-slate-200 dark:border-white/10 z-50 pt-20 px-4 overflow-y-auto shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-1">Navigation</p>
                {navLinks.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.name}
                      to={link.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        active ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  );
                })}
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-1 mt-4">Tools</p>
                {toolLinks.map((tool) => {
                  const mobileInner = (
                    <>
                      {tool.icon}
                      <span>{tool.name}</span>
                      {tool.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ml-auto ${tool.badgeColor}`}>
                          {tool.badge}
                        </span>
                      )}
                    </>
                  );
                  return tool.isInternal ? (
                    <Link
                      key={tool.name}
                      to={tool.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                    >
                      {mobileInner}
                    </Link>
                  ) : (
                    <a
                      key={tool.name}
                      href={tool.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                    >
                      {mobileInner}
                    </a>
                  );
                })}
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-1 mt-4">Account</p>
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={link.onClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      link.highlight
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;