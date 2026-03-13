import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  videoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessonsCount: number;
  lessons: Lesson[];
  category: 'alphabet' | 'numbers' | 'common-phrases' | 'conversation';
}

interface CoursesContextType {
  courses: Course[];
  enrolledCourses: string[];
  enrollInCourse: (courseId: string) => void;
  completedLessons: string[];
  completeLesson: (lessonId: string) => void;
  getCurrentCourse: (courseId: string) => Course | undefined;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};

// Mock courses data
const mockCourses: Course[] = [
  {
    id: 'asl-basics',
    title: 'ASL Basics',
    description: 'Learn the fundamentals of American Sign Language including alphabet and basic greetings.',
    imageUrl: 'https://images.pexels.com/photos/6964361/pexels-photo-6964361.jpeg',
    level: 'beginner',
    lessonsCount: 8,
    category: 'alphabet',
    lessons: [
      {
        id: 'asl-alphabet',
        title: 'ASL Alphabet',
        description: 'Learn to sign each letter of the alphabet in American Sign Language',
        durationMinutes: 15,
        level: 'beginner',
      },
      {
        id: 'basic-greetings',
        title: 'Basic Greetings',
        description: 'Common greetings and introductions in ASL',
        durationMinutes: 20,
        level: 'beginner',
      },
    ]
  },
  {
    id: 'numbers-counting',
    title: 'Numbers & Counting',
    description: 'Master numbers, counting, and basic math expressions in ASL.',
    imageUrl: 'https://images.pexels.com/photos/6964687/pexels-photo-6964687.jpeg',
    level: 'beginner',
    lessonsCount: 5,
    category: 'numbers',
    lessons: [
      {
        id: 'numbers-1-10',
        title: 'Numbers 1-10',
        description: 'Learn to sign numbers from 1 to 10',
        durationMinutes: 10,
        level: 'beginner',
      },
      {
        id: 'numbers-11-20',
        title: 'Numbers 11-20',
        description: 'Learn to sign numbers from 11 to 20',
        durationMinutes: 10,
        level: 'beginner',
      },
    ]
  },
  {
    id: 'everyday-phrases',
    title: 'Everyday Phrases',
    description: 'Essential signs for common phrases used in daily conversation.',
    imageUrl: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg',
    level: 'intermediate',
    lessonsCount: 10,
    category: 'common-phrases',
    lessons: [
      {
        id: 'common-questions',
        title: 'Common Questions',
        description: 'Learn to sign common questions like "How are you?" and "What is your name?"',
        durationMinutes: 25,
        level: 'intermediate',
      },
      {
        id: 'daily-activities',
        title: 'Daily Activities',
        description: 'Signs for everyday activities and routines',
        durationMinutes: 20,
        level: 'intermediate',
      },
    ]
  },
  {
    id: 'conversation-skills',
    title: 'Conversation Skills',
    description: 'Develop fluency in ASL conversations with practice dialogues.',
    imageUrl: 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg',
    level: 'advanced',
    lessonsCount: 7,
    category: 'conversation',
    lessons: [
      {
        id: 'casual-conversations',
        title: 'Casual Conversations',
        description: 'Practice everyday casual conversations in ASL',
        durationMinutes: 30,
        level: 'advanced',
      },
      {
        id: 'telling-stories',
        title: 'Telling Stories',
        description: 'Learn narrative techniques in ASL to tell engaging stories',
        durationMinutes: 35,
        level: 'advanced',
      },
    ]
  },
];

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['asl-basics']);
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    user?.progress.completedLessons || []
  );

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
    }
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const getCurrentCourse = (courseId: string) => {
    return mockCourses.find(course => course.id === courseId);
  };

  return (
    <CoursesContext.Provider value={{
      courses: mockCourses,
      enrolledCourses,
      enrollInCourse,
      completedLessons,
      completeLesson,
      getCurrentCourse,
    }}>
      {children}
    </CoursesContext.Provider>
  );
};