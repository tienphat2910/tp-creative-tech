import type { Locale, HomeContent, BlogPost, Service, SiteSettings } from '@/types/content';

// Hàm load content từ JSON files
// Cấu trúc này giống như REST API của WordPress
export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  const content = await import(`@/content/${locale}/home.json`);
  return content.default;
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const content = await import(`@/content/${locale}/blog.json`);
  return content.default.posts;
}

export async function getBlogPost(locale: Locale, slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts(locale);
  return posts.find(post => post.slug === slug) || null;
}

export async function getServices(locale: Locale): Promise<Service[]> {
  const content = await import(`@/content/${locale}/services.json`);
  return content.default.services;
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const content = await import(`@/content/${locale}/settings.json`);
  return content.default;
}

// Hàm generate metadata cho SEO - Tương đương wp_head() trong WordPress
export function generateMetadata(seo: { metaTitle: string; metaDescription: string; keywords?: string[]; ogImage?: string }) {
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.join(', '),
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  };
}
