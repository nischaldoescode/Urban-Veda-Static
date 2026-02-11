// products listing page - server-side rendered
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/mongodb';
import Config from '@/lib/models/config';
import Juice from '@/lib/models/Juice';
import { Juice as JuiceType, SiteConfig } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// page metadata
export const metadata: Metadata = {
  title: 'Our Juices',
  description: 'Explore our range of 100% natural, preservative-free Ayurvedic herbal juices.',
};

export default async function ProductsPage() {
  await connectDB();

  // fetch all active juices and config
  const [juices, config] = await Promise.all([
    Juice.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean<JuiceType[]>(),
    Config.findOne().lean<SiteConfig>(),
  ]);

  return (
    <>
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* page header */}
        <header className="mb-20 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-sage-dark font-serif">
            Healing Elixirs
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto italic font-medium">
            sip health, skip the hospital. nature's medicine with no side effects.
          </p>
          
          {/* subscription cta */}
          <div className="pt-6 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-600">
              want regular delivery? subscribe through our partner
            </p>
            <a 
              href={config?.milkRideSubscribeLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-olive text-white px-6 py-3 rounded-full font-semibold hover:bg-olive/90 transition-all"
            >
              Subscribe on Milk Ride
              <ArrowRight size={16} />
            </a>
          </div>
        </header>

        {/* products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {juices.map((juice) => (
            <Card 
              key={juice._id.toString()} 
              className="group overflow-hidden border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <Link href={`/products/${juice._id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                  <Image
                    src={juice.image}
                    alt={juice.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={juice.isPopular}
                  />
                  
                  {/* popular badge */}
                  {juice.isPopular && (
                    <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-olive border-olive/20">
                      highly requested
                    </Badge>
                  )}
                </div>
              </Link>

              <CardContent className="p-8 text-center space-y-3">
                <h3 className="text-3xl font-bold text-sage-dark font-serif">
                  {juice.name}
                </h3>
                <p className="text-gray-500 italic text-sm">
                  {juice.benefits}
                </p>
                
                <Link href={`/products/${juice._id}`}>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-olive hover:text-olive/80 font-semibold"
                  >
                    view details →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* empty state */}
        {juices.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>no products available at the moment</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

// revalidate every 2 minutes
export const revalidate = 120;