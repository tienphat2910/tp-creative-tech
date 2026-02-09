'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';
import { useEffect, useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactContent {
  title: string;
  hotline: string;
  contacts: { phone: string }[];
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { locale } = useLocale();
  const [content, setContent] = useState<ContactContent | null>(null);

  useEffect(() => {
    import(`@/content/${locale}/contact.json`).then((module) => {
      setContent(module.default);
    });
  }, [locale]);

  if (!content) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 16 }}
              className="relative w-full max-w-lg rounded-xl border-2 border-blue-300 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute cursor-pointer -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-300 bg-white text-blue-300 shadow-lg transition-colors hover:bg-blue-300 hover:text-white"
                aria-label="Close"
                type="button"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="rounded-t-lg bg-blue-300 py-4 text-center text-white">
                <h2 className="text-lg font-bold tracking-wide">{content.title}</h2>
              </div>

              <div className="divide-y divide-blue-100 px-6 py-2">
                {content.contacts.map((contact) => (
                  <div key={contact.phone} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-500 text-blue-600">
                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{content.hotline}:</p>
                        <p className="text-lg font-semibold text-blue-600">{contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://zalo.me/${contact.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
                        aria-label={`Zalo ${contact.phone}`}
                      >
                        <Image
                          src="/zalo.svg"
                          alt="Zalo"
                          width={24}
                          height={24}
                          className="w-5 h-5"
                        />
                      </a>
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
                        aria-label={`Call ${contact.phone}`}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}