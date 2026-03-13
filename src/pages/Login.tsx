import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import LoginForm from '../components/auth/LoginForm';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 pt-20 pb-10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row shadow-xl rounded-xl overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 bg-gradient-to-r from-blue-700 to-blue-900 p-8 lg:p-12 text-white flex flex-col justify-center"
              >
                <h1 className="text-3xl lg:text-4xl font-bold mb-6">Welcome Back</h1>
                <p className="text-lg lg:text-xl mb-8 text-blue-100">
                  Sign in to continue your sign language learning journey and track your progress.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <p className="text-blue-100">Continue where you left off</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <p className="text-blue-100">Access your saved translations</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <p className="text-blue-100">View your learning statistics</p>
                  </div>
                </div>
                
                <p className="text-blue-200 text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-white font-bold hover:underline">
                    Sign up for free
                  </Link>
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center"
              >
                <LoginForm />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;