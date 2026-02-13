// home page - server-side rendered with database data
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Config from '@/lib/models/config';
import Juice from '@/lib/models/Juice';
import { SiteConfig, Juice as JuiceType } from '@/types';
import HeroSection from '@/components/home/HeroSection';
import ChallengesSection from '@/components/home/ChallengesSection';
import ProductPreview from '@/components/home/ProductPreview';
import CTASection from '@/components/home/CTASection';

/**
 * generate metadata for seo optimization
 * fetches config from database for dynamic meta tags
 */
export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const config = await Config.findOne().lean();

  return {
    title: 'Home',
    description: config?.metaDescription || 'Ancient wisdom for modern life',
    keywords: config?.metaKeywords?.split(',') || [],
    openGraph: {
      title: config?.heroHeadline || 'Urban Veda',
      description: config?.heroSubtext || '',
      images: [config?.logoImage || '/images/og-image.webp'],
    },
  };
}

/**
 * home page component - server-side rendered
 * fetches configuration and featured products from mongodb
 * converts mongodb objects to plain javascript objects for client components
 */
export default async function HomePage() {
  // connect to database
  await connectDB();
  
  // fetch config and juices in parallel for performance
  const [configDoc, juicesDocs] = await Promise.all([
    Config.findOne().lean(),
    Juice.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(2)
      .lean(),
  ]);

  // serialize mongodb documents to plain objects (remove _id ObjectId)
  const config: SiteConfig | null = configDoc ? {
    logoName: configDoc.logoName,
    logoImage: configDoc.logoImage,
    heroHeadline: configDoc.heroHeadline,
    heroSubtext: configDoc.heroSubtext,
    whatsappLink: configDoc.whatsappLink,
    milkRideSubscribeLink: configDoc.milkRideSubscribeLink,
    announcement: configDoc.announcement,
    metaDescription: configDoc.metaDescription,
    metaKeywords: configDoc.metaKeywords,
    colorPalette: configDoc.colorPalette,
    aboutPage: configDoc.aboutPage,
    philosophyPage: configDoc.philosophyPage,
  } : null;

  // serialize juices array
  const juices: JuiceType[] = juicesDocs.map(doc => ({
    _id: doc._id.toString(), // convert ObjectId to string
    name: doc.name,
    ingredients: doc.ingredients,
    benefits: doc.benefits,
    description: doc.description,
    image: doc.image,
    orderLink: doc.orderLink,
    isPopular: doc.isPopular || false,
    sortOrder: doc.sortOrder || 0,
    isActive: doc.isActive !== false,
  }));

  // fallback if no config exists
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">loading configuration...</p>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      {/* hero section with dynamic content */}
      <HeroSection config={config} />

      {/* lifestyle challenges section */}
      <ChallengesSection />

      {/* featured products preview */}
      <ProductPreview juices={juices} />

      {/* call to action quote */}
      <CTASection />
    </main>
  );
}

// revalidate this page every 60 seconds for fresh content
export const revalidate = 60;