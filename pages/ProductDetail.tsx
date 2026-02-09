
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { getAppState } from '../store';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const juice = getAppState().juices.find(j => j.id === id);

  if (!juice) return <div className="p-20 text-center">Juice not found.</div>;

  return (
    <div className="bg-white pb-32">
      <SEO title={juice.name} description={juice.benefits} />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <Link to="/products" className="inline-flex items-center text-sm font-bold text-olive mb-12 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Browse all elixirs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Visuals */}
          <ScrollReveal direction="right">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img src={juice.image} className="w-full h-full object-cover" alt={juice.name} />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
                <div className="flex items-center space-x-3 text-olive mb-2">
                  <Sparkles size={20} />
                  <span className="font-bold text-xs uppercase tracking-widest">100% Organic Extracts</span>
                </div>
                <p className="text-xs text-gray-600 italic">Freshly cold-pressed every morning in small batches.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Info */}
          <div className="space-y-12">
            <ScrollReveal direction="left">
              <header className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-sage-dark leading-tight">{juice.name}</h1>
                <p className="text-2xl text-olive serif italic">{juice.benefits}</p>
                <p className="text-gray-600 text-lg leading-relaxed font-light">{juice.description}</p>
              </header>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <section className="space-y-6">
                <h3 className="text-xl font-bold text-sage-dark flex items-center">
                  <ShieldCheck className="mr-2 text-olive" />
                  Powerful Herbs Inside
                </h3>
                <div className="flex flex-wrap gap-3">
                  {juice.ingredients.split(',').map((ing, i) => (
                    <span key={i} className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-100 shadow-sm">
                      {ing.trim()}
                    </span>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div className="pt-8 border-t border-gray-100 flex flex-col gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing & Subscription</p>
                  <p className="text-2xl font-bold text-sage-dark">Available for daily morning delivery</p>
                </div>
                
                <a
                  href={juice.orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-olive text-white px-10 py-5 rounded-full font-bold hover:shadow-2xl transition-all text-center flex items-center justify-center space-x-3 group"
                >
                  <MessageCircle size={20} />
                  <span>Request Trial Pack via WhatsApp</span>
                </a>
                
                <p className="text-xs text-gray-400 text-center px-8 italic">
                  Note: Ordering is currently handled via WhatsApp for customized health goals and subscription coordination in Sobha City.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
