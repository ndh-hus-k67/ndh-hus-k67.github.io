---
title: "Hướng dẫn cách đọc ký hiệu bu lông – đai ốc đúng nhất (dễ hiểu cho người mới)"
description: "Giải thích cấp bền bu lông hệ mét/hệ inch, ý nghĩa ký hiệu dạng XX.X và A2-80, cách chọn đai ốc phù hợp và ví dụ minh hoạ thực tế."
author: "mktcuongthinh"
authorImage: "@/images/blog/brad.avif"
authorImageAlt: "Ảnh đại diện tác giả"
pubDate: 2023-09-10
cardImage: "@/images/blog/post-2.avif"
cardImageAlt: "Minh hoạ bu lông và đai ốc trong ứng dụng thực tế"
readTime: 8
tags: ["bu lông", "đai ốc", "cấp bền", "tiêu chuẩn", "hướng dẫn"]
---

Trong các công trình xây dựng, cơ khí hay giao thông, **bu lông – đai ốc** là nhóm vật tư quyết định độ chắc chắn của mối ghép. Vì vậy, biết cách **đọc ký hiệu trên đầu bu lông/đai ốc** sẽ giúp bạn chọn đúng cấp bền, đúng vật liệu, tránh mua nhầm và dùng sai mục đích.

## Cấp bền của bu lông là gì?

**Cấp bền (strength grade/property class)** phản ánh khả năng chịu lực của bu lông trong mối ghép: lực kéo, lực xiết, lực cắt… Nó được thể hiện qua các chỉ số liên quan đến **giới hạn bền** và **giới hạn chảy**.

Trong thực tế, bạn sẽ gặp phổ biến:

- **Bu lông hệ mét**: ký hiệu dạng số (ví dụ 4.6, 8.8, 10.9, 12.9…)
- **Bu lông hệ inch**: thường theo chuẩn/đánh dấu riêng của hệ inch (ít gặp hơn nếu bạn chủ yếu mua hàng theo M…)

## Cách đọc ký hiệu bu lông hệ mét (dạng `XX.X`)

Nhiều đầu bu lông sẽ có ký hiệu gồm 2–3 ký tự của nhà sản xuất + cấp bền.

Với cấp bền dạng **`XX.X`**:

- **`XX`** (phần trước dấu chấm) biểu thị **$\frac{1}{100}$ độ bền kéo tối thiểu**.
    - Độ bền kéo tối thiểu $R_m$ (xấp xỉ) = `XX × 100` (N/mm²)
- **`X`** (phần sau dấu chấm) biểu thị tỉ lệ để suy ra **giới hạn chảy tối thiểu**.
    - Giới hạn chảy tối thiểu $R_e$ (xấp xỉ) = `(X/10) × R_m`

### Ví dụ: cấp bền `8.8`

- $R_m \approx 8 \times 100 = 800\,\text{N/mm}^2$
- $R_e \approx (8/10) \times 800 = 640\,\text{N/mm}^2$

Nói đơn giản: **8.8** là nhóm bu lông khá phổ biến trong cơ khí/xây dựng; các cấp cao hơn như **10.9, 12.9** thường dùng cho yêu cầu chịu lực cao.

## Cách đọc ký hiệu bu lông inox (dạng `Ax-XX` như `A2-80`)

Với bu lông thép không gỉ, ký hiệu hay gặp có dạng **`A2-70`, `A2-80`, `A4-80`…**

Ý nghĩa tổng quát:

- **Chữ cái đầu (A/C/F)**: nhóm thép không gỉ
    - `A`: Austenitic (phổ biến nhất vì cơ tính tốt và chống gỉ tốt)
    - `C`: Martensitic
    - `F`: Ferritic
- **Số sau chữ cái (ví dụ 2, 4…)**: “grade” của vật liệu (thường gặp **2** và **4**)
- **Số sau dấu gạch (70/80…)**: mức độ bền kéo tối thiểu quy ước

### Ví dụ: `A2-80`

- `A2`: nhóm Austenitic, grade 2 (thường được hiểu gần với inox 304 trong nhiều ứng dụng phổ biến)
- `80`: độ bền kéo tối thiểu quy ước khoảng **800 N/mm²**

## Các cấp bền bu lông thường gặp

Trong hệ mét, bạn sẽ hay thấy cấp bền từ **4.6 đến 12.9**.

- Dân dụng/thi công phổ thông: thường gặp 4.6, 5.6, 8.8
- Cơ khí/kết cấu cần lực siết và tải cao: hay dùng 8.8–12.9 (thường gọi “bu lông cường độ cao”)

Lưu ý: có trường hợp đầu bu lông không đóng dấu rõ; khi đó nên kiểm tra bao bì/chứng từ hoặc hỏi nhà cung cấp.

## Cấp của đai ốc (ê-cu) là gì? Đọc thế nào?

Đai ốc cũng có **cấp** (thể hiện bằng số). Con số này liên quan đến **proof load** (ứng suất thử bền danh định) và cho biết đai ốc phù hợp với bu lông thuộc cấp nào.

Ví dụ cách hiểu phổ biến:

- Đai ốc cấp **8**: proof load xấp xỉ `8 × 100 = 800 N/mm²`

### Ví dụ 1: đai ốc “CTEG 8” (thép cacbon)

- `CTEG`: ký hiệu/nhãn nhà sản xuất
- `8`: proof load xấp xỉ 800 N/mm²

### Ví dụ 2: đai ốc “CTEG A2-80” (inox)

- `CTEG`: nhà sản xuất
- `A2`: inox nhóm Austenitic, grade 2
- `80`: proof load/bền kéo quy ước xấp xỉ 800 N/mm²

## Mẹo chọn nhanh để không mua sai

- Luôn xác định **môi trường làm việc** (trong nhà/ngoài trời/ẩm/ven biển) để chọn thép mạ kẽm hay inox.
- Chọn **cấp bền bu lông và cấp đai ốc** tương thích (đừng “lệch cấp” quá nhiều).
- Nếu mối ghép quan trọng, ưu tiên hàng có **tiêu chuẩn rõ ràng** và nguồn gốc minh bạch.

