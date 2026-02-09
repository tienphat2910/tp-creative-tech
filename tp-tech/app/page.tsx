'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Section, FadeIn, ScaleIn, SlideIn } from '@/components/Animations';
import ContactModal from '@/components/ContactModal';
import { useLocale } from '@/contexts/LocaleContext';
import type { HomeContent, Service } from '@/types/content';
import { useRef } from 'react';

// Counter animation component
function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  suffix = "" 
}: { 
  from?: number; 
  to: number; 
  duration?: number; 
  suffix?: string;
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(from + (to - from) * easeOut);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  const { locale } = useLocale();
  const [content, setContent] = useState<HomeContent | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preview, setPreview] = useState<{ open: boolean; idx: number }>({ open: false, idx: 0 });

  useEffect(() => {
    // Load content theo locale
    Promise.all([
      import(`@/content/${locale}/home.json`).then((m) => m.default),
      import(`@/content/${locale}/services.json`).then((m) => m.default.services),
    ]).then(([homeData, servicesData]) => {
      setContent(homeData);
      setServices(servicesData);
    });
  }, [locale]);

  if (!content) return null;

  return (
    <>
      {/* Hero Section - 2 Column Layout */}
      <Section className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left Column - Image with Floating Animation */}
            <FadeIn delay={0.2} className="relative order-2 lg:order-1">
              <div className="relative">
                {/* Floating Image */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ zIndex: 1 }}
                  className="relative"
                >
                  <Image
                    src="/images/item.png"
                    alt="Website Design Services"
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </motion.div>

                {/* Background Circle - Positioned Below */}
                <motion.div
                  initial={{ scale: 1, rotate: 0 }}
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-[70%] bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-2xl"
                  style={{ zIndex: 0 }}
                ></motion.div>
              </div>
            </FadeIn>

            {/* Right Column - Content */}
            <div className="order-1 lg:order-2">
              <FadeIn>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {content.hero.title}
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
                  {content.hero.subtitle}
                </p>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {content.hero.description}
                </p>
              </FadeIn>

              {/* Paragraphs */}
              {content.hero.paragraphs && (
                <FadeIn delay={0.3}>
                  <div className="space-y-4 mb-8">
                    {content.hero.paragraphs.map((paragraph: string, index: number) => (
                      <p key={index} className="text-gray-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </FadeIn>
              )}
              
              {/* CTA Button with Phone */}
              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={content.hero.ctaLink}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{content.hero.ctaText} {content.hero.ctaPhone}</span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </Section>

      {/* About Section - Modern Interactive */}
      <Section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-10 w-32 h-32 border border-blue-200 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-40 right-10 w-24 h-24 border-2 border-purple-200 rounded-lg rotate-45"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 0.05, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute bottom-32 left-1/4 w-40 h-40 border border-gray-200 rounded-full"
        />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header Module */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
                  {content.about.title}
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  {content.about.content}
                </p>
                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 w-24 bg-blue-600 mx-auto mt-6 origin-center"
                />
              </motion.div>
            </div>

            {/* Interactive Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.about.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="group relative"
                >
                  {/* Card with hover effects */}
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center h-full relative overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/20">
                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 0.05, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-blue-600 rounded-2xl"
                    />
                    
                    {/* Animated icon container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      <div className="w-16 h-16 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300">
                        <motion.svg
                          className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      </div>
                    </motion.div>
                    
                    {/* Content */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-gray-800 transition-colors duration-300">
                        {point}
                      </h3>
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute -top-2 -right-2 w-6 h-6 border border-gray-200 rounded-full opacity-20"
                    />
                  </div>

                  {/* Number indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + 0.1 * index, duration: 0.4 }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center z-20 shadow-lg"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-20 pt-16 border-t border-gray-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {content.about.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="group cursor-pointer"
                  >
                    <motion.div
                      className="text-3xl md:text-4xl font-bold text-blue-600 mb-2"
                    >
                      <AnimatedCounter 
                        to={stat.number} 
                        duration={2.5} 
                        suffix={stat.suffix}
                      />
                    </motion.div>
                    <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* View Details Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 text-blue-700 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Animated running border */}
                <motion.div
                  initial={{ 
                    background: "conic-gradient(from 0deg, transparent, transparent, transparent, transparent)" 
                  }}
                  whileHover={{ 
                    background: [
                      "conic-gradient(from 0deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 90deg, #3b82f6, transparent, transparent, transparent)", 
                      "conic-gradient(from 180deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 270deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 360deg, #3b82f6, transparent, transparent, transparent)"
                    ]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-full p-[2px]"
                >
                  <div className="w-full h-full bg-white rounded-full" />
                </motion.div>
                
                {/* Icon and text */}
                <motion.div
                  className="relative z-10 flex items-center gap-3"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="w-5 h-5 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{content.about.viewDetailsText}</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Services Section - Modern Interactive Design */}
      <Section className="bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500 rounded-full blur-3xl"
        />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 0.3, y: 0 }}
            transition={{ 
              duration: 3, 
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className={`absolute w-2 h-2 bg-gray-300 rounded-full ${
              i % 2 === 0 ? 'top-20' : 'bottom-20'
            }`}
            style={{
              left: `${20 + i * 15}%`,
            }}
          />
        ))}

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Header with Parallax Effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div
              whileInView={{ scale: [0.95, 1.05, 1] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="relative inline-block"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {content.services.title}
              </h2>
              
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="h-1 bg-blue-500 mx-auto rounded-full"
                style={{ width: '60%' }}
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed"
            >
              {content.services.subtitle}
            </motion.p>
          </motion.div>

          {/* Interactive Services Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative"
                >
                  {/* Service Card */}
                  <motion.div
                    whileHover={{ 
                      y: -4,
                      scale: 1.01
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative h-full"
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-8 h-full relative hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                      
                      {/* Floating Number Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="absolute -top-3 -right-3 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-20"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.div>

                      {/* Service Thumbnail - Full Width với tỷ lệ đúng */}
                      <motion.div
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="mb-8"
                      >
                        <div className="w-full h-48 rounded-xl overflow-hidden">
                          <Image
                            src={`/images/thumb${index + 1}.png`}
                            alt={service.title}
                            width={1248}
                            height={832}
                            quality={95}
                            className="w-full h-full object-cover"
                            priority={index < 2}
                          />
                        </div>
                      </motion.div>

                      {/* Content Area */}
                      <div className="relative z-10">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          className="text-lg font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                          {service.title}
                        </motion.h3>
                        
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className="text-gray-600 leading-relaxed mb-4 text-sm">
                          {service.description}
                        </motion.p>

                        {/* Feature List */}
                        <motion.ul 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          className="space-y-2 mb-4">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-gray-600 text-sm">
                              <svg
                                className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </motion.ul>

                        {/* CTA Button */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white text-sm transition-colors duration-200 cursor-pointer"
                            onClick={() => setIsContactOpen(true)}
                            type="button"
                          >
                            <span className="flex items-center justify-center gap-2">
                              {locale === 'vi' ? 'Liên hệ tư vấn' : 'Contact Us'}
                              <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </span>
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          
        </div>
      </Section>

      {/* Project Section - 4 Images with Preview */}
      <Section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-400 rounded-full blur-3xl"
        />
        {/* Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 0.2, y: 0 }}
            transition={{ 
              duration: 3, 
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className={`absolute w-2 h-2 bg-gray-300 rounded-full ${i % 2 === 0 ? 'top-24' : 'bottom-24'}`}
            style={{ left: `${25 + i * 15}%` }}
          />
        ))}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
              dangerouslySetInnerHTML={{
                __html: (content.projects?.title || (locale === 'vi' ? 'Với hơn 30+ dự án thành công' : 'With over 30+ successful projects'))
                  .replace(/(30\+|30\s*\+)/g, match => `<span class='text-blue-600 font-extrabold'>${match}</span>`)
              }}
            />
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="h-1 bg-blue-500 mx-auto rounded-full"
              style={{ width: '60%' }}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 md:gap-6"
          >
            {(content.projects?.images || [
              { src: '/images/tianlong.webp', alt: 'Tianlong Project' },
              { src: '/images/explore-vietnam.webp', alt: 'Explore Vietnam Project' },
              { src: '/images/lutrip.jpeg', alt: 'Lutrip Project' },
              { src: '/images/smartdental.jpeg', alt: 'Smart Dental Project' },
            ]).map((img: { src: string; alt: string }, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={416}
                  height={176}
                  className="w-64 h-44 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setPreview({ open: true, idx })}
                  style={{ maxWidth: '260px' }}
                  quality={90}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Image Preview Modal */}
          {preview.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setPreview({ open: false, idx: 0 })}>
              <div className="relative" onClick={e => e.stopPropagation()}>
                <Image
                  src={content.projects?.images?.[preview.idx]?.src || [
                    '/images/tianlong.webp',
                    '/images/explore-vietnam.webp',
                    '/images/lutrip.jpeg',
                    '/images/smartdental.jpeg',
                  ][preview.idx]}
                  alt={content.projects?.images?.[preview.idx]?.alt || ''}
                  width={900}
                  height={600}
                  className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl"
                  quality={95}
                  loading="eager"
                />
                <button
                  className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition"
                  onClick={() => setPreview({ open: false, idx: 0 })}
                  aria-label="Close preview"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                {/* Prev/Next buttons */}
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition"
                  onClick={() => setPreview(p => ({ open: true, idx: (p.idx + 3) % 4 }))}
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition"
                  onClick={() => setPreview(p => ({ open: true, idx: (p.idx + 1) % 4 }))}
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </Section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Contact Form Section */}
      <Section className="bg-white py-20">
        <div className="container mx-auto px-4 relative">
          
          <div className="max-w-5xl mx-auto bg-blue-50 ring-1 ring-black/5 rounded-2xl shadow-xl p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 relative overflow-hidden">

            {/* Left: Title */}
            <div className="mb-8 md:mb-0">
              {/* Animated Images - Above Form */}
          <div className="flex justify-start mt-[-1.5rem] mb-1 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="flex flex-row gap-2 md:gap-4 items-end"
            >
              <motion.img
                src="/images/cloud.png"
                alt="cloud"
                className="w-16 md:w-24 drop-shadow-lg"
                initial={{ y: 0 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ pointerEvents: 'none' }}
              />
              <motion.img
                src="/images/cloud.png"
                alt="cloud"
                className="w-14 md:w-20 drop-shadow-lg"
                initial={{ y: 0 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ pointerEvents: 'none' }}
              />
            </motion.div>
          </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {content.formContact?.title1 || (locale === 'vi' ? 'Xây dựng website chuyên nghiệp' : 'Build a professional website')}
              </h2>
              <div className="text-blue-600 text-xl md:text-2xl font-extrabold">
                {content.formContact?.title2 || (locale === 'vi' ? 'Cùng TP Creative Tech ngay' : 'With TP Creative Tech now')}
              </div>
            </div>
            {/* Right: Form */}
            <form
              className="space-y-6"
              autoComplete="off"
              method="POST"
              data-netlify="true"
              name="contact"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {content.formContact?.companyLabel || (locale === 'vi' ? 'Tên công ty/doanh nghiệp' : 'Company/Business Name')}
                </label>
                <input type="text" name="company" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder={content.formContact?.companyPlaceholder || (locale === 'vi' ? 'VD: Công ty ABC' : 'e.g. ABC Company')} />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {content.formContact?.phoneLabel || (locale === 'vi' ? 'SĐT Liên Hệ' : 'Contact Phone')}
                </label>
                <input type="tel" name="phone" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder={content.formContact?.phonePlaceholder || (locale === 'vi' ? 'VD: 0901234567' : 'e.g. 0901234567')} />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {content.formContact?.emailLabel || 'Email'}
                </label>
                <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder={content.formContact?.emailPlaceholder || 'e.g. info@company.com'} />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {content.formContact?.messageLabel || (locale === 'vi' ? 'Lời nhắn' : 'Message')}
                </label>
                <textarea name="message" rows={4} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none" placeholder={content.formContact?.messagePlaceholder || (locale === 'vi' ? 'VD: Tôi muốn làm website giới thiệu công ty...' : 'e.g. I want a company website...')} />
              </div>
              <button
                type="submit"
                className="group cursor-pointer relative inline-flex items-center gap-3 w-full px-8 py-4 bg-white border-2 border-gray-200 text-blue-700 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Animated running border */}
                <motion.div
                  initial={{ 
                    background: "conic-gradient(from 0deg, transparent, transparent, transparent, transparent)" 
                  }}
                  whileHover={{ 
                    background: [
                      "conic-gradient(from 0deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 90deg, #3b82f6, transparent, transparent, transparent)", 
                      "conic-gradient(from 180deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 270deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 360deg, #3b82f6, transparent, transparent, transparent)"
                    ]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-full p-[2px]"
                >
                  <div className="w-full h-full bg-white rounded-full" />
                </motion.div>
                
                {/* Icon and text */}
                <motion.div
                  className="cursor-pointer relative z-10 flex items-center justify-center gap-3 w-full"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  
                  <span className="text-base md:text-lg">{content.formContact?.submitLabel || (locale === 'vi' ? 'Tư vấn báo giá' : 'Request a Quote')}</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/images/send.png"
                      alt="send"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </motion.div>
                </motion.div>
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}