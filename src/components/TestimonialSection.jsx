
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'João Silva',
      role: 'Produtor Rural',
      content: 'O blog do Advogado Rural tem sido uma fonte valiosa de informações para minha propriedade. Os artigos são claros e me ajudaram a resolver questões jurídicas que eu nem sabia que existiam.',
      rating: 5
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      role: 'Engenheira Agrônoma',
      content: 'Como profissional do agronegócio, preciso estar atualizada sobre as questões jurídicas. Este blog se tornou minha referência para entender as leis que afetam o setor rural.',
      rating: 5
    },
    {
      id: 3,
      name: 'Carlos Santos',
      role: 'Pecuarista',
      content: 'Graças aos artigos sobre regularização fundiária, consegui resolver um problema antigo em minha propriedade. Conteúdo de qualidade e muito prático.',
      rating: 4
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
    <section className="py-16 bg-rural-beige">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">O Que Dizem Nossos Leitores</h2>
          <p className="text-rural-darkgreen/80 max-w-2xl mx-auto">
            Confira os depoimentos de quem já utiliza nosso conteúdo para tomar melhores decisões jurídicas no campo.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={item}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-rural-darkbeige/20"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18} 
                    className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                  />
                ))}
              </div>
              <p className="text-rural-darkgreen/80 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-rural-green flex items-center justify-center text-rural-beige font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-rural-darkgreen">{testimonial.name}</h4>
                  <p className="text-sm text-rural-darkgreen/70">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
