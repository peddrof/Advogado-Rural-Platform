import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Shield } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <BookOpen className="w-10 h-10 text-rural-beige" />,
      title: 'Conhecimento Especializado',
      description: 'Oferecemos conteúdo jurídico de alta qualidade, elaborado por especialistas em direito rural e agronegócio.'
    },
    {
      icon: <Users className="w-10 h-10 text-rural-beige" />,
      title: 'Foco no Produtor Rural',
      description: 'Nosso compromisso é fornecer informações relevantes e práticas que realmente ajudem o homem do campo.'
    },
    {
      icon: <Shield className="w-10 h-10 text-rural-beige" />,
      title: 'Segurança Jurídica',
      description: 'Trabalhamos para que nossos leitores possam tomar decisões com base em informações confiáveis e atualizadas.'
    },
    {
      icon: <Award className="w-10 h-10 text-rural-beige" />,
      title: 'Excelência',
      description: 'Buscamos constantemente aprimorar nosso conteúdo para atender às necessidades do setor rural.'
    }
  ];

  const team = [
    {
      name: 'Autor A',
      role: 'Especialista em Direito Agrário',
      bio: 'Contribui com artigos sobre legislação fundiária e regularização de terras.'
    },
    {
      name: 'Autor B',
      role: 'Especialista em Contratos Rurais',
      bio: 'Escreve sobre contratos de arrendamento, parceria rural e outras modalidades.'
    },
    {
      name: 'Autor C',
      role: 'Especialista em Direito Ambiental',
      bio: 'Aborda temas como licenciamento ambiental e compliance no agronegócio.'
    }
  ];

  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rural-darkgreen mb-4">
            Sobre o Advogado Rural
          </h1>
          <p className="text-rural-darkgreen/80 max-w-2xl mx-auto">
            Conheça nossa missão de fornecer informações jurídicas especializadas para o homem do campo e profissionais do agronegócio.
          </p>
        </motion.div>

        {/* About section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl overflow-hidden"
          >
            <img  
              className="w-full h-full object-cover"
              alt="Equipe de advogados do Advogado Rural"
              src="https://images.unsplash.com/photo-1669619732510-f74abcc5ee75" 
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-serif font-bold text-rural-darkgreen mb-6">
              Nossa História
            </h2>
            <div className="space-y-4 text-rural-darkgreen/80">
              <p>
                O Advogado Rural foi criado com o propósito de compartilhar conhecimento jurídico especializado em direito rural e agronegócio, atendendo à necessidade de informações acessíveis e confiáveis para o setor.
              </p>
              <p>
                Desde 2018, nossa plataforma se dedica a publicar artigos e textos que abordam temas jurídicos relevantes para produtores rurais, empresários do agronegócio e profissionais da área, ajudando-os a compreender melhor seus direitos e deveres.
              </p>
              <p>
                Nosso objetivo é contribuir para o fortalecimento do setor rural brasileiro, oferecendo conteúdo de qualidade que auxilie na tomada de decisões e no enfrentamento dos desafios jurídicos do dia a dia.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif font-bold text-rural-darkgreen mb-6 text-center">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-rural-darkgreen rounded-2xl p-6 text-center"
              >
                <div className="bg-rural-green/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-rural-beige mb-3">
                  {value.title}
                </h3>
                <p className="text-rural-beige/80">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif font-bold text-rural-darkgreen mb-6 text-center">
            Nossos Colaboradores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-rural-darkbeige/20 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-rural-green flex items-center justify-center text-rural-beige font-bold text-3xl mx-auto mb-4">
                  {member.name.split(' ')[0].charAt(0)}
                  {member.name.split(' ')[1]?.charAt(0)}
                </div>
                <h3 className="text-xl font-serif font-bold text-rural-darkgreen mb-2">
                  {member.name}
                </h3>
                <p className="text-rural-green font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-rural-darkgreen/80">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-rural-beige rounded-3xl p-8 md:p-12 mb-20"
        >
          <h2 className="text-3xl font-serif font-bold text-rural-darkgreen mb-10 text-center">
            Nosso Impacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-rural-darkgreen mb-2">5+</p>
              <p className="text-rural-darkgreen/80">Anos de experiência</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-rural-darkgreen mb-2">200+</p>
              <p className="text-rural-darkgreen/80">Artigos publicados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-rural-darkgreen mb-2">10k+</p>
              <p className="text-rural-darkgreen/80">Leitores mensais</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-rural-darkgreen mb-2">27</p>
              <p className="text-rural-darkgreen/80">Estados atendidos</p>
            </div>
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif font-bold text-rural-darkgreen mb-6">
            Junte-se à Nossa Comunidade
          </h2>
          <p className="text-rural-darkgreen/80 max-w-2xl mx-auto mb-8">
            Acompanhe nosso blog e fique por dentro das novidades jurídicas que impactam o setor rural e agronegócio brasileiro.
          </p>
          <div className="flex justify-center">
            <a href="/blog" className="btn-primary mr-4">
              Explorar o Blog
            </a>
            <a href="/contato" className="bg-white/20 backdrop-blur-sm text-rural-darkgreen border border-rural-darkgreen/30 hover:bg-white/30 transition-colors duration-300 rounded-xl px-6 py-3 font-medium">
              Entre em Contato
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;