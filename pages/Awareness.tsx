
import React from 'react';
import { Link } from 'react-router-dom';
import { DISEASES } from '../constants';
import { ChevronRight } from 'lucide-react';

const Awareness: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-sage-dark mb-6">Health Awareness</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Before we heal, we must understand. Explore how modern lifestyles impact specific bodily functions and how ancient wisdom offers support.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISEASES.map((disease) => (
            <Link
              key={disease.id}
              to={`/awareness/${disease.id}`}
              className="group bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold text-sage-dark mb-4 group-hover:text-olive transition-colors">
                {disease.title}
              </h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {disease.shortDesc}
              </p>
              <div className="flex items-center text-sm font-semibold text-olive group-hover:translate-x-2 transition-transform">
                <span>Learn why it matters</span>
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-20 p-12 bg-sage-gradient rounded-[3rem] text-center border border-gray-100">
          <h2 className="text-3xl font-bold text-sage-dark mb-6">Don't see a specific condition?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            We are constantly expanding our research to include more lifestyle-related conditions. Our goal is to provide a holistic view of health.
          </p>
          <button className="bg-olive text-white px-8 py-3 rounded-full hover:bg-olive/90 transition-all">
            Contact for Personal Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
