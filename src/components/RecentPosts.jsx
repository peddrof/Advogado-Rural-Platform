import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { articles } from '../lib/articles'; // Import centralized articles

const RecentPosts = () => {
  const recentPosts = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16">
      <div className="container-custom">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center mb-12"
        >
          Artigos Recentes
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {recentPosts.map((post) => (
            <motion.article 
              key={post.id}
              variants={item}
              className="card flex flex-col md:flex-row group"
            >
              <div className="md:w-1/3 relative">
                <img  
                  className="w-full h-48 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                  alt={`Imagem ilustrativa para o artigo: ${post.title}`}
                  src={post.image}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-rural-darkgreen text-rural-beige px-3 py-1 rounded-lg text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:w-2/3 flex flex-col">
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-rural-green transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-rural-darkgreen/80 mb-4 flex-grow">
                  {post.subtitle}
                </p>
                <div className="flex items-center justify-between text-sm text-rural-darkgreen/70 mt-auto">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>{post.date}</span>
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
        
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="btn-primary inline-flex items-center"
          >
            Ver Todos os Artigos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;