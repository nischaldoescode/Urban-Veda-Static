
import React from 'react';
import { getAppState } from '../store';
import ScrollReveal from '../components/ScrollReveal';

const Philosophy: React.FC = () => {
  const { config } = getAppState();
  const content = config.philosophyPage;

  return (
    <div className="bg-[#fcfdfc] min-h-screen">
      <section className="py-32 px-6 text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto space-y-8">
            <span className="text-olive font-bold tracking-[0.2em] uppercase text-xs">The Ethics</span>
            <h1 className="text-6xl md:text-8xl font-bold text-sage-dark">{content.headline}</h1>
            <p className="text-2xl text-gray-500 serif italic max-w-2xl mx-auto">"{content.subtext}"</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="relative group overflow-hidden rounded-[4rem] shadow-2xl">
             <img src={content.image} className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105" alt="Philosophy" />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-20 text-center">
                <p className="text-white text-3xl md:text-4xl font-light leading-relaxed max-w-3xl">
                  {content.extraText}
                </p>
             </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Philosophy;
