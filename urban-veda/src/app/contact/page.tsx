// contact page - with form and animations
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { Variants } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
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
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-bg">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-olive font-bold tracking-[0.2em] uppercase text-xs mb-4">
            get in touch
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-sage-dark mb-6 font-serif">
            let's connect
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            have questions about our juices? want to start your wellness
            journey? we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* contact information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-sage-dark mb-8 font-serif">
                reach out directly
              </h2>
            </motion.div>

            {/* contact cards */}
            <motion.div variants={itemVariants}>
              <Card className="border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-olive/10 p-4 rounded-2xl group-hover:bg-olive/20 transition-colors">
                      <Phone className="text-olive" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sage-dark mb-2">phone</h3>
                      <a
                        href="tel:+918123456789"
                        className="text-gray-600 hover:text-olive transition-colors"
                      >
                        +91 81234 56789
                      </a>
                      <p className="text-sm text-gray-400 mt-1">
                        mon-sat, 8am-8pm
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-olive/10 p-4 rounded-2xl group-hover:bg-olive/20 transition-colors">
                      <Mail className="text-olive" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sage-dark mb-2">email</h3>
                      <a
                        href="mailto:hello@urbanveda.com"
                        className="text-gray-600 hover:text-olive transition-colors"
                      >
                        hello@urbanveda.com
                      </a>
                      <p className="text-sm text-gray-400 mt-1">
                        we respond within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-olive/10 p-4 rounded-2xl group-hover:bg-olive/20 transition-colors">
                      <MapPin className="text-olive" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sage-dark mb-2">
                        location
                      </h3>
                      <p className="text-gray-600">sobha city, bangalore</p>
                      <p className="text-sm text-gray-400 mt-1">
                        currently serving sobha city residents
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* whatsapp community */}
            <motion.div variants={itemVariants} className="pt-8">
              <Card className="bg-gradient-to-br from-green-50 to-olive/5 border-green-100">
                <CardContent className="p-8">
                  <h3 className="font-bold text-sage-dark mb-3">
                    join our whatsapp community
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    get daily wellness tips, exclusive offers, and connect with
                    other health enthusiasts in your neighborhood.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Phone className="mr-2" size={18} />
                      join now on whatsapp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-gray-100 shadow-2xl">
              <CardContent className="p-10">
                <h2 className="text-2xl font-bold text-sage-dark mb-8 font-serif">
                  send us a message
                </h2>

                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-20"
                  >
                    <CheckCircle2
                      className="mx-auto text-green-600 mb-6"
                      size={64}
                    />
                    <h3 className="text-2xl font-bold text-sage-dark mb-2">
                      message sent!
                    </h3>
                    <p className="text-gray-600">
                      we'll get back to you within 24 hours
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        full name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="your name"
                        className="h-12 border-gray-200 focus:border-olive focus:ring-olive"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        email address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="h-12 border-gray-200 focus:border-olive focus:ring-olive"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        phone number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 xxxxx xxxxx"
                        className="h-12 border-gray-200 focus:border-olive focus:ring-olive"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        your message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="tell us about your health goals or questions..."
                        rows={6}
                        className="border-gray-200 focus:border-olive focus:ring-olive resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-olive hover:bg-olive/90 text-white font-bold text-base"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2" size={20} />
                          send message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
