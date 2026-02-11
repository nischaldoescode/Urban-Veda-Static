// featured products preview with hover effects
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Juice } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductPreviewProps {
  juices: Juice[];
}

export default function ProductPreview({ juices }: ProductPreviewProps) {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-sage-bg to-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* section header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-olive font-bold tracking-[0.2em] uppercase text-xs mb-4">
              signature collection
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-dark font-serif">
              fresh every morning
            </h2>
            <p className="text-gray-500 mt-3 text-lg">
              100% preservative-free. delivered to sobha city.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <Link href="/products">
              <Button 
                variant="outline"
                className="border-2 border-olive text-olive hover:bg-olive hover:text-white font-bold px-6 py-3 rounded-full group"
              >
                view all juices
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* products grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {juices.slice(0, 2).map((juice, i) => (
            <motion.div
              key={juice._id.toString()}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <Link href={`/products/${juice._id}`}>
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* image section */}
                    <div className="relative md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
                      <Image
                        src={juice.image}
                        alt={juice.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <Badge className="bg-white/90 text-olive backdrop-blur-sm border-none">
                          <Sparkles className="mr-1" size={14} />
                          fresh today
                        </Badge>
                      </div>
                    </div>

                    {/* content section */}
                    <div className="md:w-1/2 p-8 lg:p-10 flex flex-col justify-center space-y-4">
                      <h3 className="text-3xl lg:text-4xl font-bold text-sage-dark font-serif group-hover:text-olive transition-colors">
                        {juice.name}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-500 italic line-clamp-2">
                        {juice.benefits}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {juice.description}
                      </p>
                      
                      <div className="pt-4">
                        <span className="inline-flex items-center text-olive font-bold group-hover:gap-2 transition-all">
                          explore blend
                          <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* mobile view all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:hidden mt-12 text-center"
        >
          <Link href="/products">
            <Button 
              variant="outline"
              className="border-2 border-olive text-olive hover:bg-olive hover:text-white font-bold px-8 py-4 rounded-full"
            >
              view all juices
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}