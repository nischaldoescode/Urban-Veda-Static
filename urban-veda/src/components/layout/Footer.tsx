// footer component with links and info - fixed typescript
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf, Instagram, Facebook, Twitter } from "lucide-react";

interface FooterProps {
  config: {
    logoName: string;
    whatsappLink: string;
  };
}

// define proper type for footer links
type FooterLink = {
  name: string;
  path: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

export default function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks: FooterSection[] = [
    {
      title: "explore",
      links: [
        { name: "our juices", path: "/products", external: false },
        { name: "philosophy", path: "/philosophy", external: false },
        { name: "about us", path: "/about", external: false },
        { name: "contact", path: "/contact", external: false },
      ],
    },
    {
      title: "connect",
      links: [
        {
          name: "whatsapp community",
          path: config.whatsappLink,
          external: true,
        },
        { name: "instagram", path: "#", external: true },
        { name: "facebook", path: "#", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-sage-bg border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* brand section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="bg-olive p-2.5 rounded-xl text-white">
                <Leaf size={24} />
              </div>
              <span className="font-serif text-3xl font-bold text-sage-dark">
                {config.logoName}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 leading-relaxed max-w-md"
            >
              bringing ancient ayurvedic wisdom to modern urban lifestyles.
              freshly cold-pressed herbal juices delivered daily to sobha city.
            </motion.p>

            {/* social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-olive hover:text-white p-3 rounded-xl transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
                  </g>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* footer links */}
          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="space-y-6"
            >
              <h3 className="font-bold text-sage-dark uppercase tracking-widest text-sm">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-olive transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        className="text-gray-600 hover:text-olive transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {currentYear} {config.logoName}. ancient wisdom for a modern
            world.
          </p>

          <Link
            href="/admin"
            className="text-xs text-gray-300 hover:text-gray-500 transition-colors uppercase tracking-widest"
          >
            management portal
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
