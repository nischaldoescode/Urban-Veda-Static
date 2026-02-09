
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-24">
          <h1 className="text-5xl font-bold text-sage-dark mb-6">Real Experiences</h1>
          <p className="text-lg text-gray-500 italic">"Grounded stories from our consistent users."</p>
        </header>

        <div className="space-y-12">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-12 bg-sage-gradient rounded-[3rem] border border-gray-100 relative group">
              <div className="absolute top-8 left-8 text-olive/20 text-6xl serif">“</div>
              <div className="relative z-10 space-y-6">
                <p className="text-2xl text-sage-dark serif leading-relaxed italic">
                  {t.text}
                </p>
                <div className="pt-8 border-t border-gray-200/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sage-dark">{t.name}{t.age ? `, ${t.age}` : ''}</h4>
                    <p className="text-sm text-olive font-medium">{t.condition}</p>
                  </div>
                  <div className="text-xs text-gray-400 font-bold tracking-widest uppercase">Verified User</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center p-12 border border-gray-100 rounded-3xl">
           <p className="text-gray-500 italic mb-8">
             Every body reacts differently to herbs. While some feel changes in 2 weeks, others may take a month. Consistency and a balanced lifestyle are key.
           </p>
           <button className="text-olive font-bold hover:underline">Share Your Journey with Us</button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
