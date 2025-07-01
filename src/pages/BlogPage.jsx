import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { articles } from '../lib/articles'; // Import centralized articles

const BlogPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('categoria');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'todos');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const allPosts = [...articles].sort((a, b) => b.id - a.id); // Use sorted articles

  const categories = [
    { name: 'Todos', slug: 'todos' },
    { name: 'Direito Agrário', slug: 'direito-agrario' },
    { name: 'Regularização Fundiária', slug: 'regularizacao-fundiaria' },
    { name: 'Contratos Rurais', slug: 'contratos-rurais' },
    { name: 'Direito Sucessório', slug: 'direito-sucessorio' },
    { name: 'Política Agrícola', slug: 'politica-agricola' },
    { name: 'Crédito Rural', slug: 'credito-rural' }
  ];

  // Function to normalize category names by removing diacritics
  const normalizeCategory = (category) => {
    return category
      .toLowerCase()
      .normalize('NFD') // Decompose diacritics (e.g., "é" → "e" + combining mark)
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
      .replace(/\s+/g, '-'); // Replace spaces with hyphens
  };

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || 
                           normalizeCategory(post.category) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rural-darkgreen mb-4">
            Blog Advogado Rural
          </h1>
          <p className="text-rural-darkgreen/80 max-w-2xl mx-auto">
            Artigos, notícias e informações jurídicas relevantes para o produtor rural e profissionais do agronegócio.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rural-darkbeige/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-rural-darkgreen/50" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-rural-beige/50 text-rural-darkgreen rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-rural-green/30"
                />
              </div>
              <div className="relative">
                <Filter size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-rural-darkgreen/50" />
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="appearance-none bg-rural-beige/50 text-rural-darkgreen rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-rural-green/30 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowRight size={16} className="rotate-90 text-rural-darkgreen/50" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {currentPosts.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentPosts.map((post) => (
              <motion.article 
                key={post.id}
                variants={item}
                className="card group transition-all duration-300 hover:shadow-lg"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative h-52 overflow-hidden">
                    <img  
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={`Imagem ilustrativa para o artigo: ${post.title}`}
                      src={post.image}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-rural-darkgreen text-rural-beige px-3 py-1 rounded-lg text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-rural-green transition-colors duration-300">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-rural-darkgreen/80 mb-4">
                    {post.subtitle}
                  </p>
                  <div className="flex items-center justify-between text-sm text-rural-darkgreen/70">
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
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-serif font-bold text-rural-darkgreen mb-4">
              Nenhum artigo encontrado
            </h3>
            <p className="text-rural-darkgreen/80 mb-6">
              Não encontramos artigos que correspondam aos seus critérios de busca.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('todos');
              }}
              className="btn-primary"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}

        {filteredPosts.length > postsPerPage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-rural-beige text-rural-darkgreen hover:bg-rural-darkbeige disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} />
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-medium ${
                        currentPage === pageNumber
                          ? 'bg-rural-darkgreen text-rural-beige'
                          : 'bg-rural-beige text-rural-darkgreen hover:bg-rural-darkbeige'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <span key={pageNumber}>...</span>;
                }
                return null;
              })}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-rural-beige text-rural-darkgreen hover:bg-rural-darkbeige disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;