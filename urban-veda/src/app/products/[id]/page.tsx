// individual product detail page - dynamically generated with ssg
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import Config from "@/lib/models/config";
import Juice from "@/lib/models/Juice";
import { Juice as JuiceType, SiteConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ImageModal from "@/components/products/ImageModal";

// generate metadata for each product page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  await connectDB();

  const juice = await Juice.findById(id).lean<JuiceType>();

  if (!juice) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: juice.name,
    description: juice.benefits,
    openGraph: {
      title: juice.name,
      description: juice.description,
      images: [juice.image],
    },
  };
}

// generate static paths for all products at build time
export async function generateStaticParams() {
  await connectDB();
  const juices = await Juice.find({ isActive: true }).select("_id").lean();

  return juices.map((juice) => ({
    id: juice._id.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  // fetch product and config
  const [juice, config] = await Promise.all([
    Juice.findById(id).lean<JuiceType>(),
    Config.findOne().lean<SiteConfig>(),
  ]);

  // show 404 if product not found
  if (!juice) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* back navigation */}
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-bold text-olive mb-12 hover:text-olive/80 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          browse all elixirs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* product image with 3D sticker + modal trigger */}
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] group">
            <ImageModal
              src={juice.image}
              alt={juice.name}
              stickerSrc={juice.stickerImage}
            />
            <Image
              src={juice.image}
              alt={juice.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* 3D sticker overlay */}
            {juice.stickerImage && (
              <div
                className="absolute top-6 right-6 w-20 h-20 sm:w-24 sm:h-24 z-10"
                style={{
                  filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))",
                  transform: "rotate(8deg)",
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <Image
                  src={juice.stickerImage}
                  alt="product sticker"
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* organic badge overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <Card className="bg-white/90 backdrop-blur-xl border-none">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 text-olive mb-2">
                    <Sparkles size={20} />
                    <span className="font-bold text-xs uppercase tracking-widest">
                      100% organic extracts
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 italic">
                    freshly cold-pressed every morning in small batches
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* product details */}
          <div className="space-y-12">
            {/* header */}
            <header className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-sage-dark leading-tight font-serif">
                {juice.name}
              </h1>
              <p className="text-2xl text-olive italic font-serif">
                {juice.benefits}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                {juice.description}
              </p>
            </header>

            {/* ingredients section */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-sage-dark flex items-center">
                <ShieldCheck className="mr-2 text-olive" />
                powerful herbs inside
              </h3>
              <div className="flex flex-wrap gap-3">
                {juice.ingredients.split(",").map((ing, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="px-5 py-2.5 text-sm font-medium border-gray-200"
                  >
                    {ing.trim()}
                  </Badge>
                ))}
              </div>
            </section>

            {/* order section */}
            <div className="pt-8 border-t border-gray-100 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  pricing & subscription
                </p>
                <p className="text-2xl font-bold text-sage-dark">
                  available for daily morning delivery
                </p>
              </div>

              {/* whatsapp order button */}

              <a
                href={juice.orderLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="w-full bg-olive hover:bg-olive/90 text-white font-bold rounded-full h-14 text-base"
                >
                  <MessageCircle className="mr-2" size={20} />
                  request trial pack via whatsapp
                </Button>
              </a>
            </div>

            {/* milk ride subscription link */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">
                or subscribe for regular delivery
              </p>
              <a
                href={config?.milkRideSubscribeLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive hover:text-olive/80 font-semibold underline underline-offset-4 text-sm"
              >
                subscribe on milk ride →
              </a>
            </div>

            <p className="text-xs text-gray-400 text-center px-8 italic whitespace-pre-line">
              {config?.productOrderNote ||
                "ordering is currently handled via whatsapp for customized health goals and subscription coordination in sobha city"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// revalidate product pages every 5 minutes
export const revalidate = 300;
