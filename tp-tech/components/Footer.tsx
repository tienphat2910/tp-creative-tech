'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import type { SiteSettings } from '@/types/content';
import enSettings from '@/content/en/settings.json';
import viSettings from '@/content/vi/settings.json';

export default function Footer() {
  const { locale } = useLocale();
  const settings = locale === 'vi' ? viSettings : enSettings;
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TP</span>
              </div>
              <span className="font-bold text-xl text-white">{settings.siteName}</span>
            </div>
            <p className="text-sm leading-relaxed">{settings.footer.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{settings.footer.quickLinks}</h3>
            <nav className="space-y-2">
              {settings.menu.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{settings.footer.services}</h3>
            <nav className="space-y-2">
              {settings.menu
                .find((item) => item.children)
                ?.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block text-sm hover:text-blue-400 transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{settings.footer.contact}</h3>
            <address className="not-italic space-y-2 text-sm">
              <p>{settings.contact.address}</p>
              <p>
                <a href={`tel:${settings.contact.phone}`} className="hover:text-blue-400 transition-colors">
                  {settings.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${settings.contact.email}`} className="hover:text-blue-400 transition-colors">
                  {settings.contact.email}
                </a>
              </p>
            </address>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {settings.social.facebook && (
                <a
                  href={settings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {settings.social.linkedin && (
                <a
                  href={settings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>{settings.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
