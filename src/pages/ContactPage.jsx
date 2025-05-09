import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { db } from './firebas';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const faqData = [
  {
    category: 'Geral',
    questions: [
      {
        question: 'Quais serviços jurídicos específicos vocês oferecem para proprietários rurais?',
        answer: 'Oferecemos serviços jurídicos personalizados para proprietários rurais, incluindo assistência com registros de imóveis, disputas de divisas, arrendamentos rurais e conformidade com regulamentações ambientais específicas para propriedades rurais no Brasil.'
      },
      {
        question: 'Como posso agendar uma consulta com seu escritório?',
        answer: 'Você pode agendar uma consulta ligando para o nosso número de telefone, enviando um e-mail para guilherme.medeiros@wba.adv.br ou preenchendo o formulário de contato nesta página. Oferecemos consultas presenciais e virtuais, disponíveis de segunda a sexta-feira, das 8h30 às 18h.'
      },
      {
        question: 'Quais são os horários de funcionamento do escritório de Porto Alegre?',
        answer: 'Nosso escritório em Porto Alegre funciona de segunda a sexta-feira, das 8h30 às 12h e das 13h30 às 18h. Estamos fechados nos finais de semana e feriados nacionais.'
      },
      {
        question: 'Vocês oferecem atendimento jurídico em outros idiomas além do português?',
        answer: 'Sim, oferecemos consultas jurídicas em português e inglês para atender clientes internacionais e aqueles que preferem o atendimento em inglês.'
      }
    ]
  },
  {
    category: 'Direito Rural',
    questions: [
      {
        question: 'Quais questões jurídicas são abrangidas pelo direito rural brasileiro?',
        answer: 'O direito rural brasileiro trata de questões como propriedade e registro de terras (por exemplo, CAR e conformidade com o INCRA), contratos agrícolas, outorga de uso de água e cumprimento do Código Florestal.'
      },
      {
        question: 'Como o direito rural no Brasil difere das estruturas jurídicas urbanas?',
        answer: 'O direito rural no Brasil foca em aspectos específicos como reforma agrária, tributação de terras rurais (ITR) e proteções ambientais previstas no Código Florestal, que normalmente não se aplicam às áreas urbanas regidas por códigos municipais e civis.'
      },
      {
        question: 'Quais são os desafios jurídicos mais frequentes para proprietários rurais no Brasil?',
        answer: 'Desafios comuns incluem disputas de divisas, regularização de títulos de propriedade junto ao INCRA, conformidade com leis ambientais (como Áreas de Preservação Permanente) e obtenção de outorga de uso de água para irrigação.'
      },
      {
        question: 'Como seu escritório pode ajudar na regularização de imóveis rurais?',
        answer: 'Orientamos os clientes em todo o processo de regularização de imóveis rurais, incluindo a obtenção do Cadastro Ambiental Rural (CAR), regularização de títulos de propriedade e conformidade com as normas federais e estaduais.'
      }
    ]
  },
  {
    category: 'Serviços',
    questions: [
      {
        question: 'Que suporte jurídico vocês oferecem para contratos do agronegócio?',
        answer: 'Elaboramos, revisamos e negociamos contratos do agronegócio, incluindo arrendamentos rurais, contratos de fornecimento e parcerias, garantindo conformidade com as regulamentações agrícolas brasileiras e proteção dos seus interesses.'
      },
      {
        question: 'Vocês auxiliam na conformidade ambiental de propriedades rurais?',
        answer: 'Sim, auxiliamos na conformidade ambiental, incluindo o cumprimento do Código Florestal, obtenção de licenças ambientais e gestão de Reserva Legal e Áreas de Preservação Permanente.'
      },
      {
        question: 'Vocês atuam em casos de disputas fundiárias rurais?',
        answer: 'Nossa equipe é especializada na resolução de disputas fundiárias rurais, incluindo conflitos de divisas, ações de usucapião e disputas sobre direitos de uso da terra, por meio de negociação ou ação judicial.'
      },
      {
        question: 'Quais serviços de planejamento sucessório vocês oferecem para famílias rurais?',
        answer: 'Oferecemos serviços de planejamento sucessório voltados para famílias rurais, incluindo elaboração de testamentos, constituição de trusts e planejamento de sucessão, para garantir a transferência tranquila de propriedades e ativos rurais, minimizando encargos tributários.'
      }
    ]
  },
  {
    category: 'Sobre Nós',
    questions: [
      {
        question: 'Qual é a experiência do escritório em questões jurídicas rurais?',
        answer: 'Com mais de 20 anos de experiência, nosso escritório já conduziu centenas de casos jurídicos rurais, desde regularização fundiária até disputas complexas do agronegócio, atendendo clientes em todo o Brasil.'
      },
      {
        question: 'Qual é a missão da WBA Advogados?',
        answer: 'A WBA Advogados é dedicada a oferecer soluções jurídicas especializadas para o setor rural, protegendo os direitos dos nossos clientes e promovendo práticas agrícolas sustentáveis por meio de um atendimento personalizado.'
      },
      {
        question: 'Quem lidera a prática de direito rural do escritório?',
        answer: 'Nossa prática de direito rural é liderada por Guilherme Medeiros, advogado experiente com ampla expertise em direito agrário brasileiro, apoiado por uma equipe de profissionais jurídicos especializados.'
      },
      {
        question: 'O que torna a WBA Advogados única em serviços jurídicos rurais?',
        answer: 'Nosso escritório combina profundo conhecimento do direito rural brasileiro, uma abordagem centrada no cliente e compromisso com a resolução eficiente de desafios jurídicos complexos, tornando-nos um parceiro confiável para proprietários rurais e empresas do agronegócio.'
      }
    ]
  }
];


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
  const [activeTab, setActiveTab] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp()
      });
      setIsSubmitted(true);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Agradecemos seu contato. Responderemos em breve.",
        duration: 5000,
      });
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
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAccordion = (index) => {
    setExpandedQuestions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="container-custom max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rural-darkgreen mb-4">
            Entre em Contato
          </h1>
          <p className="text-rural-darkgreen/80 max-w-2xl mx-auto">
            Estamos à disposição para esclarecer suas dúvidas jurídicas relacionadas ao setor rural.
          </p>
        </motion.div>

        {/* Contact info and form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
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
                      Av. Diário de Notícias, 400, <br/>
                      sala 2113, Barra Shopping Sul, <br/>
                      Ed. Diamond Tower, Cristal, <br/>
                      Porto Alegre, RS, 90810-080
                    </p>
                  </div>
                </div>
              
                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">E-mail</h3>
                    <p className="text-rural-beige/80">
                      <a href="mailto:guilherme.medeiros@wba.adv.br" className="hover:text-rural-beige transition-colors duration-300">
                        guilherme.medeiros@wba.adv.br
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-bold mb-4">Horário de Atendimento</h3>
                <p className="text-rural-beige/80 mb-2">Segunda a Sexta: 8h30 às 12h e 13h30 às 18h</p>
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
          className="mb-20"
        >
          <h2 className="text-2xl font-serif font-bold text-rural-darkgreen mb-6 text-center">
            Nossa Localização
          </h2>
          <div className="rounded-2xl overflow-hidden h-[400px] shadow-sm border border-rural-darkbeige/20 max-w-5xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.8546716343376!2d-51.2484133239869!3d-30.084669674903388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951978a0b6c805c9%3A0xb571b13564864657!2sDiamond%20Tower!5e1!3m2!1spt-BR!2sbr!4v1746749199615!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of Diamond Tower, Porto Alegre"
            ></iframe>
          </div>
        </motion.div>

        {/* FAQ section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="faq-section max-w-2xl mx-auto mb-20"
        >
          <div className="title-holder text-center">
            <h2 className="text-3xl font-serif font-bold text-rural-darkgreen mb-4">
              Perguntas Frequentes
            </h2>
            <div className="subtitle-holder">
              <div className="text-rural-darkgreen/80">
                Encontre respostas detalhadas para dúvidas comuns sobre nossos serviços jurídicos para o setor rural.
              </div>
            </div>
          </div>
          <div className="faq-grid-holder mt-8">
            <div className="faq-tab w-tabs">
              <div className="faq-tab-button-holder w-tab-menu flex flex-col md:flex-row gap-2 md:gap-4 mb-8 justify-center">
                {faqData.map((category, index) => (
                  <button
                    key={index}
                    className={`tab-button px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                      activeTab === index ? 'bg-rural-darkgreen text-rural-beige' : 'bg-rural-beige text-rural-darkgreen'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
              <div className="w-tab-content">
                <div className="faq-items-holder space-y-4">
                  {faqData[activeTab].questions.map((q, index) => (
                    <div key={index} className="faq-item bg-white rounded-xl p-4 shadow-sm border border-rural-darkbeige/20">
                      <div className="faq flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion(index)}>
                        <div className="faq-title text-lg font-bold text-rural-darkgreen">{q.question}</div>
                        <div className="faq-icon-holder">
                          <ChevronDown className={`w-5 h-5 text-rural-darkgreen transition-transform duration-300 ${prev => expandedQuestions.includes(index) ? 'transform rotate-180' : ''}`} />
                        </div>
                      </div>
                      {expandedQuestions.includes(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="faq-answer text-rural-darkgreen/80 mt-2"
                        >
                          {q.answer}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;