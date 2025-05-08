
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-9xl font-serif font-bold text-rural-darkgreen mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-rural-darkgreen mb-6">
            Página Não Encontrada
          </h2>
          <p className="text-rural-darkgreen/80 max-w-lg mb-8">
            A página que você está procurando não existe ou foi removida. 
            Por favor, verifique o endereço ou retorne à página inicial.
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar para a Página Inicial
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
