
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import NewsletterSection from '@/components/NewsletterSection';

const ArticlePage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [copied, setCopied] = useState(false);

  // Simulated article data
  const articles = [
    {
      id: 1,
      title: 'Regularização Fundiária: O que você precisa saber',
      slug: 'regularizacao-fundiaria',
      category: 'Regularização Fundiária',
      author: 'Dr. Carlos Silva',
      authorRole: 'Advogado Especialista em Direito Agrário',
      date: '10 de Maio, 2025',
      readTime: '8 min',
      content: `
        <p>A regularização fundiária é um processo fundamental para garantir a segurança jurídica das propriedades rurais no Brasil. Neste artigo, vamos explorar os principais aspectos desse processo e como ele pode impactar sua propriedade.</p>
        
        <h2>O que é Regularização Fundiária?</h2>
        
        <p>A regularização fundiária é o conjunto de medidas jurídicas, urbanísticas, ambientais e sociais que visam à regularização de assentamentos irregulares e à titulação de seus ocupantes, garantindo o direito social à moradia, o pleno desenvolvimento das funções sociais da propriedade urbana e o direito ao meio ambiente ecologicamente equilibrado.</p>
        
        <p>No contexto rural, a regularização fundiária busca solucionar problemas relacionados à posse e propriedade da terra, proporcionando segurança jurídica aos produtores rurais e contribuindo para o desenvolvimento sustentável do campo.</p>
        
        <h2>Principais Etapas da Regularização Fundiária Rural</h2>
        
        <p>O processo de regularização fundiária rural envolve diversas etapas, que podem variar de acordo com a situação específica da propriedade. No entanto, de modo geral, as principais etapas são:</p>
        
        <ol>
          <li><strong>Identificação da área:</strong> Levantamento topográfico e georreferenciamento da propriedade.</li>
          <li><strong>Cadastro dos ocupantes:</strong> Identificação e cadastramento dos ocupantes da área.</li>
          <li><strong>Análise da documentação:</strong> Verificação dos documentos que comprovam a posse ou propriedade da terra.</li>
          <li><strong>Regularização ambiental:</strong> Adequação da propriedade às normas ambientais, incluindo o Cadastro Ambiental Rural (CAR).</li>
          <li><strong>Titulação:</strong> Emissão do título de propriedade ou outro instrumento que regularize a situação fundiária.</li>
        </ol>
        
        <h2>Benefícios da Regularização Fundiária</h2>
        
        <p>A regularização fundiária traz diversos benefícios para os produtores rurais, entre os quais podemos destacar:</p>
        
        <ul>
          <li>Segurança jurídica: Com a regularização, o produtor tem a garantia legal de que é o proprietário da terra, evitando disputas e conflitos.</li>
          <li>Acesso a crédito: Propriedades regularizadas têm mais facilidade para obter financiamentos e crédito rural.</li>
          <li>Valorização do imóvel: Terras regularizadas tendem a ter maior valor de mercado.</li>
          <li>Planejamento sucessório: A regularização facilita o processo de sucessão familiar na propriedade rural.</li>
          <li>Conformidade legal: Evita problemas com órgãos fiscalizadores e possíveis multas por irregularidades.</li>
        </ul>
        
        <h2>Desafios da Regularização Fundiária no Brasil</h2>
        
        <p>Apesar dos benefícios, a regularização fundiária no Brasil enfrenta diversos desafios, como:</p>
        
        <ul>
          <li>Burocracia excessiva: Processos longos e complexos que dificultam a regularização.</li>
          <li>Falta de documentação: Muitas propriedades rurais não possuem documentação adequada ou atualizada.</li>
          <li>Conflitos de interesse: Disputas por terras entre diferentes grupos sociais.</li>
          <li>Questões ambientais: Necessidade de conciliar a regularização fundiária com a preservação ambiental.</li>
        </ul>
        
        <h2>Legislação Aplicável</h2>
        
        <p>A regularização fundiária rural no Brasil é regida por diversas leis e normas, entre as quais destacam-se:</p>
        
        <ul>
          <li>Lei nº 11.952/2009: Dispõe sobre a regularização fundiária das ocupações incidentes em terras situadas em áreas da União, no âmbito da Amazônia Legal.</li>
          <li>Lei nº 13.465/2017: Estabelece normas gerais e procedimentos aplicáveis à Regularização Fundiária Urbana e Rural.</li>
          <li>Decreto nº 9.309/2018: Regulamenta a Lei nº 11.952/2009, para dispor sobre a regularização fundiária das áreas rurais.</li>
        </ul>
        
        <h2>Conclusão</h2>
        
        <p>A regularização fundiária é um processo essencial para garantir a segurança jurídica das propriedades rurais e promover o desenvolvimento sustentável do campo. Embora enfrente desafios, os benefícios da regularização são significativos e justificam os esforços necessários para sua realização.</p>
        
        <p>Se você possui uma propriedade rural e ainda não iniciou o processo de regularização fundiária, recomendamos buscar orientação jurídica especializada para avaliar sua situação específica e identificar os passos necessários para regularizar sua propriedade.</p>
      `,
      categorySlug: 'regularizacao-fundiaria'
    },
    {
      id: 2,
      title: 'Contratos de Arrendamento Rural: Direitos e Deveres',
      slug: 'contratos-arrendamento-rural',
      category: 'Contratos Rurais',
      author: 'Dra. Ana Oliveira',
      authorRole: 'Advogada Especialista em Contratos Agrários',
      date: '5 de Maio, 2025',
      readTime: '6 min',
      content: `
        <p>Os contratos de arrendamento rural são instrumentos jurídicos fundamentais para o desenvolvimento do agronegócio brasileiro. Neste artigo, vamos explorar os principais aspectos desses contratos, destacando os direitos e deveres das partes envolvidas.</p>
        
        <h2>O que é um Contrato de Arrendamento Rural?</h2>
        
        <p>O arrendamento rural é um contrato agrário pelo qual uma pessoa (arrendador) se obriga a ceder à outra (arrendatário), por tempo determinado ou não, o uso e gozo de imóvel rural, parte ou partes do mesmo, incluindo ou não outros bens, benfeitorias e/ou facilidades, com o objetivo de nele ser exercida atividade de exploração agrícola, pecuária, agroindustrial, extrativa ou mista, mediante certa retribuição ou aluguel.</p>
        
        <h2>Legislação Aplicável</h2>
        
        <p>Os contratos de arrendamento rural são regidos principalmente pelo Estatuto da Terra (Lei nº 4.504/1964) e pelo Decreto nº 59.566/1966, que regulamenta as Seções I, II e III do Capítulo IV do Título III da Lei nº 4.504/1964, além das disposições do Código Civil que não conflitem com a legislação especial.</p>
        
        <h2>Características Essenciais</h2>
        
        <p>Os contratos de arrendamento rural possuem algumas características essenciais que os diferenciam de outros tipos de contratos:</p>
        
        <ul>
          <li><strong>Prazo mínimo:</strong> Os contratos de arrendamento rural têm prazo mínimo de 3 anos para atividades de exploração de lavoura temporária e/ou de pecuária de pequeno e médio porte; 5 anos para atividades de exploração de lavoura permanente e/ou de pecuária de grande porte para cria, recria, engorda ou extração de matérias-primas de origem animal; e 7 anos para atividades de exploração florestal.</li>
          <li><strong>Preço:</strong> O preço do arrendamento não pode ser superior a 15% do valor cadastral do imóvel, incluídas as benfeitorias que entrarem na composição do contrato, salvo se o arrendamento for parcial e recair apenas em glebas selecionadas para fins de exploração intensiva de alta rentabilidade, caso em que o preço poderá ir até o limite de 30%.</li>
          <li><strong>Forma:</strong> Os contratos de arrendamento podem ser feitos por escrito ou verbalmente. No entanto, é altamente recomendável que sejam formalizados por escrito e registrados em cartório para garantir maior segurança jurídica às partes.</li>
        </ul>
        
        <h2>Direitos e Deveres do Arrendador</h2>
        
        <p>O arrendador, proprietário do imóvel rural, possui os seguintes direitos e deveres:</p>
        
        <h3>Direitos:</h3>
        <ul>
          <li>Receber o pagamento do arrendamento nas condições e prazos estabelecidos no contrato.</li>
          <li>Retomar o imóvel ao final do contrato ou em caso de rescisão por descumprimento contratual pelo arrendatário.</li>
          <li>Inspecionar o imóvel para verificar se o arrendatário está cumprindo suas obrigações.</li>
        </ul>
        
        <h3>Deveres:</h3>
        <ul>
          <li>Garantir ao arrendatário o uso e gozo do imóvel arrendado durante todo o prazo contratual.</li>
          <li>Respeitar o direito de preferência do arrendatário em caso de venda, renovação do contrato ou nova locação do imóvel.</li>
          <li>Pagar as taxas e impostos que incidam sobre o imóvel, salvo disposição contratual em contrário.</li>
        </ul>
        
        <h2>Direitos e Deveres do Arrendatário</h2>
        
        <p>O arrendatário, que explora economicamente o imóvel rural, possui os seguintes direitos e deveres:</p>
        
        <h3>Direitos:</h3>
        <ul>
          <li>Usar e gozar do imóvel rural conforme os termos do contrato.</li>
          <li>Ter preferência na renovação do contrato, na compra do imóvel ou em nova locação.</li>
          <li>Ser indenizado pelas benfeitorias necessárias e úteis que realizar no imóvel, desde que autorizadas pelo arrendador.</li>
        </ul>
        
        <h3>Deveres:</h3>
        <ul>
          <li>Pagar o preço do arrendamento nos prazos e condições estabelecidos no contrato.</li>
          <li>Usar o imóvel de acordo com o convencionado ou presumido, compatível com a natureza deste e com o fim a que se destina.</li>
          <li>Levar ao conhecimento do arrendador as turbações de terceiros.</li>
          <li>Devolver o imóvel, findo o contrato, nas condições em que o recebeu, salvo as deteriorações naturais ao uso regular.</li>
        </ul>
        
        <h2>Extinção do Contrato</h2>
        
        <p>O contrato de arrendamento rural pode ser extinto por diversas razões, entre as quais:</p>
        
        <ul>
          <li>Término do prazo contratual.</li>
          <li>Acordo entre as partes.</li>
          <li>Desapropriação do imóvel.</li>
          <li>Rescisão por descumprimento contratual.</li>
          <li>Impossibilidade da execução do contrato por caso fortuito ou força maior.</li>
        </ul>
        
        <h2>Conclusão</h2>
        
        <p>Os contratos de arrendamento rural são instrumentos importantes para o desenvolvimento do agronegócio brasileiro, permitindo que produtores sem terra própria possam exercer atividades rurais e que proprietários possam obter renda de suas terras sem a necessidade de explorá-las diretamente.</p>
        
        <p>Para garantir a segurança jurídica das partes envolvidas, é fundamental que esses contratos sejam elaborados com atenção às disposições legais e às particularidades de cada caso, preferencialmente com o auxílio de um advogado especializado em direito agrário.</p>
      `,
      categorySlug: 'contratos-rurais'
    },
    {
      id: 3,
      title: 'Código Florestal: Impactos para o Produtor Rural',
      slug: 'codigo-florestal-impactos',
      category: 'Direito Ambiental',
      author: 'Dr. Paulo Mendes',
      authorRole: 'Advogado Especialista em Direito Ambiental',
      date: '1 de Maio, 2025',
      readTime: '10 min',
      content: `
        <p>O Código Florestal Brasileiro (Lei nº 12.651/2012) é uma das principais legislações ambientais do país e tem impacto direto na atividade dos produtores rurais. Neste artigo, vamos analisar os principais aspectos dessa lei e como ela afeta o dia a dia no campo.</p>
        
        <h2>O que é o Código Florestal?</h2>
        
        <p>O Código Florestal Brasileiro é a lei que estabelece normas gerais sobre a proteção da vegetação, áreas de Preservação Permanente (APP) e as áreas de Reserva Legal (RL), a exploração florestal, o suprimento de matéria-prima florestal, o controle da origem dos produtos florestais e o controle e prevenção dos incêndios florestais, e prevê instrumentos econômicos e financeiros para o alcance de seus objetivos.</p>
        
        <p>A versão atual do Código Florestal foi instituída pela Lei nº 12.651, de 25 de maio de 2012, substituindo o antigo Código Florestal de 1965 (Lei nº 4.771/1965).</p>
        
        <h2>Principais Conceitos</h2>
        
        <h3>Área de Preservação Permanente (APP)</h3>
        
        <p>As Áreas de Preservação Permanente são áreas protegidas, cobertas ou não por vegetação nativa, com a função ambiental de preservar os recursos hídricos, a paisagem, a estabilidade geológica e a biodiversidade, facilitar o fluxo gênico de fauna e flora, proteger o solo e assegurar o bem-estar das populações humanas.</p>
        
        <p>São exemplos de APPs:</p>
        <ul>
          <li>Margens de rios, lagos e nascentes</li>
          <li>Encostas com declividade superior a 45°</li>
          <li>Topos de morros, montes, montanhas e serras</li>
          <li>Restingas, manguezais e veredas</li>
        </ul>
        
        <h3>Reserva Legal (RL)</h3>
        
        <p>A Reserva Legal é a área localizada no interior de uma propriedade ou posse rural, com a função de assegurar o uso econômico de modo sustentável dos recursos naturais do imóvel rural, auxiliar a conservação e a reabilitação dos processos ecológicos e promover a conservação da biodiversidade, bem como o abrigo e a proteção de fauna silvestre e da flora nativa.</p>
        
        <p>Os percentuais mínimos de Reserva Legal variam conforme a região:</p>
        <ul>
          <li>80% em propriedades rurais localizadas em área de floresta na Amazônia Legal</li>
          <li>35% em propriedades rurais localizadas em área de cerrado na Amazônia Legal</li>
          <li>20% nas demais regiões do país</li>
        </ul>
        
        <h2>Cadastro Ambiental Rural (CAR)</h2>
        
        <p>O Cadastro Ambiental Rural (CAR) é um registro público eletrônico de âmbito nacional, obrigatório para todos os imóveis rurais, com a finalidade de integrar as informações ambientais das propriedades e posses rurais, compondo base de dados para controle, monitoramento, planejamento ambiental e econômico e combate ao desmatamento.</p>
        
        <p>O CAR é um instrumento fundamental do Código Florestal e serve como primeiro passo para a regularização ambiental da propriedade rural.</p>
        
        <h2>Programa de Regularização Ambiental (PRA)</h2>
        
        <p>O Programa de Regularização Ambiental (PRA) é o conjunto de ações ou iniciativas a serem desenvolvidas por proprietários e posseiros rurais com o objetivo de adequar e promover a regularização ambiental de suas propriedades.</p>
        
        <p>Após a inscrição no CAR, os proprietários que possuem passivos ambientais (áreas desmatadas irregularmente) podem aderir ao PRA, assinando um termo de compromisso para regularizar sua situação.</p>
        
        <h2>Impactos para o Produtor Rural</h2>
        
        <h3>Aspectos Positivos</h3>
        
        <ul>
          <li><strong>Segurança jurídica:</strong> O Código Florestal trouxe maior clareza sobre as obrigações ambientais dos produtores rurais.</li>
          <li><strong>Anistia para multas anteriores:</strong> Produtores que aderirem ao PRA podem ter suspensas as multas aplicadas antes de 22 de julho de 2008 por infrações relativas à supressão irregular de vegetação em APPs e RLs.</li>
          <li><strong>Flexibilização para pequenas propriedades:</strong> O Código prevê tratamento diferenciado para pequenas propriedades ou posses rurais familiares.</li>
          <li><strong>Possibilidade de compensação da Reserva Legal:</strong> Proprietários que não possuem o percentual mínimo de Reserva Legal podem compensá-la em outra área, desde que no mesmo bioma.</li>
        </ul>
        
        <h3>Desafios</h3>
        
        <ul>
          <li><strong>Custos de regularização:</strong> A adequação às exigências do Código Florestal pode representar custos significativos para os produtores rurais.</li>
          <li><strong>Redução da área produtiva:</strong> A necessidade de manter APPs e RLs pode reduzir a área disponível para produção.</li>
          <li><strong>Complexidade técnica:</strong> O processo de regularização ambiental exige conhecimentos técnicos específicos, muitas vezes não disponíveis aos produtores.</li>
          <li><strong>Prazos e burocracia:</strong> Os procedimentos para regularização podem ser demorados e burocráticos.</li>
        </ul>
        
        <h2>Recomendações para Produtores Rurais</h2>
        
        <ol>
          <li><strong>Realize o CAR:</strong> Se ainda não fez, inscreva sua propriedade no Cadastro Ambiental Rural, pois é o primeiro passo para a regularização ambiental.</li>
          <li><strong>Verifique a situação das APPs e RL:</strong> Analise se sua propriedade atende aos requisitos legais quanto às Áreas de Preservação Permanente e Reserva Legal.</li>
          <li><strong>Adira ao PRA:</strong> Se houver passivos ambientais, adira ao Programa de Regularização Ambiental do seu estado.</li>
          <li><strong>Busque orientação técnica e jurídica:</strong> Conte com o apoio de profissionais especializados para orientá-lo no processo de regularização.</li>
          <li><strong>Fique atento às atualizações:</strong> A legislação ambiental está em constante evolução, por isso é importante manter-se informado sobre possíveis mudanças.</li>
        </ol>
        
        <h2>Conclusão</h2>
        
        <p>O Código Florestal Brasileiro representa um marco importante na conciliação entre produção agrícola e conservação ambiental. Embora apresente desafios para os produtores rurais, também oferece caminhos para a regularização e segurança jurídica.</p>
        
        <p>Compreender e cumprir as exigências do Código Florestal não é apenas uma obrigação legal, mas também uma forma de garantir a sustentabilidade da atividade rural a longo prazo, preservando os recursos naturais essenciais para a própria produção agrícola.</p>
      `,
      categorySlug: 'direito-ambiental'
    }
  ];

  useEffect(() => {
    // Simulate fetching article data
    setLoading(true);
    const foundArticle = articles.find(article => article.slug === slug);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Find related posts (same category, excluding current article)
      const related = articles
        .filter(post => post.categorySlug === foundArticle.categorySlug && post.id !== foundArticle.id)
        .slice(0, 2);
      
      setRelatedPosts(related);
    }
    
    setLoading(false);
    
    // Scroll to top when article changes
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
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
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
        {/* Back to blog link */}
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

        {/* Article header */}
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

        {/* Featured image */}
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
             src="https://images.unsplash.com/photo-1620853314124-bd5368c25f36" />
          </div>
        </motion.div>

        {/* Article content and sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-rural-darkgreen prose-p:text-rural-darkgreen/90 prose-a:text-rural-green prose-a:no-underline hover:prose-a:underline prose-strong:text-rural-darkgreen prose-li:text-rural-darkgreen/90 prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Share buttons */}
            <div className="mt-12 pt-8 border-t border-rural-darkbeige">
              <h3 className="text-xl font-serif font-bold mb-4">Compartilhe este artigo</h3>
              <div className="flex space-x-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-rural-beige hover:bg-rural-darkbeige text-rural-darkgreen p-3 rounded-xl transition-colors duration-300"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-rural-beige hover:bg-rural-darkbeige text-rural-darkgreen p-3 rounded-xl transition-colors duration-300"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-rural-beige hover:bg-rural-darkbeige text-rural-darkgreen p-3 rounded-xl transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <button 
                  onClick={copyToClipboard}
                  className="bg-rural-beige hover:bg-rural-darkbeige text-rural-darkgreen p-3 rounded-xl transition-colors duration-300"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Author info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rural-darkbeige/20 mb-8">
              <h3 className="text-xl font-serif font-bold mb-4">Sobre o Autor</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-rural-green flex items-center justify-center text-rural-beige font-bold text-2xl mr-4">
                  {article.author.split(' ')[0].charAt(0)}
                  {article.author.split(' ')[1]?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-rural-darkgreen">{article.author}</h4>
                  <p className="text-sm text-rural-darkgreen/70">{article.authorRole}</p>
                </div>
              </div>
              <p className="text-rural-darkgreen/80">
                Especialista com vasta experiência em questões jurídicas relacionadas ao setor rural e agronegócio. Atua há mais de 15 anos prestando assessoria jurídica para produtores rurais e empresas do agronegócio.
              </p>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-rural-darkbeige/20 mb-8">
                <h3 className="text-xl font-serif font-bold mb-4">Artigos Relacionados</h3>
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

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rural-darkbeige/20">
              <h3 className="text-xl font-serif font-bold mb-4">Categorias</h3>
              <div className="space-y-2">
                <Link 
                  to="/blog?categoria=direito-agrario" 
                  className="block py-2 px-4 rounded-lg hover:bg-rural-beige transition-colors duration-300"
                >
                  Direito Agrário
                </Link>
                <Link 
                  to="/blog?categoria=regularizacao-fundiaria" 
                  className="block py-2 px-4 rounded-lg hover:bg-rural-beige transition-colors duration-300"
                >
                  Regularização Fundiária
                </Link>
                <Link 
                  to="/blog?categoria=contratos-rurais" 
                  className="block py-2 px-4 rounded-lg hover:bg-rural-beige transition-colors duration-300"
                >
                  Contratos Rurais
                </Link>
                <Link 
                  to="/blog?categoria=direito-ambiental" 
                  className="block py-2 px-4 rounded-lg hover:bg-rural-beige transition-colors duration-300"
                >
                  Direito Ambiental
                </Link>
                <Link 
                  to="/blog?categoria=direito-sucessorio" 
                  className="block py-2 px-4 rounded-lg hover:bg-rural-beige transition-colors duration-300"
                >
                  Direito Sucessório
                </Link>
                <Link 
                  to="/blog?categoria=tributacao-rural" 
                  className="block py-2 px-4 rounded-lg hover:bg-rural-beige transition-colors duration-300"
                >
                  Tributação Rural
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="mt-16">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default ArticlePage;
