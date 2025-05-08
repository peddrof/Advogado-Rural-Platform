
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('categoria');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'todos');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Simulated blog posts data
  const allPosts = [
    {
      id: 1,
      title: 'Regularização Fundiária: O que você precisa saber',
      excerpt: 'Entenda os principais aspectos da regularização fundiária e como ela pode impactar sua propriedade rural.',
      category: 'Regularização Fundiária',
      author: 'Dr. Carlos Silva',
      date: '10 de Maio, 2025',
      readTime: '8 min',
      slug: 'regularizacao-fundiaria',
      categorySlug: 'regularizacao-fundiaria'
    },
    {
      id: 2,
      title: 'Contratos de Arrendamento Rural: Direitos e Deveres',
      excerpt: 'Conheça os principais pontos que devem constar em um contrato de arrendamento rural para garantir segurança jurídica.',
      category: 'Contratos Rurais',
      author: 'Dra. Ana Oliveira',
      date: '5 de Maio, 2025',
      readTime: '6 min',
      slug: 'contratos-arrendamento-rural',
      categorySlug: 'contratos-rurais'
    },
    {
      id: 3,
      title: 'Código Florestal: Impactos para o Produtor Rural',
      excerpt: 'Análise das principais mudanças do Código Florestal e como elas afetam o dia a dia do produtor rural brasileiro.',
      category: 'Direito Ambiental',
      author: 'Dr. Paulo Mendes',
      date: '1 de Maio, 2025',
      readTime: '10 min',
      slug: 'codigo-florestal-impactos',
      categorySlug: 'direito-ambiental'
    },
    {
      id: 4,
      title: 'Usucapião Rural: Requisitos e Procedimentos',
      excerpt: 'Entenda como funciona o processo de usucapião em propriedades rurais e quais são os requisitos necessários.',
      category: 'Direito Agrário',
      author: 'Dr. Roberto Campos',
      date: '30 de Abril, 2025',
      readTime: '7 min',
      slug: 'usucapiao-rural-requisitos',
      categorySlug: 'direito-agrario'
    },
    {
      id: 5,
      title: 'CAR: Como Regularizar seu Cadastro Ambiental Rural',
      excerpt: 'Guia completo sobre o Cadastro Ambiental Rural e os passos para regularizar sua propriedade.',
      category: 'Direito Ambiental',
      author: 'Dra. Juliana Costa',
      date: '28 de Abril, 2025',
      readTime: '9 min',
      slug: 'car-cadastro-ambiental-rural',
      categorySlug: 'direito-ambiental'
    },
    {
      id: 6,
      title: 'Sucessão em Propriedades Rurais: Planejamento e Desafios',
      excerpt: 'Como planejar a sucessão familiar em propriedades rurais e evitar conflitos futuros.',
      category: 'Direito Sucessório',
      author: 'Dr. Marcelo Alves',
      date: '25 de Abril, 2025',
      readTime: '8 min',
      slug: 'sucessao-propriedades-rurais',
      categorySlug: 'direito-sucessorio'
    },
    {
      id: 7,
      title: 'Crédito Rural: Direitos e Obrigações do Produtor',
      excerpt: 'Conheça os principais aspectos jurídicos relacionados ao crédito rural e como proteger seus direitos.',
      category: 'Crédito Rural',
      author: 'Dra. Fernanda Lima',
      date: '22 de Abril, 2025',
      readTime: '6 min',
      slug: 'credito-rural-direitos-obrigacoes',
      categorySlug: 'credito-rural'
    },
    {
      id: 8,
      title: 'Licenciamento Ambiental para Atividades Rurais',
      excerpt: 'Saiba quais atividades rurais necessitam de licenciamento ambiental e como obter as licenças necessárias.',
      category: 'Direito Ambiental',
      author: 'Dr. Ricardo Souza',
      date: '18 de Abril, 2025',
      readTime: '7 min',
      slug: 'licenciamento-ambiental-atividades-rurais',
      categorySlug: 'direito-ambiental'
    },
    {
      id: 9,
      title: 'Contratos de Parceria Agrícola: Vantagens e Riscos',
      excerpt: 'Análise jurídica dos contratos de parceria agrícola e como estruturá-los para evitar problemas futuros.',
      category: 'Contratos Rurais',
      author: 'Dr. André Martins',
      date: '15 de Abril, 2025',
      readTime: '8 min',
      slug: 'contratos-parceria-agricola',
      categorySlug: 'contratos-rurais'
    },
    {
      id: 10,
      title: 'ITR: Como Declarar Corretamente o Imposto Territorial Rural',
      excerpt: 'Guia prático sobre a declaração do ITR e como evitar problemas com a Receita Federal.',
      category: 'Tributação Rural',
      author: 'Dra. Camila Rocha',
      date: '12 de Abril, 2025',
      readTime: '9 min',
      slug: 'itr-imposto-territorial-rural',
      categorySlug: 'tributacao-rural'
    }
  ];

  const categories = [
    { name: 'Todos', slug: 'todos' },
    { name: 'Direito Agrário', slug: 'direito-agrario' },
    { name: 'Regularização Fundiária', slug: 'regularizacao-fundiaria' },
    { name: 'Contratos Rurais', slug: 'contratos-rurais' },
    { name: 'Direito Ambiental', slug: 'direito-ambiental' },
    { name: 'Direito Sucessório', slug: 'direito-sucessorio' },
    { name: 'Tributação Rural', slug: 'tributacao-rural' },
    { name: 'Crédito Rural', slug: 'credito-rural' }
  ];

  // Filter posts based on search term and active category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || post.categorySlug === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // Update active category when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        {/* Header */}
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

        {/* Search and Filter */}
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

        {/* Blog Posts */}
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
                <div className="relative h-52 overflow-hidden">
                  <img  
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={`Imagem ilustrativa para o artigo: ${post.title}`}
                   src="https://images.unsplash.com/photo-1617214933572-9cc174b0b36b" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-rural-darkgreen text-rural-beige px-3 py-1 rounded-lg text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-rural-green transition-colors duration-300">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-rural-darkgreen/80 mb-4">
                    {post.excerpt}
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

        {/* Pagination */}
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
                // Show current page, first page, last page, and one page before and after current
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
                  // Show ellipsis
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
