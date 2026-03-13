import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import SignupForm from '../components/auth/SignupForm';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
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
                <h1 className="text-3xl lg:text-4xl font-bold mb-6">Join SignVerse Today</h1>
                <p className="text-lg lg:text-xl mb-8 text-blue-100">
                  Create your account and begin your journey to sign language fluency with interactive lessons and comprehensive tracking.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <p className="text-blue-100">Access to all beginner courses</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <p className="text-blue-100">Interactive sign language translator</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <p className="text-blue-100">Progress tracking dashboard</p>
                  </div>
                </div>
                
                <p className="text-blue-200 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-white font-bold hover:underline">
                    Log in here
                  </Link>
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center"
              >
                <SignupForm />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;