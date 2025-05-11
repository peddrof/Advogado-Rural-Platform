
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      title: 'Política Agrícola',
      description: 'Ações do governo para apoiar e organizar o setor agropecuário.',
      icon: '🌾',
      slug: 'politica-agricola'
    },
    {
      id: 2,
      title: 'Crédito Rural',
      description: 'Financiamento com condições especiais para a produção no campo.',
      icon: '💰',
      slug: 'credito-rural'
    },
    {
      id: 3,
      title: 'Contratos Rurais',
      description: 'Acordos legais que regem atividades agropecuárias.',
      icon: '🤝',
      slug: 'contratos-rurais'
    },
    {
      id: 4,
      title: 'Direito Agrário',
      description: 'Regras que regulam a posse, uso e propriedade da terra rural.',
      icon: '📝',
      slug: 'direito-agrario'
    }
  ];

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
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Explore por Categorias</h2>
          <p className="text-rural-darkgreen/80 max-w-2xl mx-auto">
            Navegue pelos tópicos jurídicos mais relevantes para o setor rural e encontre informações especializadas para sua atividade.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={item}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-rural-darkbeige/20"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-serif font-bold mb-2">{category.title}</h3>
              <p className="text-rural-darkgreen/80 mb-4">{category.description}</p>
              <Link 
                to={`/blog?categoria=${category.slug}`}
                className="inline-flex items-center text-rural-darkgreen font-medium hover:text-rural-green transition-colors duration-300"
              >
                Ver artigos
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
