
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { getAppState } from '../store';

const Products: React.FC = () => {
  const { juices } = getAppState();

  return (
    <div className="py-20 bg-white min-h-screen px-6">
      <SEO title="Our Juices" description="Explore our range of 100% natural, preservative-free Ayurvedic herbal juices." />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-sage-dark mb-6">Healing Elixirs</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto italic font-medium">
            "Sip Health, Skip the Hospital. Nature’s Medicine with No Side Effects."
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {juices.map((juice, i) => (
            <ScrollReveal key={juice.id} delay={i * 0.1}>
              <Link to={`/products/${juice.id}`} className="group block">
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-lg bg-gray-50">
                  <img
                    src={juice.image}
                    alt={juice.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {juice.isPopular && (
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-olive shadow-sm">
                      Highly Requested
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                    <span className="text-white font-bold flex items-center">
                      View Ingredients
                    </span>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-bold text-sage-dark">{juice.name}</h3>
                  <p className="text-gray-500 italic text-sm">{juice.benefits}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {juices.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No products added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
