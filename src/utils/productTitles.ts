export const categoryTitlesVN: Record<string, string> = {
  "bu-long": "Bu Lông",
  "oc-vit": "Ốc Vít",
  "san-pham-khac": "Sản Phẩm Khác",
};

// Exact overrides for ambiguous or acronym-heavy slugs.
const subcategoryTitlesVNExact: Record<string, string> = {
  // Bu lông
  "bu-long-cuong-do-cao": "Bu Lông Cường Độ Cao",
  "bu-long-dong": "Bu Lông Đồng",
  "bu-long-hoa-thi": "Bu Lông Hoa Thị",
  "bu-long-inox": "Bu Lông Inox",
  "bu-long-hoa-chat": "Bu Lông Hóa Chất",
  "bu-long-luc-giac": "Bu Lông Lục Giác",
  "bu-long-luc-giac-chim": "Bu Lông Lục Giác Chìm",
  "bu-long-neo-mong": "Bu Lông Neo Móng",
  "bu-long-no": "Bu Lông Nở – Tắc Kê Nở",
  "bu-long-tu-cat": "Bu Lông Tự Cắt",

  // Ốc vít
  "vit-bake": "Vít Bake (Pake)",
  "vit-ban-go": "Vít Bắn Gỗ",
  "vit-ban-ton": "Vít Bắn Tôn",
  "vit-inox": "Vít Inox",
  "vit-tao-ren": "Vít Tạo Ren",
  "vit-tri": "Vít Trí",
  "vit-tu-khoan": "Vít Tự Khoan",

  // Sản phẩm khác
  "e-cu-dai-oc": "Ê Cu – Đai Ốc",
  "ubolt-inox": "Ubolt Inox",
  "dai-treo-ong-dai-xiet-inox": "Đai Treo Ống - Đai Xiết Inox",
  "tang-do-ma-ni": "Tăng Đơ – Mã Ní",
  "ren-cay-helicoil": "Ren Cấy (Helicoil)",
  "phu-kien-nhom-dinh-hinh": "Phụ Kiện Nhôm Định Hình",
  "vong-dem-cac-loai": "Vòng Đệm Các Loại",
  "day-xich-inox": "Dây Xích Inox",
  "thanh-ren-ty-ren": "Thanh Ren - Ty Ren Inox",
  "dinh-rut": "Đinh Rút",
  "moc-treo-da": "Móc Treo Đá - Bát Treo Đá",
  "dinh-han": "Đinh Hàn",
  "chot-che": "Chốt Chẻ",
  "cap-thep": "Cáp Thép",
  "ecu-ep-tru-blind-bulong-ep": "Ecu Ép-Trụ Blind-Bulong Ép",
};

const wordMapVN: Record<string, string> = {
  // Common
  inox: "Inox",
  thep: "Thép",
  dong: "Đồng",
  nhom: "Nhôm",

  // Bu lông / ốc vít
  bu: "Bu",
  long: "Lông",
  oc: "Ốc",
  vit: "Vít",
  luc: "Lục",
  giac: "Giác",
  chim: "Chìm",
  neo: "Neo",
  mong: "Móng",
  no: "Nở",
  tu: "Tự",
  cat: "Cắt",
  cuong: "Cường",
  do: "Độ",
  cao: "Cao",
  hoa: "Hóa",
  chat: "Chất",

  // Ốc vít (bắn)
  ban: "Bắn",
  go: "Gỗ",
  ton: "Tôn",
  tao: "Tạo",
  ren: "Ren",
  khoan: "Khoan",
  tri: "Trí",

  // Khác
  san: "Sản",
  pham: "Phẩm",
  khac: "Khác",
  dai: "Đai",
  treo: "Treo",
  ong: "Ống",
  xiet: "Xiết",
  tang: "Tăng",
  ma: "Ma",
  ni: "Ní",
  cay: "Cấy",
  phu: "Phụ",
  kien: "Kiện",
  dinh: "Định",
  hinh: "Hình",
  vong: "Vòng",
  dem: "Đệm",
  cac: "Các",
  loai: "Loại",
  day: "Dây",
  xich: "Xích",
  thanh: "Thanh",
  ty: "Ty",
  rut: "Rút",
  moc: "Móc",
  han: "Hàn",
  chot: "Chốt",
  che: "Chẻ",
  cap: "Cáp",
  blind: "Blind",
  bulong: "Bu Lông",
  ep: "Ép",
  tru: "Trụ",
  e: "Ê",
  cu: "Cu",
  ubolt: "U-Bolt",
  helicoil: "Helicoil",
};

function capitalizeFallback(word: string): string {
  if (!word) return word;
  if (/^\d+$/.test(word)) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function slugToVietnameseTitle(slug: string): string {
  if (!slug) return slug;
  const normalized = String(slug).trim();
  if (!normalized) return slug;

  const exact = subcategoryTitlesVNExact[normalized];
  if (exact) return exact;

  return normalized
    .split("-")
    .filter(Boolean)
    .map((token) => wordMapVN[token] ?? capitalizeFallback(token))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getCategoryTitleVN(categorySlug: string): string {
  return categoryTitlesVN[categorySlug] ?? slugToVietnameseTitle(categorySlug);
}

export function getSubcategoryTitleVN(subcategorySlug: string): string {
  return slugToVietnameseTitle(subcategorySlug);
}
