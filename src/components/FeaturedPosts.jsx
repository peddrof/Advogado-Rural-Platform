import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { articles } from '../lib/articles'; // Import centralized articles

const FeaturedPosts = () => {
  const featuredPosts = articles.filter(article => article.featured);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 bg-rural-lightbeige">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title mb-4 md:mb-0"
          >
            Artigos em Destaque
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/blog" 
              className="flex items-center text-rural-darkgreen hover:text-rural-green transition-colors duration-300 font-medium"
            >
              Ver todos os artigos
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {featuredPosts.map((post) => (
            <motion.article 
              key={post.id} 
              variants={item}
              className={cn(
                "card group transition-all duration-300 hover:shadow-lg",
                post.featured && "lg:grid lg:grid-cols-1"
              )}
            >
              <div className={cn(
                "relative overflow-hidden",
                post.featured ? "h-96" : "h-96"
              )}>
                <img  
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-2xl"
                  alt={`Imagem ilustrativa para o artigo: ${post.title}`}
                  src={post.image}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-rural-darkgreen text-rural-beige px-3 py-1 rounded-lg text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 h-[50%] flex flex-col">
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 group-hover:text-rural-green transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-rural-darkgreen/80 mb-4 flex-grow">
                  {post.subtitle}
                </p>
                <div className="flex items-center justify-between text-sm text-rural-darkgreen/70">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
