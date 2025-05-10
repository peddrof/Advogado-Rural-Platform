import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, WhatsApp, Facebook, Mail, Linkedin, Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { articles } from '../lib/articles'; // Import centralized articles 

const ArticlePage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    const foundArticle = articles.find(article => article.slug === slug);
    
    if (foundArticle) {
      setArticle(foundArticle);
      const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
      const currentIndex = sortedArticles.findIndex(a => a.slug === slug);
      const previousArticles = sortedArticles.slice(Math.max(0, currentIndex + 1), currentIndex + 3).reverse();
      setRelatedPosts(previousArticles);
    }
    
    setLoading(false);
    window.scrollTo(0, 0);
  }, [slug]);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O link do artigo foi copiado para a área de transferência.",
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 3000);
    });
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container-custom">
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-rural-green/30 border-t-rural-green rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-3xl font-serif font-bold text-rural-darkgreen mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-rural-darkgreen/80 mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Link to="/blog" className="btn-primary">
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center text-rural-darkgreen hover:text-rural-green transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar para o Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-block bg-rural-darkgreen text-rural-beige px-3 py-1 rounded-lg text-sm font-medium mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-rural-darkgreen mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-rural-darkgreen/70 mb-6">
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{article.readTime} de leitura</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="rounded-3xl overflow-hidden">
            <img  
              className="w-full h-[300px] md:h-[500px] object-cover"
              alt={`Imagem ilustrativa para o artigo: ${article.title}`}
              src={article.image}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-rural-darkgreen prose-p:text-rural-darkgreen/90 prose-a:text-rural-green prose-a:no-underline hover:prose-a:underline prose-strong:text-rural-darkgreen prose-li:text-rural-darkgreen/90 prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rural-darkbeige/20 mb-8">
              <h3 className="text-xl font-serif font-bold mb-4">Sobre o Autor</h3>
              <div className="flex items-center mb-4">
                <img
                  src={article.authorPhoto}
                  alt={article.author}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-rural-darkgreen">{article.author}</h4>
                  <p className="text-sm text-rural-darkgreen/70">{article.authorRole}</p>
                </div>
              </div>
              <p className="text-rural-darkgreen/80">
                Especialista com vasta experiência em questões jurídicas relacionadas ao setor rural e agronegócio.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rural-darkbeige/20 mb-8">
              <h3 className="text-xl font-serif font-bold mb-4">Compartilhar artigo</h3>
              <div className="flex space-x-3">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-rural-beige hover:bg-rural-darkbeige text-rural-darkgreen p-3 rounded-xl transition-colors duration-300"
                >
                  <WhatsApp size={20} />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-rural-beige hover:bg-rural-darkbeige text-rural-darkgreen p-3 rounded-xl transition-colors duration-300"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`} 
                  className="bg-rural-beige hover:bg-rural-darkbeige text-rural-darkgreen p-3 rounded-xl transition-colors duration-300"
                >
                  <Mail size={20} />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-rural-beige hover:bg-rural-darkbeige text-rural-darkgreen p-3 rounded-xl transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-rural-darkbeige/20 mb-8">
                <h3 className="text-xl font-serif font-bold mb-4">Artigos relacionados</h3>
                <div className="space-y-6">
                  {relatedPosts.map((post) => (
                    <div key={post.id} className="group">
                      <Link to={`/blog/${post.slug}`} className="block">
                        <h4 className="font-bold group-hover:text-rural-green transition-colors duration-300 mb-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-sm text-rural-darkgreen/70">
                          <Calendar size={14} className="mr-1" />
                          <span>{post.date}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;