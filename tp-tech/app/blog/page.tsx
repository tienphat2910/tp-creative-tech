'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/contexts/LocaleContext';
import { Section, FadeIn } from '@/components/Animations';
import type { BlogPost } from '@/types/content';

export default function BlogPage() {
  const { locale } = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    import(`@/content/${locale}/blog.json`)
      .then((m) => setPosts(m.default.posts))
      .catch(console.error);
  }, [locale]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return locale === 'vi'
      ? date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      {/* Header Section */}
      <Section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'vi' ? 'Blog' : 'Blog'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              {locale === 'vi'
                ? 'Chia sẻ kiến thức và xu hướng công nghệ mới nhất'
                : 'Sharing knowledge and latest technology trends'}
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section className="bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                      <time className="text-sm text-gray-500">{formatDate(post.date)}</time>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{post.author}</span>
                      <span className="text-blue-600 font-medium">
                        {locale === 'vi' ? 'Đọc thêm →' : 'Read more →'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
