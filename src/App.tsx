/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  BookOpen, 
  ChevronDown,
  Check,
  X,
  ShoppingCart,
  Star,
  Gift,
  Puzzle,
  Smile,
  ListChecks,
  Home,
  Layout,
  Trophy,
  Calendar
} from "lucide-react";
import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 30, seconds: 11 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto mt-4 mb-8 max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-[#ef4444] via-[#f97316] to-[#fb923c] p-6 text-white shadow-2xl">
      <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest">
        <Calendar className="h-4 w-4" />
        OFERTA ESPECIAL EXPIRA EM:
      </div>
      <div className="flex justify-center gap-3">
        {[
          { label: "HORAS", value: timeLeft.hours },
          { label: "MIN", value: timeLeft.minutes },
          { label: "SEG", value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl font-black text-[#f97316] shadow-inner">
              {String(item.value).padStart(2, '0')}
            </div>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-tighter opacity-80">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotificationPopup = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  const notifications = [
    { name: "Juliana R.", city: "Salvador, BA", time: "há 8 minutos", product: "Método C.A.L.M.A Premium" },
    { name: "Roberto L.", city: "Brasília, DF", time: "há 12 minutos", product: "Método C.A.L.M.A Básico" },
    { name: "Fernanda M.", city: "Rio de Janeiro, RJ", time: "há 15 minutos", product: "Método C.A.L.M.A Premium" },
    { name: "Carlos S.", city: "São Paulo, SP", time: "há 3 minutos", product: "Método C.A.L.M.A Premium" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      const interval = setInterval(() => {
        setVisible(true);
        setTimeout(() => setVisible(false), 5000);
        setCurrent((prev) => (prev + 1) % notifications.length);
      }, 12000);
      return () => clearInterval(interval);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 right-4 z-[100] flex w-[280px] items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3 shadow-xl"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white">
        <Check className="h-6 w-6" />
      </div>
      <div className="overflow-hidden">
        <p className="text-[11px] font-bold text-stone-800">
          {notifications[current].name}
        </p>
        <p className="truncate text-[10px] text-stone-500">
          Comprou: {notifications[current].product}
        </p>
        <p className="text-[9px] text-stone-400">
          {notifications[current].city} — {notifications[current].time}
        </p>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-semibold text-stone-800"
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-2 text-stone-600 leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

const SpecialOfferModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-stone-900/60 p-4 backdrop-blur-sm sm:items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="fixed inset-0"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        className="relative my-8 w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-2xl"
      >
        <h2 className="text-2xl font-black text-stone-800">Espere! Oferta Especial</h2>
        <p className="mt-2 text-sm font-medium text-stone-500">
          Leve o <span className="font-bold text-[#10b981]">Plano Premium</span> com desconto exclusivo!
        </p>

        <div className="my-8 rounded-2xl bg-stone-50 py-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-bold text-stone-400 line-through">De R$27</span>
            <span className="text-4xl font-black text-[#10b981]">R$17</span>
          </div>
        </div>

        <div className="mb-8 space-y-3 text-left">
          {[
            "Guia Completo Método C.A.L.M.A",
            "Cartao-de-Crise-Imediata",
            "Rotina-Regulada",
            "Cartoes-de-Comunicacao-Visual",
            "Guia para Professores e cuidadores"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check className="h-4 w-4 shrink-0 text-[#10b981]" strokeWidth={3} />
              <span className="text-[13px] font-medium text-stone-600">{text}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button className="w-full rounded-2xl bg-[#10b981] py-4 text-sm font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#059669] active:scale-95">
            QUERO O PREMIUM POR R$17
          </button>
          <button 
            onClick={onClose}
            className="w-full rounded-2xl border border-stone-200 bg-white py-4 text-sm font-bold text-stone-400 transition-all hover:bg-stone-50 active:scale-95"
          >
            Continuar com o Básico
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const currentDate = "24/03/2026";
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  useEffect(() => {
    if (isOfferModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOfferModalOpen]);

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-stone-200">
      {/* Red Top Banner */}
      <div className="bg-[#ef4444] py-3 px-4 text-center">
        <p className="text-[13px] font-black tracking-tight text-white uppercase md:text-sm">
          Acesso Imediato com Condição Especial — Só Hoje {currentDate}
        </p>
      </div>

      <NotificationPopup />
      <SpecialOfferModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} />

      {/* Hero Section */}
      <header className="relative px-4 pt-8 pb-8 text-center md:px-6 md:pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="mb-4 text-3xl font-black leading-[1.1] tracking-tight text-stone-800 md:text-5xl md:leading-[1.1]">
            <span className="text-blue-800">+50 Atividades Práticas</span> para Crianças com <span className="text-blue-800">Autismo</span> <span className="text-[#10b981]">+Bônus</span>
          </h1>
          
          <div className="mb-6 inline-block rounded-full border-2 border-[#3b82f6] bg-[#eff6ff] px-6 py-2 md:mb-8 md:px-8 md:py-2.5">
            <span className="text-xs font-black tracking-widest text-[#3b82f6] uppercase md:text-base">
              MÉTODO C.A.L.M.A
            </span>
          </div>

          <p className="mx-auto mb-8 max-w-xl text-sm font-medium leading-relaxed text-stone-500 md:mb-10 md:text-lg">
            50 atividades simples e práticas para lidar with crises emocionais e sensoriais no autismo — <span className="font-bold text-stone-800">sem grito, sem culpa e sem precisar de preparo</span>
          </p>

          {/* Hero Image Card */}
          <div className="mx-auto max-w-[320px] overflow-hidden rounded-[2rem] bg-[#fef3c7] p-1.5 shadow-2xl shadow-stone-200 md:max-w-md md:rounded-[2.5rem] md:p-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] md:rounded-[2rem]">
              <img 
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800&h=1067" 
                alt="50 Atividades Práticas" 
                className="h-full w-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Text Mockup to match image */}
              <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 text-center px-4 md:pt-12">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-6 rounded-2xl shadow-2xl border border-stone-100 md:px-6 md:py-8 md:rounded-3xl">
                  <div className="flex justify-center gap-2 mb-4 md:gap-3 md:mb-6">
                    <Heart className="h-4 w-4 text-red-400 fill-red-400 md:h-6 md:w-6" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 md:h-6 md:w-6" />
                    <Puzzle className="h-4 w-4 text-blue-500 fill-blue-500 md:h-6 md:w-6" />
                    <Puzzle className="h-4 w-4 text-red-500 fill-red-500 md:h-6 md:w-6" />
                    <Smile className="h-4 w-4 text-yellow-500 fill-yellow-500 md:h-6 md:w-6" />
                  </div>
                  <div className="space-y-0.5 md:space-y-1">
                    <h2 className="text-xl font-black leading-none text-stone-800 uppercase tracking-tighter md:text-3xl">
                      50 Atividades
                    </h2>
                    <h2 className="text-lg font-black leading-none text-stone-800 uppercase tracking-tighter md:text-2xl">
                      Práticas Para
                    </h2>
                    <h2 className="text-lg font-black leading-none text-stone-800 uppercase tracking-tighter md:text-2xl">
                      Uma Criança
                    </h2>
                    <h2 className="text-lg font-black leading-none text-stone-800 uppercase tracking-tighter md:text-2xl">
                      Com Autismo
                    </h2>
                  </div>
                </div>
              </div>
              {/* Replit Badge Mockup */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-stone-900/80 px-3 py-1 text-[8px] font-bold text-white backdrop-blur-sm md:bottom-6 md:right-6 md:px-4 md:py-1.5 md:text-[10px]">
                <div className="h-2 w-2 rounded-full bg-white/20 md:h-3 md:w-3"></div>
                Made with Replit
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center md:mt-10">
            <button 
              onClick={scrollToPricing}
              className="flex items-center gap-2 rounded-full bg-[#10b981] px-8 py-4 text-base font-black text-white shadow-xl transition-all hover:scale-105 hover:bg-[#059669] active:scale-95 md:px-10 md:py-5 md:text-lg"
            >
              <Heart className="h-5 w-5 fill-white md:h-6 md:w-6" />
              QUERO COMEÇAR AGORA
            </button>
          </div>
        </motion.div>
      </header>

      {/* O QUE VOCÊ VAI RECEBER */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center md:mb-16">
            <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">O Que Você Vai Receber</h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 md:mt-4 md:h-1.5 md:w-32"></div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {[
              { 
                title: "Guia Completo Método C.A.L.M.A", 
                desc: "50 atividades práticas divididas nos 5 pilares — linguagem simples, sem termos técnicos, para aplicar agora",
                icon: <BookOpen className="h-6 w-6 text-white md:h-8 md:w-8" />
              },
              { 
                title: "Checklists de Crise Imediata", 
                desc: "O que fazer passo a passo nos primeiros minutos de uma crise — salvo no celular e acessado na hora",
                icon: <ListChecks className="h-6 w-6 text-white md:h-8 md:w-8" />
              },
              { 
                title: "Guia de Comunicação na Crise", 
                desc: "Frases certas e erradas. O que falar e o que jamais dizer quando a criança está em colapso",
                icon: <MessageCircle className="h-6 w-6 text-white md:h-8 md:w-8" />
              },
              { 
                title: "Uso em Casa e na Escola", 
                desc: "Todas as atividades foram pensadas para qualquer ambiente e para qualquer cuidador aplicar",
                icon: <Home className="h-6 w-6 text-white md:h-8 md:w-8" />
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center rounded-[2rem] border border-stone-50 bg-white p-6 text-center shadow-2xl shadow-stone-100 transition-all hover:scale-[1.02] md:rounded-[2.5rem] md:p-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 shadow-xl shadow-blue-200 md:mb-8 md:h-20 md:w-20">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-lg font-bold text-stone-800 md:mb-4 md:text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-stone-500 md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS EXCLUSIVOS */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-stone-900">Benefícios Exclusivos</h2>
            <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { 
                title: "Aja com Segurança na Crise", 
                desc: "Chega de travar, gritar e se arrepender — você vai ter um plano claro para cada momento",
                icon: <ShieldCheck className="h-8 w-8 text-white" />
              },
              { 
                title: "Saiba Exatamente o Que Fazer", 
                desc: "Nada de improvisar. Técnicas práticas e imediatas para cada tipo de crise sensorial ou emocional",
                icon: <Zap className="h-8 w-8 text-white" />
              },
              { 
                title: "Comunique-se do Jeito Certo", 
                desc: "Aprenda o que falar e como falar para não intensificar a crise — simples e eficaz",
                icon: <MessageCircle className="h-8 w-8 text-white" />
              },
              { 
                title: "Mais Calma e Conexão no Dia a Dia", 
                desc: "Reduza o estresse, a culpa e a sensação de impotência — e fortaleça o vínculo com sua criança",
                icon: <Heart className="h-8 w-8 text-white" />
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center rounded-[2.5rem] border border-stone-50 bg-white p-10 text-center shadow-2xl shadow-stone-100 transition-all hover:scale-[1.02]">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#10b981] shadow-xl shadow-emerald-200">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-stone-800">{item.title}</h3>
                <p className="text-base leading-relaxed text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BÔNUS EXCLUSIVOS */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center md:mb-16">
            <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">Bônus Exclusivos — Valor R$147 (Hoje Grátis!)</h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 md:mt-4 md:h-1.5 md:w-32"></div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {[
              { 
                title: "Cartao-de-Crise-Imediata", 
                price: "R$47",
                desc: "Protocolo visual rápido para usar no exato momento em que a crise começa — salve no celular",
                icon: <Zap className="h-6 w-6 text-white md:h-8 md:w-8" />
              },
              { 
                title: "Rotina-Regulada", 
                price: "R$37",
                desc: "Rotina estruturada para reduzir os gatilhos de crise ao longo do dia — em casa ou na escola",
                icon: <Calendar className="h-6 w-6 text-white md:h-8 md:w-8" />
              },
              { 
                title: "Cartoes-de-Comunicacao-Visual", 
                price: "R$37",
                desc: "Apoio visual para se comunicar com a criança durante a crise quando as palavras não funcionam",
                icon: <Layout className="h-6 w-6 text-white md:h-8 md:w-8" />
              },
              { 
                title: "Guia para Professores e cuidadores", 
                price: "R$26",
                desc: "Versão adaptada para compartilhar com a escola — para que todos ajam da mesma forma",
                icon: <Trophy className="h-6 w-4 text-white md:h-8 md:w-6" />
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center rounded-[2rem] border-2 border-emerald-100 bg-[#f0fdf4]/30 p-6 text-center shadow-xl shadow-emerald-50 transition-all hover:scale-[1.02] md:rounded-[2.5rem] md:p-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 shadow-xl shadow-blue-200 md:mb-8 md:h-20 md:w-20">
                  {item.icon}
                </div>
                <h3 className="mb-1 text-lg font-bold text-stone-800 md:mb-2 md:text-xl">{item.title}</h3>
                <p className="mb-3 text-lg font-black text-red-500 md:mb-4 md:text-xl">{item.price}</p>
                <p className="text-sm leading-relaxed text-stone-500 md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl bg-[#10b981] py-4 px-6 text-center shadow-lg md:mt-12 md:py-5 md:px-8">
            <p className="text-base font-black text-white uppercase tracking-tight md:text-xl">
              Total em Bônus: R$147 <span className="text-yellow-300">GRÁTIS HOJE!</span>
            </p>
          </div>
        </div>
      </section>

      {/* OFERTA / PRICING */}
      <section id="pricing" className="bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <CountdownTimer />
          
          <div className="mb-10 text-center md:mb-16">
            <h2 className="text-2xl font-black text-stone-900 md:text-3xl">Escolha Seu Plano</h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 md:mt-4 md:h-1.5 md:w-32"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Plano Básico */}
            <div className="flex flex-col rounded-[2rem] border-2 border-blue-500 bg-white p-6 shadow-2xl shadow-stone-100 md:rounded-[2.5rem] md:p-10">
              <div className="mb-6 text-center md:mb-8">
                <h3 className="text-lg font-bold text-[#1e3a8a] md:text-xl">Plano Básico</h3>
                <div className="mt-3 flex flex-col items-center md:mt-4">
                  <span className="text-xs font-bold text-stone-400 line-through md:text-sm">R$97</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#10b981] md:text-4xl">R$10,00</span>
                  </div>
                  <span className="mt-1 text-[10px] font-bold text-stone-500 md:mt-2 md:text-xs">pagamento único</span>
                  <span className="mt-1 text-[10px] font-bold text-[#10b981] md:text-xs">Você economiza R$87,00</span>
                </div>
              </div>

              <div className="mb-8 space-y-4 flex-grow md:mb-10 md:space-y-5">
                {[
                  { text: "Guia Completo Método C.A.L.M.A", check: true },
                  { text: "50 Atividades Práticas", check: true },
                  { text: "Os 5 Pilares do Método", check: true },
                  { text: "Acesso digital imediato", check: true },
                  { text: "Garantia de 7 dias", check: true },
                  { text: "Sem bônus exclusivos", check: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 md:gap-3">
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center md:mt-1 md:h-5 md:w-5`}>
                      {item.check ? <Check className="h-3 w-3 text-[#10b981] md:h-4 md:w-4" strokeWidth={3} /> : <X className="h-3 w-3 text-red-500 md:h-4 md:w-4" strokeWidth={3} />}
                    </div>
                    <span className={`text-xs font-medium md:text-sm ${item.check ? 'text-stone-600' : 'text-red-500'}`}>{item.text}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsOfferModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#10b981] py-4 text-base font-black text-white shadow-xl transition-all hover:scale-105 hover:bg-[#059669] active:scale-95 md:py-5 md:text-lg"
              >
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
                QUERO O BÁSICO
              </button>
            </div>

            {/* Plano Premium */}
            <div className="relative flex flex-col rounded-[2rem] border-2 border-blue-500 bg-white p-6 shadow-2xl shadow-blue-50 md:rounded-[2.5rem] md:p-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#3b82f6] px-4 py-1.5 text-[10px] font-black text-white uppercase tracking-widest shadow-lg md:-top-5 md:px-6 md:py-2 md:text-xs">
                MAIS POPULAR
              </div>

              <div className="mb-6 text-center md:mb-8">
                <h3 className="text-lg font-bold text-[#1e3a8a] md:text-xl">Plano Premium</h3>
                <div className="mt-3 flex flex-col items-center md:mt-4">
                  <span className="text-xs font-bold text-stone-400 line-through md:text-sm">R$256</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#10b981] md:text-5xl">R$27,00</span>
                  </div>
                  <span className="mt-1 text-[10px] font-bold text-stone-500 md:mt-2 md:text-xs">pagamento único</span>
                  <span className="mt-1 text-[10px] font-bold text-[#10b981] md:text-[11px]">Você economiza R$229,00 + R$147 em bônus</span>
                </div>
              </div>

              <div className="mb-4 rounded-xl bg-stone-50 p-3 text-center md:mb-6 md:p-4">
                <p className="text-[10px] font-bold text-stone-500 md:text-[11px]">+1.847 pessoas escolheram essa oferta</p>
              </div>

              <div className="mb-8 space-y-4 flex-grow md:mb-10 md:space-y-5">
                <div className="flex items-center gap-2 md:gap-3">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 md:h-5 md:w-5" />
                  <span className="text-xs font-black text-yellow-600 md:text-sm">Tudo do Plano Básico</span>
                </div>
                {[
                  { text: "Guia Completo Método C.A.L.M.A", check: true },
                  { text: "50 Atividades Práticas", check: true },
                  { text: "Material completo com os 5 pilares", check: true },
                  { text: "BÔNUS: Cartao-de-Crise-Imediata", check: true, bonus: true },
                  { text: "BÔNUS: Rotina-Regulada", check: true, bonus: true },
                  { text: "BÔNUS: Cartoes-de-Comunicacao-Visual", check: true, bonus: true },
                  { text: "BÔNUS: Guia para Professores e cuidadores", check: true, bonus: true },
                  { text: "Melhor custo-benefício", check: true },
                  { text: "Garantia de 7 dias", check: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 md:gap-3">
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center md:mt-1 md:h-5 md:w-5`}>
                      {item.bonus ? <Gift className="h-3 w-3 text-blue-500 md:h-4 md:w-4" /> : <Check className="h-3 w-3 text-[#10b981] md:h-4 md:w-4" strokeWidth={3} />}
                    </div>
                    <span className={`text-xs font-medium md:text-sm ${item.bonus ? 'text-blue-600' : 'text-stone-600'}`}>{item.text}</span>
                  </div>
                ))}
              </div>

              <a 
  href="https://pay.wiapy.com/DNpkg_F8-c" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#10b981] py-4 text-base font-black">
    <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
    QUERO O PREMIUM
  </button>
</a>
            </div>
          </div>
        </div>
      </section>

      {/* QUEM JÁ APLICOU O MÉTODO */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-stone-900">Quem Já Aplicou o Método</h2>
            <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                text: "Meu filho tem 6 anos e as crises eram diárias. Em 3 dias aplicando as técnicas do pilar C e A, ele começou a responder diferente. Nunca pensei que algo tão simples fosse funcionar assim.",
                name: "Fernanda O.",
                role: "Mãe de autista — SP",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
              },
              {
                text: "Trabalho como professora de apoio e o método transformou minha forma de agir em sala. Os cartões de comunicação visual salvaram o meu ano letivo. Indico para todos os professores.",
                name: "Cláudia M.",
                role: "Professora de apoio — RJ",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
              },
              {
                text: "Eu chorava toda vez que não conseguia ajudar meu filho na crise. Com o Método C.A.L.M.A finalmente me senti capaz. A culpa foi embora e a conexão com ele melhorou muito.",
                name: "Juliana R.",
                role: "Mãe de autista — BA",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col rounded-[1.5rem] border border-stone-50 bg-white p-6 shadow-2xl shadow-stone-100 md:rounded-[2.5rem] md:p-8">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="mb-6 text-sm italic leading-relaxed text-stone-600 md:mb-8">"{item.text}"</p>
                <div className="mt-auto flex items-center gap-4">
                  <img src={item.img} alt={item.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-100 md:h-12 md:w-12" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-sm font-bold text-stone-800">{item.name}</p>
                    <p className="text-[10px] text-stone-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SOBRE O AUTOR */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border-2 border-blue-500 bg-white p-6 shadow-2xl shadow-blue-50 md:rounded-[3rem] md:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-black text-stone-900 md:text-3xl">Sobre o Autor</h2>
            <h3 className="mt-3 text-xl font-bold text-blue-600 md:mt-4 md:text-2xl">Dra. Ana Beatriz Lemos</h3>
            <p className="mt-1 text-xs italic text-stone-500 md:mt-2 md:text-sm">Terapeuta Ocupacional e Especialista em Regulação Sensorial</p>
            
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-stone-600 md:mt-8">
              "Depois de anos atendendo crianças com autismo e suas famílias, percebi que o maior sofrimento não era da criança — era do adulto que não sabia como ajudar. Desenvolvi o Método C.A.L.M.A com base em regulação sensorial, comunicação aumentativa e apoio comportamental positivo. Tudo traduzido para uma linguagem simples, que qualquer pessoa possa aplicar agora."
            </p>

            <div className="mt-8 grid grid-cols-3 gap-2 border-y border-stone-100 py-6 md:mt-12 md:gap-4 md:py-8">
              <div>
                <p className="text-xl font-black text-[#10b981] md:text-2xl">3.200+</p>
                <p className="text-[8px] font-bold text-stone-500 uppercase tracking-tighter md:text-[10px]">Famílias Ajudadas</p>
              </div>
              <div>
                <p className="text-xl font-black text-[#10b981] md:text-2xl">12+</p>
                <p className="text-[8px] font-bold text-stone-500 uppercase tracking-tighter md:text-[10px]">Anos de Experiência</p>
              </div>
              <div>
                <p className="text-xl font-black text-[#10b981] md:text-2xl">50</p>
                <p className="text-[8px] font-bold text-stone-500 uppercase tracking-tighter md:text-[10px]">Atividades Práticas</p>
              </div>
            </div>

            <div className="mt-8 space-y-3 text-left inline-block md:mt-10 md:space-y-4">
              {[
                "Baseado em regulação sensorial e apoio comportamental positivo",
                "Aplicado em clínicas, escolas e residências em todo o Brasil",
                "Linguagem acessível, sem termos técnicos ou psicológicos"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981] text-white md:h-5 md:w-5">
                    <Check className="h-2.5 w-2.5 md:h-3 md:w-3" strokeWidth={4} />
                  </div>
                  <span className="text-xs font-medium text-stone-700 md:text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center md:mt-12">
              <div className="h-20 w-20 overflow-hidden rounded-full ring-4 ring-blue-100 md:h-24 md:w-24">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Dra. Ana Beatriz Lemos" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERGUNTAS FREQUENTES */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center md:mb-16">
            <h2 className="text-2xl font-black text-stone-900 md:text-3xl">Perguntas Frequentes</h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 md:mt-4 md:h-1.5 md:w-32"></div>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {[
              {
                q: "Funciona para qualquer criança com autismo?",
                a: "Sim! O Método C.A.L.M.A foca em regulação sensorial e emocional, que são pilares universais para crianças no espectro, independente do nível de suporte."
              },
              {
                q: "Precisa de formação ou preparo para aplicar?",
                a: "De forma alguma. O guia foi escrito em linguagem simples e direta, justamente para que pais e cuidadores sem formação técnica possam aplicar imediatamente."
              },
              {
                q: "E se as crises do meu filho forem muito intensas?",
                a: "O método inclui protocolos específicos para crises de alta intensidade, focando em segurança e desescalada rápida."
              },
              {
                q: "Como recebo o material?",
                a: "O acesso é 100% digital. Assim que o pagamento for confirmado, você receberá um e-mail com o link para baixar todos os guias e bônus em PDF."
              },
              {
                q: "Tem garantia?",
                a: "Sim! Oferecemos 7 dias de garantia incondicional. Se não gostar do material, devolvemos seu dinheiro."
              }
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-stone-100 bg-white p-1 shadow-sm md:rounded-2xl md:p-2">
                <FAQItem question={item.q} answer={item.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA DE 7 DIAS */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border-2 border-blue-500 bg-[#f8fafc] p-8 text-center shadow-2xl shadow-blue-50 md:rounded-[3rem] md:p-12">
          <div className="mx-auto mb-6 flex h-20 w-16 items-center justify-center bg-blue-600 md:mb-10 md:h-32 md:w-28" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <div className="text-center text-white">
              <p className="text-xl font-black md:text-4xl">7</p>
              <p className="text-[7px] font-bold uppercase tracking-widest md:text-[10px]">DIAS</p>
            </div>
          </div>
          
          <h2 className="mb-4 text-xl font-black text-stone-900 md:mb-6 md:text-3xl">Garantia de 7 Dias</h2>
          <p className="mb-8 text-xs leading-relaxed text-stone-500 md:mb-10 md:text-sm">
            Se não gostar, devolvemos seu dinheiro. Sem burocracia, sem perguntas.
          </p>

          <button 
            onClick={scrollToPricing}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#10b981] py-4 text-xs font-black text-white shadow-xl transition-all hover:scale-105 hover:bg-[#059669] active:scale-95 md:py-5 md:text-sm"
          >
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5" />
            COMPRAR COM SEGURANÇA
          </button>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ef4444] via-[#f97316] to-[#fb923c] px-4 py-16 text-center text-white md:px-6 md:py-24">
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-black leading-tight uppercase tracking-tighter md:mb-8 md:text-6xl">
            COMECE HOJE E TRANSFORME A FORMA COMO VOCÊ LIDA COM AS CRISES DO SEU FILHO
          </h2>
          <p className="mb-8 text-xs font-bold uppercase tracking-widest opacity-90 md:mb-12 md:text-lg">
            PAIS E PROFESSORES QUE APLICARAM O MÉTODO C.A.L.M.A JÁ RELATAM RESULTADOS DESDE O PRIMEIRO DIA DE USO.
          </p>
          <button 
            onClick={scrollToPricing}
            className="mx-auto flex items-center gap-2 rounded-full bg-[#10b981] px-10 py-5 text-base font-black text-white shadow-2xl transition-all hover:scale-105 hover:bg-[#059669] active:scale-95 md:px-12 md:py-6 md:text-lg"
          >
            <Heart className="h-5 w-5 fill-white md:h-6 md:w-6" />
            QUERO ACESSO IMEDIATO
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1e293b] px-6 pt-12 pb-32 text-center text-white md:pb-12">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-medium opacity-60">
            © 2025 Método C.A.L.M.A. Todos os direitos reservados.
          </p>
          <p className="text-[10px] leading-relaxed opacity-40">
            Material digital para pais, professores e cuidadores de crianças com autismo.
          </p>
        </div>
      </footer>

      {/* STICKY CTA MOBILE */}
      <div className="fixed bottom-0 left-0 z-[90] w-full border-t border-stone-100 bg-white/80 p-4 backdrop-blur-xl md:hidden">
        <button 
          onClick={scrollToPricing}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10b981] py-4 font-black text-white shadow-lg active:scale-95"
        >
          <ShoppingCart className="h-5 w-5" />
          QUERO O MÉTODO C.A.L.M.A
        </button>
      </div>
    </div>
  );
}
