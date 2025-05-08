
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import FeaturedPosts from '@/components/FeaturedPosts';
import CategorySection from '@/components/CategorySection';
import RecentPosts from '@/components/RecentPosts';
import TestimonialSection from '@/components/TestimonialSection';
import NewsletterSection from '@/components/NewsletterSection';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <FeaturedPosts />
      <CategorySection />
      <RecentPosts />
      <TestimonialSection />
      <NewsletterSection />
    </motion.div>
  );
};

export default HomePage;
