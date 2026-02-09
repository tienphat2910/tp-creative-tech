'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/contexts/LocaleContext';
import type { SiteSettings } from '@/types/content';
import enSettings from '@/content/en/settings.json';
import viSettings from '@/content/vi/settings.json';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Desktop dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Mobile submenu
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  
  // Get settings based on current locale
  const settings = locale === 'vi' ? viSettings : enSettings;

  // Check if menu item is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLocale(locale === 'vi' ? 'en' : 'vi');
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt={settings.siteName}
              width={240}
              height={96}
              priority
              className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto"
            />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden lg:flex items-center space-x-2">
            {settings.menu.map((item) => {
              const active = isActive(item.href);
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      active
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                  >
                  {item.label}
                  {item.children && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Desktop Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute left-0 top-full pt-3 w-64 z-50"
                    >
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                        {item.children.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 transition-colors ${
                                childActive
                                  ? 'text-blue-600 bg-blue-50 font-semibold'
                                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
            })}
          </div>

          {/* Language + CTA (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">{locale === 'vi' ? '🇻🇳' : '🇺🇸'}</span>
              <span className="text-sm font-medium text-gray-700">
                {locale === 'vi' ? 'VI' : 'EN'}
              </span>
            </button>

            <Link
              href="/contact"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {locale === 'vi' ? 'Nhận tư vấn' : 'Get Consultation'}
            </Link>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setOpenMobileSubmenu(null);
            }}
            className="lg:hidden p-2 text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {settings.menu.map((item, index) => {
                  const isOpen = openMobileSubmenu === item.href;
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-2"
                    >
                      <button
                        onClick={() => {
                          if (!item.children) {
                            setIsMobileMenuOpen(false);
                            setOpenMobileSubmenu(null);
                          } else {
                            setOpenMobileSubmenu(isOpen ? null : item.href);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                          active
                            ? 'text-blue-600 bg-blue-50 font-semibold'
                            : 'text-gray-700 hover:bg-blue-50'
                        }`}
                      >
                        <span>{item.label}</span>

                        {item.children && (
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {item.children && isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-6 mt-1 overflow-hidden"
                          >
                            {item.children.map((child, childIndex) => {
                              const childActive = isActive(child.href);
                              return (
                                <motion.div
                                  key={child.href}
                                  initial={{ opacity: 0, x: -15 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: childIndex * 0.05 }}
                                >
                                  <Link
                                    href={child.href}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setOpenMobileSubmenu(null);
                                    }}
                                    className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                                      childActive
                                        ? 'text-blue-600 bg-blue-50 font-semibold'
                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {/* Mobile Footer */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: settings.menu.length * 0.1 }}
                  className="pt-4 border-t"
                >
                  <button
                    onClick={toggleLanguage}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    <span className="text-2xl">{locale === 'vi' ? '🇻🇳' : '🇺🇸'}</span>
                    <span className="font-medium">
                      {locale === 'vi' ? 'Tiếng Việt' : 'English'}
                    </span>
                  </button>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-2 block w-full px-4 py-2.5 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
                  >
                    {locale === 'vi' ? 'Nhận tư vấn' : 'Get Consultation'}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
