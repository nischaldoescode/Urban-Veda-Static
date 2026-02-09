
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DISEASES, PRODUCTS } from '../constants';
import { AlertCircle, Leaf, BookOpen, Heart, ArrowLeft } from 'lucide-react';

const DiseaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const disease = DISEASES.find(d => d.id === id);
  const relatedProduct = PRODUCTS.find(p => p.id === disease?.relatedProductId);

  if (!disease) return <div className="p-20 text-center">Condition not found.</div>;

  return (
    <div className="bg-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/awareness" className="inline-flex items-center text-sm font-medium text-olive hover:text-sage-dark mb-12 mt-12 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all conditions
        </Link>

        <article className="space-y-16">
          <header className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-sage-dark">{disease.title}</h1>
            <p className="text-xl text-gray-500 italic max-w-2xl mx-auto">
              "{disease.shortDesc}"
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-sage-gradient p-8 rounded-3xl space-y-4">
              <div className="flex items-center space-x-2 text-olive font-bold uppercase tracking-wider text-xs">
                <BookOpen size={16} />
                <span>Why It Matters</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{disease.whyItMatters}</p>
            </div>
            <div className="border border-gray-100 p-8 rounded-3xl space-y-4">
              <div className="flex items-center space-x-2 text-olive font-bold uppercase tracking-wider text-xs">
                <AlertCircle size={16} />
                <span>Modern Lifestyle Stress</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{disease.modernStressors}</p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-sage-dark">Early Symptoms Often Ignored</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {disease.symptoms.map((s, i) => (
                <div key={i} className="flex items-center p-4 bg-gray-50 rounded-xl space-x-4">
                  <div className="w-2 h-2 rounded-full bg-olive"></div>
                  <span className="text-gray-700 font-medium">{s}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-sage-dark text-white p-12 rounded-[3rem] space-y-8 shadow-2xl">
            <div className="flex items-center space-x-3 text-olive-200">
               <Leaf className="text-olive" />
               <h2 className="text-3xl font-bold serif">The Ayurvedic Perspective</h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed italic">
              {disease.ayurvedicView}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/10">
              {disease.keyHerbs.map((h, i) => (
                <div key={i}>
                  <h4 className="font-bold text-white mb-2">{h.name}</h4>
                  <p className="text-sm text-gray-400">{h.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-sage-dark">Daily Habits That Help</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {disease.habits.map((h, i) => (
                <div key={i} className="text-center p-6 border border-gray-100 rounded-2xl">
                  <Heart className="mx-auto text-olive mb-4" size={24} />
                  <p className="text-gray-700 text-sm font-medium">{h}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedProduct && (
            <section className="pt-16 border-t border-gray-100">
              <div className="bg-sage-gradient p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/3">
                  <img src={relatedProduct.image} className="rounded-2xl shadow-lg w-full h-64 object-cover" alt={relatedProduct.name} />
                </div>
                <div className="md:w-2/3 space-y-4 text-center md:text-left">
                  <span className="text-xs font-bold text-olive tracking-widest uppercase">Herbal Support</span>
                  <h3 className="text-3xl font-bold text-sage-dark">{relatedProduct.name}</h3>
                  <p className="text-gray-600">{relatedProduct.purpose}</p>
                  <Link to={`/products/${relatedProduct.id}`} className="inline-block bg-olive text-white px-8 py-3 rounded-full hover:bg-olive/90 transition-all font-medium mt-4">
                    Explore Support Plan
                  </Link>
                </div>
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

export default DiseaseDetail;
