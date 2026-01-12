# Hệ thống phân loại sản phẩm đa ngôn ngữ

## Ngôn ngữ hỗ trợ

- **Tiếng Việt (VN)**: `/products` - Ngôn ngữ mặc định
- **Tiếng Anh (EN)**: `/en/products`

## Cấu trúc thư mục

### Content (Nội dung sản phẩm)
```
src/content/products/
├── vn/ (Tiếng Việt)
│   ├── bu-long/
│   │   ├── inox/
│   │   │   └── item-b203.md
│   │   └── luc-giac/
│   │       └── item-f303.md
│   ├── oc-vit/
│   │   ├── ban-ton/
│   │   │   └── item-a765.md
│   │   └── inox/
│   │       └── item-t845.md
│   └── san-pham-khac/
│       └── phu-kien/
└── en/ (English)
    ├── bu-long/
    │   ├── inox/
    │   │   └── item-b203.md
    │   └── luc-giac/
    │       └── item-f303.md
    ├── oc-vit/
    │   ├── ban-ton/
    │   │   └── item-a765.md
    │   └── inox/
    │       └── item-t845.md
    └── san-pham-khac/
        └── phu-kien/
```

### Pages (Routing)

**Tiếng Việt (VN):**
```
src/pages/products/
├── index.astro                                    → /products
├── [category]/
│   ├── index.astro                               → /products/bu-long
│   └── [subcategory]/
│       ├── index.astro                           → /products/bu-long/inox
│       └── [id].astro                            → /products/bu-long/inox/item-b203
```

**Tiếng Anh (EN):**
```
src/pages/en/products/
├── index.astro                                    → /en/products
├── [category]/
│   ├── index.astro                               → /en/products/bu-long
│   └── [subcategory]/
│       ├── index.astro                           → /en/products/bu-long/inox
│       └── [id].astro                            → /en/products/bu-long/inox/item-b203
```

## Cách thêm sản phẩm mới

### 1. Tạo file sản phẩm

Tạo file markdown trong thư mục tương ứng với category và subcategory:

**Ví dụ:** Thêm bu lông inox mới
```bash
# Tạo file trong thư mục phù hợp
src/content/products/vn/bu-long/inox/item-xyz123.md
```

### 2. Cấu trúc file sản phẩm

```markdown
---
title: "Tên sản phẩm"
description: "Mô tả ngắn gọn"
category: "bu-long"           # Phải là: bu-long, oc-vit, hoặc san-pham-khac
subcategory: "inox"           # Tên subcategory (slug format: chu-thuong-khong-dau)
main:
  id: 5                       # ID duy nhất cho sắp xếp
  content: |
    Mô tả chi tiết sản phẩm...
  imgCard: "@/images/product-image-x.avif"
  imgMain: "@/images/product-image-main-x.avif"
  imgAlt: "Mô tả hình ảnh"
tabs:
  - id: "tabs-with-card-item-1"
    dataTab: "#tabs-with-card-1"
    title: "Mô tả"
  - id: "tabs-with-card-item-2"
    dataTab: "#tabs-with-card-2"
    title: "Thông số kỹ thuật"
  - id: "tabs-with-card-item-3"
    dataTab: "#tabs-with-card-3"
    title: "Bản vẽ"
longDescription:
  title: "Tiêu đề dài"
  subTitle: |
    Mô tả chi tiết hơn...
  btnTitle: "Liên hệ bộ phận kinh doanh"
  btnURL: "#"
descriptionList:
  - title: "Tính năng 1"
    subTitle: "Chi tiết tính năng..."
specificationsLeft:
  - title: "Thông số 1"
    subTitle: "Giá trị..."
blueprints:
  first: "@/images/blueprint-1.avif"
  second: "@/images/blueprint-2.avif"
---
```

### 3. Các category có sẵn

#### Bu Lông (`bu-long`)
- **inox**: Bu lông inox
- **luc-giac**: Bu lông lục giác
- *(Có thể thêm subcategory mới)*

#### Ốc Vít (`oc-vit`)
- **ban-ton**: Ốc vít bắn tôn
- **inox**: Ốc vít inox
- *(Có thể thêm subcategory mới)*

#### Sản Phẩm Khác (`san-pham-khac`)
- **phu-kien**: Phụ kiện
- *(Có thể thêm subcategory mới)*

### 4. Thêm subcategory mới

**Bước 1:** Tạo thư mục mới
```bash
mkdir -p src/content/products/vn/bu-long/subcategory-moi
```

**Bước 2:** Thêm sản phẩm vào thư mục đó với `subcategory: "subcategory-moi"`

**Lưu ý:** Hệ thống tự động phát hiện subcategories từ các sản phẩm có sẵn

### 5. Thêm category mới

**Bước 1:** Cập nhật schema trong `src/content.config.ts`
```typescript
category: z.enum(['bu-long', 'oc-vit', 'san-pham-khac', 'category-moi']),
```

**Bước 2:** Cập nhật `src/pages/products/[category]/index.astro` - thêm vào `getStaticPaths()`
```typescript
return [
  { params: { category: "bu-long" } },
  { params: { category: "oc-vit" } },
  { params: { category: "san-pham-khac" } },
  { params: { category: "category-moi" } },  // Thêm dòng này
];
```

**Bước 3:** Thêm tiêu đề và mô tả trong các file routing
```typescript
const categoryTitles: Record<string, string> = {
  "bu-long": "Bu Lông",
  "oc-vit": "Ốc Vít",
  "san-pham-khac": "Sản Phẩm Khác",
  "category-moi": "Tiêu Đề Category Mới",
};

const categoryDescriptions: Record<string, string> = {
  // ... existing
  "category-moi": "Mô tả category mới...",
};
```

**Bước 4:** Cập nhật `src/pages/products/index.astro` - thêm vào mảng `categories`
```typescript
const categories = [
  {
    slug: "bu-long",
    name: "Bu Lông",
    description: "...",
    icon: "..."
  },
  // ... existing
  {
    slug: "category-moi",
    name: "Category Mới",
    description: "Mô tả...",
    icon: "..."
  },
];
```

## URL Structure

### Tiếng Việt (Mặc định)

#### Trang chính products
```
/products
```
Hiển thị tất cả categories với một số sản phẩm mẫu từ mỗi category

#### Trang category
```
/products/bu-long
/products/oc-vit
/products/san-pham-khac
```
Hiển thị tất cả subcategories trong category đó với sản phẩm mẫu

#### Trang subcategory
```
/products/bu-long/inox
/products/oc-vit/ban-ton
```
Hiển thị tất cả sản phẩm trong subcategory đó

#### Trang chi tiết sản phẩm
```
/products/bu-long/inox/item-b203
/products/oc-vit/inox/item-t845
```

### Tiếng Anh

#### Trang chính products
```
/en/products
```

#### Trang category
```
/en/products/bu-long
/en/products/oc-vit
/en/products/san-pham-khac
```

#### Trang subcategory
```
/en/products/bu-long/inox
/en/products/oc-vit/ban-ton
```

#### Trang chi tiết sản phẩm
```
/en/products/bu-long/inox/item-b203
/en/products/oc-vit/inox/item-t845
```

**Lưu ý**: Slug của category và subcategory giữ nguyên giữa các ngôn ngữ để dễ chuyển đổi.

## Breadcrumb Navigation

Mỗi trang đều có breadcrumb để người dùng dễ dàng điều hướng:

```
Sản phẩm > Bu Lông > Inox > SF-BN B203
```

## Features

✅ **SEO-friendly URLs**: Cấu trúc URL rõ ràng và có ý nghĩa
✅ **Hierarchical navigation**: Điều hướng theo cấp bậc category → subcategory → product
✅ **Breadcrumb navigation**: Luôn biết vị trí hiện tại
✅ **Auto-discovery**: Tự động phát hiện subcategories từ sản phẩm
✅ **Scalable**: Dễ dàng thêm category/subcategory/sản phẩm mới
✅ **Type-safe**: TypeScript schema validation cho tất cả sản phẩm

## Development

### Build
```bash
npm run build
# hoặc
pnpm build
```

### Dev server
```bash
npm run dev
# hoặc
pnpm dev
```

### Check errors
Astro tự động kiểm tra schema khi build. Nếu có sản phẩm nào thiếu field bắt buộc hoặc sai category, build sẽ báo lỗi.

## Notes

- Tên file sản phẩm nên có format rõ ràng (ví dụ: `item-xyz123.md`)
- Category và subcategory phải là slug (chữ thường, không dấu, dùng dấu gạch ngang)
- ID trong `main.id` nên là duy nhất để tránh conflict khi sắp xếp
- Hình ảnh nên đặt trong `/src/images/` và sử dụng format AVIF để tối ưu
