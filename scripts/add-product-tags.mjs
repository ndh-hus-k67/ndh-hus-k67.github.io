import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { globby } from "globby";

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function splitFacetText(value) {
  if (!value) return [];
  return String(value)
    .split(/[,/;|]+/g)
    .map((p) => p.trim())
    .filter(Boolean);
}

function normalizeMaterialTokens(tokens) {
  const out = [];
  let base = "";

  for (const raw of tokens.map((t) => String(t || "").trim()).filter(Boolean)) {
    const t = raw.replace(/\s+/g, " ").trim();

    // Normalize bare "niken" tokens when previous token has "mạ ..."
    if (/^niken$/i.test(t) && out.length) {
      const last = out[out.length - 1];
      if (/mạ/i.test(last) && !/niken/i.test(last)) {
        const prefix = last
          .replace(/kẽm|kem/gi, "")
          .replace(/\s+/g, " ")
          .trim();

        out.push(/mạ/i.test(prefix) ? `${prefix} niken` : "Mạ niken");
        continue;
      }
    }

    // Track a base (e.g. "Inox" or "SUS") for sequences like: "Inox 201 / 304 / 316"
    if (/\b(inox|sus)\b/i.test(t)) {
      base = /\bsus\b/i.test(t) ? "SUS" : "Inox";
      out.push(t);
      continue;
    }

    // Expand naked grades like "304", "316L" after an "Inox" base
    if (/^(?:\d{3,4})(?:L)?$/i.test(t) && base === "Inox") {
      out.push(`Inox ${t.toUpperCase()}`);
      continue;
    }

    if (/^(?:\d{3,4})(?:L)?$/i.test(t) && base === "SUS") {
      out.push(`SUS ${t.toUpperCase()}`);
      continue;
    }

    out.push(t);
  }

  return uniq(out);
}

function normalizeSizeToken(token) {
  const t = String(token).trim();
  if (!t) return "";
  return t
    .replace(/\s+/g, "")
    .replace(/[×]/g, "x")
    .replace(/,/g, ".")
    .toUpperCase();
}

function extractSizesFromText(text) {
  const blob = String(text || "");
  const out = [];

  // M6, M10x130, M12X160, M6–M12
  const mTokens = blob.match(/\bM\s?\d+(?:\s*(?:X|x|×)\s*\d+)?\b/g);
  if (mTokens) out.push(...mTokens.map(normalizeSizeToken));

  // 6.3x100, 10x100
  const dimTokens = blob.match(/\b\d+(?:[\.,]\d+)?(?:x|×)\d+\b/gi);
  if (dimTokens) out.push(...dimTokens.map(normalizeSizeToken));

  return uniq(out);
}

function extractStandards(text) {
  const blob = String(text || "");
  const out = [];

  const din = blob.match(/\bDIN\s*\d+\b/gi);
  if (din) out.push(...din.map((x) => x.toUpperCase().replace(/\s+/g, " ").trim()));

  const iso = blob.match(/\bISO\s*\d+\b/gi);
  if (iso) out.push(...iso.map((x) => x.toUpperCase().replace(/\s+/g, " ").trim()));

  const gb = blob.match(/\bGB\s*\d+\b/gi);
  if (gb) out.push(...gb.map((x) => x.toUpperCase().replace(/\s+/g, " ").trim()));

  return uniq(out);
}

function extractStrengthGrade(text) {
  const blob = String(text || "");
  const m = blob.match(/(?:cap[-\s]*ben|cấp\s*bền)\s*(\d+)\s*[\.-]\s*(\d+)/i);
  if (!m) return [];
  const grade = `${m[1]}.${m[2]}`;
  return [`Cấp bền ${grade}`];
}

function inferMaterialFromSpecs(data) {
  const specs = data?.specificationsLeft;
  if (!Array.isArray(specs)) return [];

  const match = specs.find((s) => /vật\s*liệu|material/i.test(String(s?.title || "")));
  if (!match) return [];

  return normalizeMaterialTokens(splitFacetText(match.subTitle));
}

function buildTagBuckets({ filePath, data, content }) {
  const materialTags = [];
  const sizeTags = [];

  // material tags
  materialTags.push(...normalizeMaterialTokens(splitFacetText(data.material)));
  if (Array.isArray(data.materials)) {
    materialTags.push(...normalizeMaterialTokens(data.materials.flatMap(splitFacetText)));
  }
  materialTags.push(...inferMaterialFromSpecs(data));

  // common material hints from slug
  const slugHints = `${path.basename(filePath)}`.toLowerCase();
  const hasInox = /inox|sus\s*201|sus\s*304|sus\s*316|sus\s*316l|\binox[_-]?(?:201|304|316|316l)\b/.test(slugHints);
  if (hasInox) materialTags.push("Inox");
  if (/makem|ma-kem|mạ\s*kẽm/.test(slugHints)) materialTags.push("Mạ kẽm");

  // size tags
  sizeTags.push(...splitFacetText(data.size).map(normalizeSizeToken));
  if (Array.isArray(data.sizes)) sizeTags.push(...data.sizes.flatMap(splitFacetText).map(normalizeSizeToken));

  // heuristic sizes from title/description/content + specs/table
  const specText = Array.isArray(data.specificationsLeft)
    ? data.specificationsLeft
        .map((s) => `${s?.title || ""}: ${s?.subTitle || ""}`)
        .join("\n")
    : "";

  const tableText = Array.isArray(data.tableData)
    ? JSON.stringify(data.tableData)
    : "";

  sizeTags.push(
    ...extractSizesFromText(
      `${data.title || ""}\n${data.description || ""}\n${specText}\n${tableText}\n${content || ""}`
    )
  );

  return {
    tagMaterials: uniq(materialTags),
    tagSizes: uniq(sizeTags),
  };
}

async function main() {
  const files = await globby(["src/content/products/vn/**/*.md"], {
    gitignore: true,
    absolute: true,
  });

  let changed = 0;

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);

    const nextBuckets = buildTagBuckets({
      filePath,
      data: parsed.data,
      content: parsed.content,
    });

    const currentMat = Array.isArray(parsed.data.tagMaterials) ? parsed.data.tagMaterials : [];
    const currentSizes = Array.isArray(parsed.data.tagSizes) ? parsed.data.tagSizes : [];

    const same =
      JSON.stringify(uniq(currentMat)) === JSON.stringify(nextBuckets.tagMaterials) &&
      JSON.stringify(uniq(currentSizes).map(normalizeSizeToken)) ===
        JSON.stringify(nextBuckets.tagSizes.map(normalizeSizeToken));

    if (same) continue;

    const { tags: _legacyTags, ...rest } = parsed.data;
    const nextData = {
      ...rest,
      tagMaterials: nextBuckets.tagMaterials,
      tagSizes: nextBuckets.tagSizes,
    };

    const out = matter.stringify(parsed.content, nextData);

    await fs.writeFile(filePath, out, "utf8");
    changed++;
  }

  console.log(`Updated tagMaterials/tagSizes for ${changed}/${files.length} VN product files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
