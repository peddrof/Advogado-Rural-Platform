
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Agradecemos seu contato. Responderemos em breve.",
        duration: 5000,
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

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
            Entre em Contato
          </h1>
          <p className="text-rural-darkgreen/80 max-w-2xl mx-auto">
            Estamos à disposição para esclarecer suas dúvidas jurídicas relacionadas ao setor rural.
          </p>
        </motion.div>

        {/* Contact info and form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-rural-darkgreen text-rural-beige rounded-2xl p-8 h-full">
              <h2 className="text-2xl font-serif font-bold mb-6">Informações de Contato</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Endereço</h3>
                    <p className="text-rural-beige/80">
                      Av. Presidente Vargas, 1000<br />
                      Centro, Cidade Verde - SP<br />
                      CEP: 12345-678
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Telefone</h3>
                    <p className="text-rural-beige/80">
                      <a href="tel:+551199999999" className="hover:text-rural-beige transition-colors duration-300">
                        (11) 99999-9999
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">E-mail</h3>
                    <p className="text-rural-beige/80">
                      <a href="mailto:contato@advogadorural.com.br" className="hover:text-rural-beige transition-colors duration-300">
                        contato@advogadorural.com.br
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-bold mb-4">Horário de Atendimento</h3>
                <p className="text-rural-beige/80 mb-2">Segunda a Sexta: 9h às 18h</p>
                <p className="text-rural-beige/80">Sábados: 9h às 12h</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-rural-darkbeige/20">
              <h2 className="text-2xl font-serif font-bold text-rural-darkgreen mb-6">Envie uma Mensagem</h2>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-rural-darkgreen mb-2">Mensagem Enviada!</h3>
                  <p className="text-rural-darkgreen/80 text-center">
                    Agradecemos seu contato. Nossa equipe responderá em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-rural-darkgreen font-medium mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-rural-beige/50 text-rural-darkgreen rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rural-green/30"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-rural-darkgreen font-medium mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-rural-beige/50 text-rural-darkgreen rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rural-green/30"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-rural-darkgreen font-medium mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-rural-beige/50 text-rural-darkgreen rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rural-green/30"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-rural-darkgreen font-medium mb-2">
                        Assunto *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-rural-beige/50 text-rural-darkgreen rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rural-green/30"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-rural-darkgreen font-medium mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-rural-beige/50 text-rural-darkgreen rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rural-green/30"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <span className="inline-block h-5 w-5 border-2 border-rural-beige/30 border-t-rural-beige rounded-full animate-spin"></span>
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send size={16} className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-serif font-bold text-rural-darkgreen mb-6">
            Nossa Localização
          </h2>
          <div className="rounded-2xl overflow-hidden h-[400px] shadow-sm border border-rural-darkbeige/20">
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-46.65%2C-23.56%2C-46.63%2C-23.54&amp;layer=mapnik" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              aria-hidden="false" 
              tabIndex="0"
            ></iframe>
          </div>
        </motion.div>

        {/* FAQ section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-serif font-bold text-rural-darkgreen mb-6">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-rural-darkbeige/20">
              <h3 className="text-lg font-bold text-rural-darkgreen mb-2">
                Quais áreas do direito rural vocês atendem?
              </h3>
              <p className="text-rural-darkgreen/80">
                Atendemos diversas áreas do direito rural, incluindo regularização fundiária, contratos rurais, direito ambiental, direito sucessório no campo, tributação rural, entre outras.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-rural-darkbeige/20">
              <h3 className="text-lg font-bold text-rural-darkgreen mb-2">
                Vocês atendem em todo o Brasil?
              </h3>
              <p className="text-rural-darkgreen/80">
                Sim, oferecemos atendimento em todo o território nacional, com advogados parceiros em diversos estados brasileiros.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-rural-darkbeige/20">
              <h3 className="text-lg font-bold text-rural-darkgreen mb-2">
                Como posso agendar uma consulta jurídica?
              </h3>
              <p className="text-rural-darkgreen/80">
                Você pode agendar uma consulta jurídica através do formulário de contato nesta página, por telefone ou e-mail. Nossa equipe entrará em contato para confirmar o agendamento.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-rural-darkbeige/20">
              <h3 className="text-lg font-bold text-rural-darkgreen mb-2">
                Vocês oferecem consultoria online?
              </h3>
              <p className="text-rural-darkgreen/80">
                Sim, oferecemos consultoria jurídica online para clientes de todo o Brasil, através de videoconferência ou telefone, proporcionando comodidade e praticidade.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
