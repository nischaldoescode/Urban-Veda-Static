
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles, MessageCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';
import { getAppState } from '../store';

const Home: React.FC = () => {
  const { config, juices } = getAppState();

  return (
    <div className="overflow-x-hidden">
      <SEO title="Home" description={config.heroSubtext} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-sage-gradient px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-sm font-semibold tracking-wide border border-olive/20">
                Exclusive for Sobha City Residents
              </span>
              <h1 className="text-6xl lg:text-8xl font-bold text-sage-dark leading-[1.1]">
                {config.heroHeadline}
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-light">
                {config.heroSubtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/products"
                  className="bg-olive text-white px-10 py-5 rounded-full font-bold hover:shadow-xl transition-all text-center flex items-center justify-center group"
                >
                  Trial My Pack 
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <a
                  href={config.whatsappLink}
                  className="bg-white border border-gray-200 text-sage-dark px-10 py-5 rounded-full font-bold hover:bg-gray-50 transition-all text-center flex items-center justify-center"
                >
                  <MessageCircle className="mr-2 text-green-500" size={18} />
                  Join Community
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative aspect-[4/5] lg:aspect-square">
              <div className="absolute -inset-10 bg-olive/5 rounded-full blur-3xl opacity-50"></div>
              <img
                src="https://images.unsplash.com/photo-1556760544-74068564f056?auto=format&fit=crop&q=80&w=1200"
                alt="Fresh Herbal Ingredients"
                className="rounded-[3rem] shadow-2xl w-full h-full object-cover relative z-10"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-sage-dark mb-6">Lifestyle Challenges</h2>
            <p className="text-gray-500 max-w-2xl mx-auto italic font-medium">
              "Your busy lifestyle deserves better health support."
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Chronic Fatigue", 
              desc: "Long hours & screen time lead to constant tiredness. Our herbs reset your energy levels naturally.",
              icon: <Sparkles className="text-olive" />
            },
            { 
              title: "Weak Immunity", 
              desc: "Pollution & stress weaken your shield. Giloy and Amla provide your daily insurance against falling sick.",
              icon: <ShieldCheck className="text-olive" />
            },
            { 
              title: "Poor Gut Health", 
              desc: "Irregular meals & fast food cause bloating. Aloe Vera & Ginger restore your Agni (digestive fire).",
              icon: <HeartPulse className="text-olive" />
            },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 hover:bg-sage-gradient transition-colors border border-transparent hover:border-olive/10 group">
                <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-sage-dark">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Signature Products Preview */}
      <section className="py-24 bg-sage-gradient px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-sage-dark">Fresh Every Morning</h2>
              <p className="text-gray-500 mt-2">100% Preservative-free. Delivered to Sobha City.</p>
            </div>
            <Link to="/products" className="text-olive font-bold underline underline-offset-4 hidden md:block">
              View All Juices
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {juices.slice(0, 2).map((juice) => (
              <ScrollReveal key={juice.id}>
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2">
                    <img src={juice.image} className="w-full h-full object-cover" alt={juice.name} />
                  </div>
                  <div className="md:w-1/2 p-8 space-y-4 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-sage-dark">{juice.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 italic">{juice.benefits}</p>
                    <Link to={`/products/${juice.id}`} className="bg-olive text-white px-6 py-3 rounded-full text-sm font-bold inline-block text-center mt-4">
                      Explore Blend
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Quote */}
      <section className="py-24 bg-sage-dark text-white px-6 text-center">
        <ScrollReveal>
          <p className="serif text-3xl md:text-5xl italic mb-12 max-w-4xl mx-auto leading-relaxed">
            "Drink Today, Avoid the Doctor Tomorrow."
          </p>
          <div className="flex flex-col items-center space-y-4">
            <span className="text-olive-200 uppercase tracking-widest text-xs font-bold">Nature's Prescription</span>
            <div className="h-12 w-px bg-olive/30"></div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;
