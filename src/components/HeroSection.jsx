import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-36 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-24">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute"></div>
          
          <img  
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
            alt="Paisagem rural com fazenda e plantações com homem em frente"
            src="https://iili.io/3etrokQ.md.png"
          />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 sm:p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 sm:mb-6">
                Assessoria Jurídica Especializada para o Homem do Campo
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl">
                Acompanhe nosso blog e fique por dentro das novidades jurídicas que impactam o setor rural e agronegócio brasileiro.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/blog" className="btn-primary flex items-center justify-center">
                  Explorar Artigos
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link to="/contato" className="btn-secondary flex items-center justify-center">
                  Fale Conosco
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;