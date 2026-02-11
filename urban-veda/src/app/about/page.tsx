// about page - server-side rendered with enhanced content
import { Metadata } from 'next';
import Image from 'next/image';
import connectDB from '@/lib/mongodb';
import Config from '@/lib/models/config';
import { SiteConfig } from '@/types';
import { Leaf, Heart, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Urban Veda\'s journey from a home kitchen to delivering wellness across Bangalore.',
};

export default async function AboutPage() {
  await connectDB();
  const config = await Config.findOne().lean<SiteConfig>();

  if (!config) {
    return null;
  }

  const content = config.aboutPage;

  return (
    <div className="min-h-screen bg-white">
      {/* main story section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* text content */}
          <div className="space-y-10 animate-fade-in">
            <span className="text-olive font-bold tracking-[0.2em] uppercase text-xs">
              our origins
            </span>
            <h1 className="text-6xl md:text-7xl font-bold text-sage-dark leading-tight font-serif">
              {content.headline}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-light">
              {content.subtext}
            </p>
            <div className="pt-8 border-t border-gray-100 text-sage-dark italic text-2xl font-serif">
              {content.extraText}
            </div>
          </div>

          {/* image */}
          <div className="relative animate-fade-in-delayed">
            <div className="absolute -inset-10 bg-olive/5 rounded-[4rem] blur-3xl opacity-50" />
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
              <Image
                src={content.image}
                alt="About Urban Veda"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* values section - new content */}
      <section className="py-24 px-6 bg-sage-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-sage-dark mb-16 font-serif">
            what drives us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="text-olive" size={32} />,
                title: 'purity first',
                description: 'no preservatives, no shortcuts. just pure herbal extracts.',
              },
              {
                icon: <Heart className="text-olive" size={32} />,
                title: 'small batches',
                description: 'handcrafted daily to ensure maximum freshness and potency.',
              },
              {
                icon: <Users className="text-olive" size={32} />,
                title: 'community care',
                description: 'personalized health consultations for every customer.',
              },
              {
                icon: <Award className="text-olive" size={32} />,
                title: 'transparent process',
                description: 'from sourcing to delivery, complete visibility.',
              },
            ].map((value, i) => (
              <div 
                key={i} 
                className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-olive/10 rounded-2xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-sage-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* founders section - new content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-sage-dark font-serif">
            meet the founders
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            started in 2023 by wellness enthusiasts who wanted to bring authentic 
            ayurvedic wisdom to busy urban professionals. what began as experiments 
            in a small kitchen has grown into a trusted daily ritual for families 
            across sobha city.
          </p>
          <p className="text-gray-500 italic">
            we're not just selling juices – we're sharing a lifestyle.
          </p>
        </div>
      </section>
    </div>
  );
}

export const revalidate = 120;