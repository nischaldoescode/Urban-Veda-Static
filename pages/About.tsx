
import React from 'react';
import { getAppState } from '../store';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
  const { config } = getAppState();
  const content = config.aboutPage;

  return (
    <div className="bg-white min-h-screen">
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <ScrollReveal direction="right">
            <div className="space-y-10">
              <span className="text-olive font-bold tracking-[0.2em] uppercase text-xs">Our Origins</span>
              <h1 className="text-6xl md:text-7xl font-bold text-sage-dark leading-tight">{content.headline}</h1>
              <p className="text-xl text-gray-500 leading-relaxed font-light">{content.subtext}</p>
              <div className="pt-8 border-t border-gray-100 text-sage-dark serif italic text-2xl">
                {content.extraText}
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-10 bg-olive/5 rounded-[4rem] blur-3xl opacity-50"></div>
              <img src={content.image} className="rounded-[4rem] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover" alt="About Urban Veda" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
