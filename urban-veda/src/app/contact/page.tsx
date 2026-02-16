"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { Variants } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";

interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  hours: string;
  whatsappLink: string;
  contactPageBgColor?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+91 81234 56789",
    email: "hello@urbanveda.com",
    location: "sobha city, bangalore",
    hours: "mon-sat, 8am-8pm",
    whatsappLink: "https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M",
    contactPageBgColor: undefined,
  });

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setContactInfo({
            phone: data.data.contactInfo?.phone || "+91 81234 56789",
            email: data.data.contactInfo?.email || "hello@urbanveda.com",
            location:
              data.data.contactInfo?.location || "sobha city, bangalore",
            hours: data.data.contactInfo?.hours || "mon-sat, 8am-8pm",
            whatsappLink: data.data.whatsappLink,
            contactPageBgColor: data.data.contactPageBgColor,
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as any },
    },
  };

  const infoCards = [
    {
      icon: Phone,
      title: "phone",
      main: contactInfo.phone,
      sub: contactInfo.hours,
      href: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      title: "email",
      main: contactInfo.email,
      sub: "we respond within 24 hours",
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: MapPin,
      title: "location",
      main: contactInfo.location,
      sub: "currently delivering here",
      href: undefined,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: contactInfo.contactPageBgColor || "transparent",
        backgroundImage: contactInfo.contactPageBgColor
          ? "none"
          : "linear-gradient(to bottom, white, #f7f9f7)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <ScrollReveal delay={0.2}>
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="text-center mb-10 sm:mb-12"
          >
            <span className="inline-block text-olive font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3">
              get in touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-dark mb-3 font-serif">
              let's connect
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
              have questions about our juices? want to start your wellness
              journey? we'd love to hear from you.
            </p>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {/* whatsapp — centered prominent */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mb-8 sm:mb-10"
          >
            <div className="max-w-md mx-auto bg-gradient-to-br from-green-50 via-white to-olive/5 border border-green-100 rounded-2xl p-6 sm:p-7 text-center shadow-sm">
              <div className="bg-green-100 w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="text-green-600" size={22} />
              </div>
              <h3 className="font-bold text-sage-dark text-base mb-1.5">
                join our whatsapp community
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 max-w-xs mx-auto">
                daily wellness tips, exclusive offers, and connect with health
                enthusiasts in your neighborhood.
              </p>
              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-full text-sm">
                  <Phone className="mr-1.5" size={14} />
                  join on whatsapp
                </Button>
              </a>
            </div>
          </motion.div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <ScrollReveal delay={0.15} direction="left">
            {/* info cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="space-y-3"
            >
              <motion.h2
                variants={itemVariants}
                className="text-xl font-bold text-sage-dark font-serif mb-4"
              >
                reach out directly
              </motion.h2>
              {infoCards.map(({ icon: Icon, title, main, sub, href }) => (
                <motion.div key={title} variants={itemVariants}>
                  <Card className="border-gray-100 hover:shadow-md hover:border-olive/20 transition-all group">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-olive/10 p-2.5 rounded-xl group-hover:bg-olive/20 transition-colors flex-shrink-0">
                          <Icon className="text-olive" size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {title}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              className="text-sm font-semibold text-gray-800 hover:text-olive transition-colors"
                            >
                              {main}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-gray-800">
                              {main}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="right">
            {/* form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <Card className="border-gray-100 shadow-xl">
                <CardContent className="p-5 sm:p-7">
                  <h2 className="text-lg sm:text-xl font-bold text-sage-dark mb-5 font-serif">
                    send us a message
                  </h2>

                  {isSuccess ? (
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-14"
                    >
                      <CheckCircle2
                        className="mx-auto text-green-600 mb-3"
                        size={48}
                      />
                      <h3 className="text-lg font-bold text-sage-dark mb-1">
                        message sent!
                      </h3>
                      <p className="text-gray-500 text-sm">
                        we'll get back to you within 24 hours
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {[
                        {
                          id: "name",
                          label: "full name",
                          type: "text",
                          placeholder: "your name",
                        },
                        {
                          id: "email",
                          label: "email address",
                          type: "email",
                          placeholder: "you@example.com",
                        },
                        {
                          id: "phone",
                          label: "phone number",
                          type: "tel",
                          placeholder: "+91 xxxxx xxxxx",
                        },
                      ].map(({ id, label, type, placeholder }) => (
                        <div key={id}>
                          <label
                            htmlFor={id}
                            className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide"
                          >
                            {label}
                          </label>
                          <Input
                            id={id}
                            name={id}
                            type={type}
                            required
                            value={formData[id as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="h-10 border-gray-200 focus:border-olive focus:ring-olive text-sm"
                          />
                        </div>
                      ))}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide"
                        >
                          your message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="tell us about your health goals..."
                          rows={4}
                          className="border-gray-200 focus:border-olive focus:ring-olive resize-none text-sm"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 bg-olive hover:bg-olive/90 text-white font-bold rounded-xl text-sm"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send size={14} />
                            send message
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
