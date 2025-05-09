import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { db } from './firebas';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        question: 'What services does your firm provide?',
        answer: 'We provide a wide range of legal services tailored to the rural sector, including land use and zoning, agricultural law, environmental compliance, and more.'
      },
      {
        question: 'How can I contact your firm?',
        answer: 'You can contact us via phone, email, or by filling out the form on our contact page. Our office hours are Monday to Friday, 9 AM to 5 PM.'
      },
      {
        question: 'What are your office hours?',
        answer: 'Our office is open from 9 AM to 5 PM, Monday through Friday. We are closed on weekends and public holidays.'
      },
      {
        question: 'Do you offer consultations in English?',
        answer: 'Yes, we offer consultations in both Portuguese and English to accommodate our diverse clientele.'
      }
    ]
  },
  {
    category: 'Rural Law',
    questions: [
      {
        question: 'What is rural law?',
        answer: 'Rural law encompasses legal issues specific to rural areas, including land use, agricultural regulations, water rights, and environmental laws.'
      },
      {
        question: 'How does rural law differ from urban law?',
        answer: 'Rural law often deals with unique challenges such as land tenure, agricultural subsidies, and environmental conservation, which are less prevalent in urban settings.'
      },
      {
        question: 'What are common legal issues in rural areas?',
        answer: 'Common issues include land disputes, water rights, agricultural contracts, and compliance with environmental regulations.'
      },
      {
        question: 'How can your firm help with rural legal matters?',
        answer: 'Our firm has extensive experience in rural law and can provide expert advice and representation in all aspects of rural legal issues.'
      }
    ]
  },
  {
    category: 'Services',
    questions: [
      {
        question: 'What types of legal services do you offer?',
        answer: 'We offer services in land use and zoning, agricultural law, environmental law, estate planning, and more.'
      },
      {
        question: 'Do you provide legal advice for agricultural businesses?',
        answer: 'Yes, we specialize in advising agricultural businesses on compliance, contracts, and regulatory issues.'
      },
      {
        question: 'Can you assist with land disputes?',
        answer: 'Absolutely, we have a dedicated team for handling land disputes, including boundary issues and ownership conflicts.'
      },
      {
        question: 'Do you offer estate planning services?',
        answer: 'Yes, we provide comprehensive estate planning services to help you manage and protect your assets.'
      }
    ]
  },
  {
    category: 'About Us',
    questions: [
      {
        question: 'How long has your firm been in operation?',
        answer: 'Our firm has been serving the rural community for over 20 years, providing trusted legal services.'
      },
      {
        question: 'What is your firm\'s mission?',
        answer: 'Our mission is to provide high-quality legal services to the rural sector, ensuring our clients\' rights and interests are protected.'
      },
      {
        question: 'Who are the key members of your team?',
        answer: 'Our team consists of experienced attorneys specializing in various aspects of rural law, including [Attorney Names].'
      },
      {
        question: 'What sets your firm apart from others?',
        answer: 'Our deep understanding of rural issues, combined with our commitment to personalized service, sets us apart from other firms.'
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
  const [expanded, setExpanded] = useState(null);

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
      console.error('Error submitting form:', error); // Added for debugging
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
    setExpanded(expanded === index ? null : index);
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
                <p className="text-rural-beige/80 mb-2">Segunda a Sexta: <br/>8h30 às 12h e <br/>13h30 às 18h</p>
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
          className="faq-section"
        >
          <div className="title-holder">
            <h2 className="text-3xl font-serif font-bold text-rural-darkgreen mb-4">
              Perguntas Frequentes
            </h2>
            <div className="subtitle-holder">
              <div className="text-rural-darkgreen/80">
                Encontre respostas para as dúvidas mais comuns sobre nossos serviços e especializações.
              </div>
            </div>
          </div>
          <div className="faq-grid-holder">
            <div className="faq-tab w-tabs">
              <div className="faq-tab-button-holder w-tab-menu flex flex-col md:flex-row gap-2 md:gap-4 mb-8">
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
                          <ChevronDown className={`w-5 h-5 text-rural-darkgreen transition-transform duration-300 ${expanded === index ? 'transform rotate-180' : ''}`} />
                        </div>
                      </div>
                      {expanded === index && (
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