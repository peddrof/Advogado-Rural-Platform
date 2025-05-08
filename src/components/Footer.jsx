
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rural-darkgreen text-rural-beige pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="inline-block">
            <img  
            style="width: 100px; height: auto;"
            alt="Logo Guilherme Medeiros Acessoria em Agronegocio"
           src="https://iili.io/3eD3Cp2.md.png" />
            </Link>
            <p className="text-rural-beige/80 mt-4">
              Assessoria jurídica especializada para o homem do campo, defendendo seus direitos e interesses com conhecimento e dedicação.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/profile.php?id=100002139094007&ref=ig_profile_ac" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/advogadorural/" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/guilherme-medeiros-a3546051/?originalSubdomain=br" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-serif font-bold">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="#" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Categories Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-serif font-bold">Categorias</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Direito Agrário
                </Link>
              </li>
              <li>
                <Link to="#" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Regularização Fundiária
                </Link>
              </li>
              <li>
                <Link to="#" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Contratos Rurais
                </Link>
              </li>
              <li>
                <Link to="#" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Direito Ambiental
                </Link>
              </li>
              <li>
                <Link to="#" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  Legislação Rural
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-serif font-bold">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 flex-shrink-0 text-rural-beige/80" />
                <span className="text-rural-beige/80">
                  Av. Presidente Vargas, 1000, Centro<br />
                  Cidade Verde, SP, 12345-678
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0 text-rural-beige/80" />
                <a href="tel:+551199999999" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0 text-rural-beige/80" />
                <a href="mailto:contato@advogadorural.com.br" className="text-rural-beige/80 hover:text-rural-beige transition-colors duration-300">
                  contato@advogadorural.com.br
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-rural-green/30 mt-12 pt-8 text-center text-rural-beige/60">
          <p>© {currentYear} Advogado Rural. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
