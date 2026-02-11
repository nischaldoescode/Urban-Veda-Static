// generate dynamic sitemap for seo
import { MetadataRoute } from 'next';
import connectDB from '@/lib/mongodb';
import Juice from '@/lib/models/Juice';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbanveda.com';

  await connectDB();
  
  // fetch all active juices for dynamic routes
  const juices = await Juice.find({ isActive: true }).select('_id updatedAt').lean();

  // static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/philosophy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // dynamic product pages
  const productPages: MetadataRoute.Sitemap = juices.map((juice) => ({
    url: `${baseUrl}/products/${juice._id}`,
    lastModified: juice.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}