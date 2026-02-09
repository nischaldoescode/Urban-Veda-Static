
import React from 'react';
import { Leaf, Award, Heart, CheckCircle } from 'lucide-react';

const Philosophy: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="py-24 bg-sage-gradient text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-olive font-bold tracking-widest uppercase text-xs mb-4 block">The Soul of Urban Veda</span>
          <h1 className="text-5xl font-bold text-sage-dark mb-8">Honesty is our <span className="italic">Main Ingredient</span></h1>
          <p className="text-xl text-gray-600 leading-relaxed font-light italic">
            "Consistency over miracle claims. Roots over quick fixes."
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-sage-dark">Why Urban Veda Was Created</h2>
              <p className="text-gray-600 leading-relaxed">
                In a world of factory-made health supplements loaded with synthetic preservatives, Urban Veda was born out of a simple need: To bring the kitchen back into healthcare. We believe health is not a product you buy, but a ritual you maintain.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: <Leaf className="text-olive" />, title: "Home-made", desc: "No mass production. Small batches only." },
                { icon: <Award className="text-olive" />, title: "No Preservatives", desc: "Pure extracts, fresh and potent." },
                { icon: <Heart className="text-olive" />, title: "Respect for Nature", desc: "Honoring ancient Ayurvedic methods." },
                { icon: <CheckCircle className="text-olive" />, title: "Modern Hygiene", desc: "Traditional herbs, modern safety." },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-10 h-10 bg-sage-gradient rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-sage-dark">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <img src="https://picsum.photos/seed/philosophy/800/1000" className="rounded-3xl shadow-2xl" alt="Founder Story" />
             <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
                <p className="text-sage-dark italic serif">"We don't sell miracles. We sell discipline, consistency, and the finest herbs nature has to offer."</p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sage-dark text-white px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
           <h2 className="text-3xl font-bold serif italic">Our Commitment</h2>
           <p className="text-gray-300 text-lg leading-relaxed font-light">
             We operate with a deep respect for both Ayurvedic tradition and modern biological understanding. Every juice is a bridge between the wisdom of our ancestors and the needs of a modern professional living in a concrete jungle.
           </p>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
