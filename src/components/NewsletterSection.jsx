import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { db } from './firebase'; // Import Firebase Firestore
import { collection, addDoc } from 'firebase/firestore';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add email to Firestore
      await addDoc(collection(db, 'subscribers'), {
        email: email,
        timestamp: new Date(),
      });

      setEmail('');
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá nossas atualizações no e-mail informado.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error adding email to Firestore:', error);
      toast({
        title: "Erro ao inscrever",
        description: "Ocorreu um erro. Por favor, tente novamente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-rural-darkgreen">
      <div className="container-custom">
        <div className="bg-rural-green rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-rural-beige mb-4">
                Receba Novidades Jurídicas
              </h2>
              <p className="text-rural-beige/90 mb-0">
                Inscreva-se em nossa newsletter e receba atualizações sobre legislação rural, dicas jurídicas e novidades do setor.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    required
                    className="flex-grow bg-rural-beige text-rural-darkgreen rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rural-beige/50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-rural-darkgreen text-rural-beige rounded-xl px-6 py-3 font-medium hover:bg-rural-darkgreen/90 transition-colors duration-300 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <span className="inline-block h-5 w-5 border-2 border-rural-beige/30 border-t-rural-beige rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Inscrever-se
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-rural-beige/70 text-sm">
                  Ao se inscrever, você concorda com nossa política de privacidade. Não enviamos spam.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;