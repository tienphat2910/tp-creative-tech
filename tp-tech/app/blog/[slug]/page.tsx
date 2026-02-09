'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/contexts/LocaleContext';
import { FadeIn } from '@/components/Animations';
import type { BlogPost } from '@/types/content';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale } = useLocale();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const blogData = await import(`@/content/${locale}/blog.json`);
        const posts = blogData.default.posts;
        const foundPost = posts.find((p: BlogPost) => p.slug === params.slug);

        if (foundPost) {
          setPost(foundPost);
          // Get related posts (same category)
          const related = posts
            .filter((p: BlogPost) => p.category === foundPost.category && p.id !== foundPost.id)
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          router.push('/blog');
        }
      } catch (error) {
        console.error('Error loading post:', error);
        router.push('/blog');
      }
    };

    loadPost();
  }, [locale, params.slug, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return locale === 'vi'
      ? date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!post) return null;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              {locale === 'vi' ? 'Trang chủ' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <header className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  {post.category}
                </span>
                <time className="text-gray-600">{formatDate(post.date)}</time>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-4 text-gray-600">
                <span>{locale === 'vi' ? 'Tác giả:' : 'Author:'} {post.author}</span>
                <span>•</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-sm text-gray-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {locale === 'vi' ? 'Thẻ:' : 'Tags:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-50 border-t">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  {locale === 'vi' ? 'Bài viết liên quan' : 'Related Articles'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <time className="text-xs text-gray-500">{formatDate(relatedPost.date)}</time>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
