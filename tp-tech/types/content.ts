// Types cho content data - Cấu trúc giống CMS để dễ migrate WordPress
export type Locale = 'vi' | 'en';

// Stat Item - For statistics display
export interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

// SEO Metadata - Tương đương với Yoast SEO / RankMath
export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// Blog Post - Tương đương Post type trong WordPress
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featuredImage: string;
  seo: SEOData;
}

// Service - Tương đương Custom Post Type trong WordPress
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  seo?: SEOData;
}

// Home Page Content - Tương đương Page trong WordPress
export interface ProjectImage {
  src: string;
  alt: string;
}

export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    paragraphs: string[];
    ctaText: string;
    ctaPhone: string;
    ctaLink: string;
    backgroundImage?: string;
    image?: string;
  };
  about: {
    title: string;
    content: string;
    points: string[];
    stats: StatItem[];
    viewDetailsText: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  projects?: {
    title: string;
    viewMore: string;
    images: ProjectImage[];
  };
  formContact?: {
    title1: string;
    title2: string;
    companyLabel: string;
    phoneLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    companyPlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  seo: SEOData;
}

// Navigation Menu - Tương đương Menu trong WordPress
export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

// Site Settings - Tương đương Site Options trong WordPress
export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  menu: MenuItem[];
  footer: {
    description: string;
    copyright: string;
    quickLinks: string;
    services: string;
    contact: string;
  };
}
