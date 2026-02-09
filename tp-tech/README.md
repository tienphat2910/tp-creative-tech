# TechPro Solutions - Corporate Website

> **Website doanh nghiệp chuẩn SEO, sẵn sàng migrate sang WordPress**

## 🚀 Quick Start

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

---

## ✨ Tính Năng Nổi Bật

### 🎯 SEO-First Architecture
- ✅ Server-Side Rendering (SSR) mặc định
- ✅ Semantic HTML5 structure (header, nav, main, article, footer)
- ✅ Meta tags đầy đủ (title, description, og tags)
- ✅ Heading structure chuẩn (H1 duy nhất/trang)
- ✅ SEO-friendly URLs (`/blog/slug-name`)
- ✅ Content crawlable 100%

### 🌍 Đa Ngôn Ngữ (VI / EN)
- 🇻🇳 Tiếng Việt
- 🇺🇸 English
- Switcher dropdown với quốc kỳ
- Content tách biệt hoàn toàn
- Chuẩn cho WPML/Polylang

### 📦 WordPress-Ready
- **Content 100% từ JSON files** (không hardcode)
- Cấu trúc data giống CMS (title, slug, excerpt, content, seo)
- Dễ dàng migrate sang WordPress REST API
- Type-safe với TypeScript

### 🎨 Modern UI/UX
- Responsive design (Desktop / Tablet / Mobile)
- Framer Motion animations
- Sticky header
- Mobile hamburger menu
- Smooth transitions

---

## 📁 Cấu Trúc Project

```
tp-tech/
├── app/                    # NextJS App Router pages
├── components/             # React components
├── content/               # 🔥 Content data (JSON)
│   ├── vi/               # Vietnamese
│   └── en/               # English
├── contexts/             # React contexts (i18n)
├── lib/                  # Utilities
└── types/                # TypeScript types
```

📖 **Đọc chi tiết:** [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🔍 Vì Sao Chuẩn SEO?

1. **Semantic HTML5**: Search engine dễ crawl
2. **SSR**: Content render sẵn, không cần chờ JS
3. **Meta Tags**: Title, description, og đầy đủ
4. **Structured Data**: Ready cho Schema.org
5. **Fast Loading**: NextJS optimization
6. **Mobile-First**: Responsive hoàn toàn

---

## 🔄 Migrate Sang WordPress

### Dễ dàng vì:
- Content đã tách biệt trong JSON
- Data structure giống Post/Page trong WP
- Chỉ cần thay `import JSON` → `fetch WP API`
- Components giữ nguyên 100%

### Migration Steps:
1. Import JSON vào WordPress database
2. Map fields: `slug` → `post_name`, `seo` → Yoast SEO
3. Thay data source từ local → WP REST API
4. Done! 🎉

📖 **Đọc roadmap:** [ARCHITECTURE.md - Migrate Section](./ARCHITECTURE.md#-migrate-sang-wordpress-roadmap)

---

## 📄 Pages

- `/` - Homepage
- `/blog` - Blog listing
- `/blog/[slug]` - Blog detail (dynamic)
- `/about` - About (TBD)
- `/contact` - Contact (TBD)

---

## 🛠️ Tech Stack

- **Framework:** NextJS 15 (App Router)
- **Styling:** TailwindCSS
- **Animation:** Framer Motion
- **Language:** TypeScript
- **Content:** JSON-based (CMS-ready)

---

## 📝 Thêm Content Mới

### Blog Post:
1. Mở `content/vi/blog.json` và `content/en/blog.json`
2. Thêm object mới:
```json
{
  "id": "4",
  "slug": "url-friendly-slug",
  "title": "Tiêu đề bài viết",
  "excerpt": "Mô tả ngắn",
  "content": "Nội dung đầy đủ...",
  "seo": { "metaTitle": "...", "metaDescription": "..." }
}
```
3. Save → Tự động có trang `/blog/url-friendly-slug`

---

## 🎨 Customization

### Đổi màu chủ đạo:
Mở `tailwind.config.ts`, thay `blue-600` thành màu khác.

### Đổi content:
Chỉnh sửa files trong `content/vi/` và `content/en/`

### Thêm ngôn ngữ mới:
1. Tạo folder `content/ja/` (ví dụ tiếng Nhật)
2. Copy structure từ `content/vi/`
3. Update `types/content.ts`: `type Locale = 'vi' | 'en' | 'ja'`

---

## 📊 Performance

- ✅ Server-Side Rendering
- ✅ Automatic code splitting
- ✅ Optimized images (next/image)
- ✅ CSS minification
- ✅ Fast loading

---

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Kiến trúc chi tiết, SEO strategy, WordPress migration
- [package.json](./package.json) - Dependencies

---

## 🤝 Contributing

Dự án này follow best practices:
- ESLint configured
- TypeScript strict mode
- Component-based architecture
- Content-as-data pattern

---

## 📄 License

Copyright © 2026 TechPro Solutions

---

## 🎯 Mục Tiêu Dự Án

✅ Website doanh nghiệp chuyên nghiệp  
✅ SEO on-page xuất sắc  
✅ Dễ maintain và scale  
✅ Sẵn sàng migrate WordPress bất cứ lúc nào

**Built with 💙 by Senior Frontend Engineers**

