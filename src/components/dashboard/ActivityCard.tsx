import React from 'react';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, value, icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white rounded-xl shadow-md p-6 flex items-center ${color}`}
    >
      <div className={`flex-shrink-0 rounded-full w-12 h-12 flex items-center justify-center text-white ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
};

export default ActivityCard;