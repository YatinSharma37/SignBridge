import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Languages } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Languages className="w-12 h-12 text-blue-600" />,
      title: 'Interactive Translation',
      description: 'Translate text to sign language with beautiful interactive animations.',
    },
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: 'Structured Courses',
      description: 'Learn through structured courses from beginner to advanced levels.',
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'Community Learning',
      description: 'Practice with other learners through our community features.',
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking.',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-16 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Learn Sign Language <span className="text-blue-600">Interactively</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 md:pr-12">
                Break communication barriers with our interactive sign language learning platform. 
                Practice anytime, anywhere with animated tutorials and track your progress.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <Link to="/signup" className="flex items-center">
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                 <a href="/Translate.html">Try Translator</a>
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2"
            >
          <div className="relative p-6">
<div
  className="grid grid-cols-3 grid-rows-2 gap-3 rounded-md overflow-hidden w-[200px] h-[140px]"
  aria-hidden="true"
>
  <img
    src="https://img.freepik.com/free-photo/young-woman-keeping-hand-chest-showing-palm-sweater-white-shirt-looking-merry-front-view_176474-110877.jpg?ga=GA1.1.492218953.1747249920&semt=ais_hybrid&w=740"
    alt="Demonstrating sign language"
    className="w-16 h-16 object-cover block"
  />
  <img
    src="https://img.freepik.com/free-photo/handsome-curly-male-with-delighted-expression_176532-7252.jpg?ga=GA1.1.492218953.1747249920&semt=ais_hybrid&w=740"
    alt="Demonstrating sign language"
    className="w-16 h-16 object-cover block"
  />
  <img
    src="https://img.freepik.com/free-photo/young-girl-jacket-shorts-waving-hand-greeting-looking-cheerful-front-view_176474-37673.jpg?ga=GA1.1.492218953.1747249920&semt=ais_hybrid&w=740"
    alt="Demonstrating sign language"
    className="w-16 h-16 object-cover block"
  />
  <img
    src="https://media.istockphoto.com/id/1192662472/photo/hash-symbol-portrait-of-bright-trendy-attractive-woman-making-hashtag-gesture-and-smiling.jpg?s=612x612&w=0&k=20&c=QBdp1_N5n6a1WMO_iNsw7jODuO41aiEW41SJB2tdQyo="
    alt="Demonstrating sign language"
    className="w-16 h-16 object-cover block"
  />
  <img
    src="https://media.istockphoto.com/id/1351210641/photo/deaf-woman-show-her-hand-for-help-or-aid-as-sign-language-deaf-body-language-concept.jpg?s=612x612&w=0&k=20&c=BvYv_RY4vduNY2Vo18w-3UgTzPxRrIgpWToxJ54CVKQ="
    alt="Demonstrating sign language"
    className="w-16 h-16 object-cover block"
  />
  <img
    src="https://media.istockphoto.com/id/1189763885/photo/deaf-woman-using-sign-language.jpg?s=612x612&w=0&k=20&c=-Cf7dEa6zSmMLJJ23YgqqXd0u6tPguc5ol_nZbuUmag="
    alt="Demonstrating sign language"
    className="w-16 h-16 object-cover block"
  />
</div>


  {/* Floating Badge */}
  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-green-600 font-bold">✓</span>
      </div>
      <div>
        <p className="text-sm font-semibold">Animated Tutorials</p>
        <p className="text-xs text-gray-500">Learn through visual guidance</p>
      </div>
    </div>
  </div>
</div>



            </motion.div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How SignVerse Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform enhances sign learning with intutive tools like text-to-image, text-to-voice conversion and gesture-to-text. We've added unique features to create a more accessible and interactive experience for deaf and non-speaking individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All the satisfied users who improved their sign language skills with SignVerse
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">
                      {['VS', 'AM', 'IR'][index]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {['Vihaan Sharma', 'Aanya Mehra', 'Ishaan Reddy'][index]}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {['Student', 'Teacher', 'Professional Interpreter'][index]}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  {[
                    "SignVerse has been incredible for learning ASL. The animations make it easy to understand proper hand movements and the progress tracking keeps me motivated.",
                    "As a teacher, I've recommended SignVerse to many students. The structured courses provide a solid foundation and the interactive elements keep students engaged.",
                    "The translation tool has been invaluable in my work as an interpreter. I use it to practice new signs and stay fluent in different sign language dialects."
                  ][index]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Practice our ASL exercise to improve your sign language proficiency.</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join and master sign language at your own pace with our interactive platform.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
              <a href="/Fingerspelling.html" className="flex items-center justify-center">
                  Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
             </a>

          </motion.button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;