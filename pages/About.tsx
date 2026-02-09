
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold text-sage-dark mb-6">About the Founders</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From a personal healing journey to a community-focused health brand based in Bangalore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <img src="https://picsum.photos/seed/founders/800/600" className="rounded-3xl shadow-lg order-2 md:order-1" alt="Founders" />
          <div className="space-y-8 order-1 md:order-2">
            <h2 className="text-4xl font-bold text-sage-dark">The Urban Veda Story</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Urban Veda started in a small home kitchen in Bangalore. After witnessing how lifestyle diseases were affecting urban professionals—our friends, family, and colleagues—we realized that most "solutions" were just pills.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              We decided to look back at our heritage. By combining raw, fresh Ayurvedic herbs into potent juices, we found a way to bridge the gap between ancient health rituals and modern schedules.
            </p>
          </div>
        </div>

        <div className="bg-sage-gradient p-12 lg:p-20 rounded-[4rem] border border-gray-100">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                 <h4 className="text-3xl font-bold text-sage-dark mb-4">Small Batches</h4>
                 <p className="text-gray-600">Freshly made every morning in our Bangalore facility to ensure potency.</p>
              </div>
              <div>
                 <h4 className="text-3xl font-bold text-sage-dark mb-4">Urban Families</h4>
                 <p className="text-gray-600">Designed for professionals and families who value their health in the city.</p>
              </div>
              <div>
                 <h4 className="text-3xl font-bold text-sage-dark mb-4">Transparency</h4>
                 <p className="text-gray-600">Know exactly what's inside. No hidden chemicals or sweeteners.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
