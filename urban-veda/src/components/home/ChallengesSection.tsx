"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Zap,
  Brain,
  Leaf,
  Wind,
  Moon,
  Droplets,
  FlameKindling,
  Eye,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Variants } from "framer-motion";

// icon map for admin to reference
export const iconMap: Record<string, React.ComponentType<any>> = {
  Zap,
  ShieldCheck,
  HeartPulse,
  Brain,
  Leaf,
  Sparkles,
  Wind,
  Moon,
  Droplets,
  FlameKindling,
  Eye,
  Heart,
};

export interface Challenge {
  icon: string;
  title: string;
  description: string;
  color: string;
  colorHex?: string;
  iconColor: string;
}

const defaultChallenges: Challenge[] = [
  {
    icon: "Zap",
    title: "chronic fatigue",
    description:
      "long hours & screen time lead to constant tiredness. our herbs reset your energy levels naturally.",
    color: "from-yellow-50 to-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: "ShieldCheck",
    title: "weak immunity",
    description:
      "pollution & stress weaken your shield. giloy and amla provide your daily insurance against falling sick.",
    color: "from-blue-50 to-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    icon: "HeartPulse",
    title: "poor gut health",
    description:
      "irregular meals & fast food cause bloating. aloe vera & ginger restore your agni (digestive fire).",
    color: "from-pink-50 to-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: "Brain",
    title: "mental fog",
    description:
      "constant multitasking clouds your focus. brahmi and ashwagandha sharpen mental clarity.",
    color: "from-purple-50 to-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: "Leaf",
    title: "toxin buildup",
    description:
      "processed foods accumulate in your system. our detox blends help eliminate ama (toxins).",
    color: "from-green-50 to-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: "Sparkles",
    title: "dull skin",
    description:
      "stress and pollution take a toll on your glow. antioxidant-rich juices rejuvenate from within.",
    color: "from-amber-50 to-yellow-50",
    iconColor: "text-amber-600",
  },
];

interface ChallengesSectionProps {
  challenges?: Challenge[];
  sectionLabel?: string;
  sectionHeadline?: string;
  sectionSubtext?: string;
  colorHex?: string;
}
export default function ChallengesSection({
  challenges = defaultChallenges,
  sectionLabel,
  sectionHeadline,
  sectionSubtext,
}: ChallengesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as any },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-white px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block text-olive font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3">
            {sectionLabel || "modern problems"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-dark mb-4 font-serif whitespace-pre-line">
            {sectionHeadline || "lifestyle challenges"}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto italic font-medium whitespace-pre-line">
            {sectionSubtext ||
              "your busy lifestyle deserves better health support"}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {challenges.map((challenge, i) => {
            const Icon = iconMap[challenge.icon] || Sparkles;

            return (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full border-gray-100 hover:border-olive/30 hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-default">
                  <CardContent className="p-6 lg:p-7">
                    <div
                      className={`mb-4 bg-gradient-to-br ${challenge.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={challenge.iconColor} size={22} />
                    </div>

                    <h3 className="text-base lg:text-lg font-bold mb-2 text-sage-dark">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {challenge.description}
                    </p>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.7, delay: 0.4 + i * 0.08 }}
                      className="h-0.5 bg-gradient-to-r from-olive to-herbal-green mt-4 rounded-full"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
