import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TP Creative Tech - Thiết kế website chuyên nghiệp",
  description: "TP Creative Tech cung cấp dịch vụ thiết kế website chuyên nghiệp, phát triển ứng dụng web và giải pháp công nghệ toàn diện cho doanh nghiệp. Hơn 3 năm kinh nghiệm, 30+ dự án thành công.",
  keywords: ["thiết kế website", "phát triển web", "TP Creative Tech", "website chuyên nghiệp", "công nghệ", "doanh nghiệp"],
  authors: [{ name: "TP Creative Tech" }],
  creator: "TP Creative Tech",
  publisher: "TP Creative Tech",
  robots: "index, follow",
  openGraph: {
    title: "TP Creative Tech - Thiết kế website chuyên nghiệp",
    description: "TP Creative Tech cung cấp dịch vụ thiết kế website chuyên nghiệp, phát triển ứng dụng web và giải pháp công nghệ toàn diện cho doanh nghiệp. Hơn 3 năm kinh nghiệm, 30+ dự án thành công.",
    images: [
      {
        url: '/images/preview.png',
        width: 1200,
        height: 630,
        alt: 'TP Creative Tech - Thiết kế website chuyên nghiệp',
      }
    ],
    type: 'website',
    locale: 'vi_VN',
    siteName: 'TP Creative Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TP Creative Tech - Thiết kế website chuyên nghiệp",
    description: "TP Creative Tech cung cấp dịch vụ thiết kế website chuyên nghiệp, phát triển ứng dụng web và giải pháp công nghệ toàn diện cho doanh nghiệp. Hơn 3 năm kinh nghiệm, 30+ dự án thành công.",
    images: ['/images/preview.png'],
    creator: '@tpcreativetech',
    site: '@tpcreativetech',
  },
  facebook: {
    appId: 'your-facebook-app-id', // Replace with actual Facebook App ID
  },
  other: {
    // Zalo sharing
    'zalo:title': 'TP Creative Tech - Thiết kế website chuyên nghiệp',
    'zalo:description': 'TP Creative Tech cung cấp dịch vụ thiết kế website chuyên nghiệp, phát triển ứng dụng web và giải pháp công nghệ toàn diện cho doanh nghiệp.',
    'zalo:image': '/images/preview.png',
    
    // LinkedIn sharing
    'linkedin:title': 'TP Creative Tech - Thiết kế website chuyên nghiệp',
    'linkedin:description': 'TP Creative Tech cung cấp dịch vụ thiết kế website chuyên nghiệp, phát triển ứng dụng web và giải pháp công nghệ toàn diện cho doanh nghiệp.',
    'linkedin:image': '/images/preview.png',
    
    // Instagram (uses Open Graph)
    'instagram:title': 'TP Creative Tech - Thiết kế website chuyên nghiệp',
    'instagram:description': 'Dịch vụ thiết kế website chuyên nghiệp 🚀 30+ dự án thành công ✨ Liên hệ ngay!',
    'instagram:image': '/images/preview.png',
    
    // WhatsApp sharing (uses Open Graph)
    'whatsapp:title': 'TP Creative Tech - Thiết kế website chuyên nghiệp',
    'whatsapp:description': 'TP Creative Tech cung cấp dịch vụ thiết kế website chuyên nghiệp cho doanh nghiệp',
    'whatsapp:image': '/images/preview.png',
    
    // Telegram sharing
    'telegram:title': 'TP Creative Tech - Thiết kế website chuyên nghiệp',
    'telegram:description': 'TP Creative Tech cung cấp dịch vụ thiết kế website chuyên nghiệp, phát triển ứng dụng web và giải pháp công nghệ toàn diện cho doanh nghiệp.',
    'telegram:image': '/images/preview.png',
    
    // Pinterest
    'pinterest:title': 'TP Creative Tech - Thiết kế website chuyên nghiệp',
    'pinterest:description': 'Khám phá các mẫu website chuyên nghiệp từ TP Creative Tech',
    'pinterest:image': '/images/preview.png',
    
    // TikTok
    'tiktok:title': 'TP Creative Tech - Thiết kế website chuyên nghiệp',
    'tiktok:description': 'Website đẹp, chuẩn SEO, tăng doanh thu! 🚀',
    
    // YouTube sharing (uses Open Graph)
    'youtube:title': 'TP Creative Tech - Thiết kế website chuyên nghiệp',
    'youtube:description': 'TP Creative Tech - Đối tác công nghệ đáng tin cậy',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
