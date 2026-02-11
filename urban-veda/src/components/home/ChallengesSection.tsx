// lifestyle challenges section with stagger animation
"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Zap,
  Brain,
  Leaf,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Variants } from "framer-motion";
const challenges = [
  {
    icon: Zap,
    title: "chronic fatigue",
    description:
      "long hours & screen time lead to constant tiredness. our herbs reset your energy levels naturally.",
    color: "from-yellow-50 to-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "weak immunity",
    description:
      "pollution & stress weaken your shield. giloy and amla provide your daily insurance against falling sick.",
    color: "from-blue-50 to-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    icon: HeartPulse,
    title: "poor gut health",
    description:
      "irregular meals & fast food cause bloating. aloe vera & ginger restore your agni (digestive fire).",
    color: "from-pink-50 to-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: Brain,
    title: "mental fog",
    description:
      "constant multitasking clouds your focus. brahmi and ashwagandha sharpen mental clarity.",
    color: "from-purple-50 to-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: Leaf,
    title: "toxin buildup",
    description:
      "processed foods accumulate in your system. our detox blends help eliminate ama (toxins).",
    color: "from-green-50 to-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Sparkles,
    title: "dull skin",
    description:
      "stress and pollution take a toll on your glow. antioxidant-rich juices rejuvenate from within.",
    color: "from-amber-50 to-yellow-50",
    iconColor: "text-amber-600",
  },
];

export default function ChallengesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="py-20 lg:py-32 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-olive font-bold tracking-[0.2em] uppercase text-xs mb-4">
            modern problems
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-dark mb-6 font-serif">
            lifestyle challenges
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto italic font-medium">
            your busy lifestyle deserves better health support
          </p>
        </motion.div>

        {/* challenges grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {challenges.map((challenge, i) => {
            const Icon = challenge.icon;

            return (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full border-gray-100 hover:border-olive/20 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-8 lg:p-10">
                    {/* icon container with gradient */}
                    <div
                      className={`mb-6 bg-gradient-to-br ${challenge.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={challenge.iconColor} size={28} />
                    </div>

                    {/* content */}
                    <h3 className="text-xl lg:text-2xl font-bold mb-4 text-sage-dark">
                      {challenge.title}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      {challenge.description}
                    </p>

                    {/* hover indicator */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                      className="h-1 bg-gradient-to-r from-olive to-herbal-green mt-6 rounded-full"
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
