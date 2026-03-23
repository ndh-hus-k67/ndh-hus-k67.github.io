/**
 * Schema utilities for generating Schema.org structured data
 * Following best practices from https://schema.org/
 */

import { SITE } from "@data/constants";

interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductSchemaOptions {
  id: string;
  name: string;
  description?: string;
  image?: string | string[];
  category: string;
  brand?: string;
  manufacturer?: string;
  sku?: string;
  gtin?: string;
  mpn?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
    priceValidUntil?: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  review?: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    reviewRating: {
      ratingValue: string;
    };
  }>;
  material?: string;
  weight?: string;
  width?: string;
  height?: string;
  depth?: string;
  inLanguage?: string;
}

interface ArticleSchemaOptions {
  id: string;
  headline: string;
  description?: string;
  image: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: {
      url: string;
      width?: string;
      height?: string;
    };
  };
  articleSection?: string;
  keywords?: string[];
  wordCount?: number;
  inLanguage?: string;
}

interface BlogPostingSchemaOptions extends ArticleSchemaOptions {
  blogSection?: string;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item) => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.item
    }))
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQPageSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate Product schema with comprehensive information
 */
export function generateProductSchema(options: ProductSchemaOptions) {
  const {
    id,
    name,
    description,
    image,
    category,
    brand = "HAHUTECH",
    manufacturer = "HAHUTECH",
    sku,
    gtin,
    mpn,
    offers,
    aggregateRating,
    review,
    material,
    weight,
    width,
    height,
    depth,
    inLanguage = "vi-VN"
  } = options;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": id,
    "name": name,
    "category": category,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "manufacturer": {
      "@type": "Organization",
      "name": manufacturer,
      "url": SITE.url
    },
    "inLanguage": inLanguage
  };

  // Add description if provided
  if (description) {
    schema.description = description;
  }

  // Add image(s)
  if (image) {
    if (Array.isArray(image)) {
      schema.image = image;
    } else {
      schema.image = image;
    }
  }

  // Add product identifiers
  if (sku) schema.sku = sku;
  if (gtin) schema.gtin = gtin;
  if (mpn) schema.mpn = mpn;

  // Add material and dimensions
  if (material) schema.material = material;
  if (weight) schema.weight = { "@type": "QuantitativeValue", "value": weight };
  if (width || height || depth) {
    schema.width = width ? { "@type": "QuantitativeValue", "value": width } : undefined;
    schema.height = height ? { "@type": "QuantitativeValue", "value": height } : undefined;
    schema.depth = depth ? { "@type": "QuantitativeValue", "value": depth } : undefined;
  }

  // Add offers
  if (offers) {
    schema.offers = {
      "@type": "Offer",
      "url": offers.url || id,
      "priceCurrency": offers.priceCurrency || "VND",
      "price": offers.price || undefined,
      "priceValidUntil": offers.priceValidUntil || undefined,
      "availability": offers.availability || "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "HAHUTECH"
      }
    };
    
    // Remove undefined properties
    Object.keys(schema.offers).forEach(key => 
      schema.offers[key] === undefined && delete schema.offers[key]
    );
  }

  // Add aggregate rating
  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": aggregateRating.bestRating || "5",
      "worstRating": aggregateRating.worstRating || "1"
    };
  }

  // Add reviews
  if (review && review.length > 0) {
    schema.review = review.map((r) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.author
      },
      "datePublished": r.datePublished,
      "reviewBody": r.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.reviewRating.ratingValue,
        "bestRating": "5",
        "worstRating": "1"
      }
    }));
  }

  return schema;
}

/**
 * Generate Article schema
 */
export function generateArticleSchema(options: ArticleSchemaOptions) {
  const {
    id,
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    publisher = {
      name: SITE.title,
      logo: {
        url: `${SITE.url}/images/social.png`,
        width: "1200",
        height: "630"
      }
    },
    articleSection,
    keywords,
    wordCount,
    inLanguage = "vi-VN"
  } = options;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": id,
    "headline": headline,
    "image": Array.isArray(image) ? image : [image],
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": author.url ? "Organization" : "Person",
      "name": author.name,
      "url": author.url || undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": publisher.logo?.url,
        "width": publisher.logo?.width,
        "height": publisher.logo?.height
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": id
    },
    "inLanguage": inLanguage
  };

  // Add description if provided
  if (description) {
    schema.description = description;
  }

  // Add optional properties
  if (articleSection) schema.articleSection = articleSection;
  if (keywords) schema.keywords = keywords.join(", ");
  if (wordCount) schema.wordCount = wordCount;

  // Remove undefined properties
  Object.keys(schema.author).forEach(key => 
    schema.author[key] === undefined && delete schema.author[key]
  );

  return schema;
}

/**
 * Generate BlogPosting schema (extends Article)
 */
export function generateBlogPostingSchema(options: BlogPostingSchemaOptions) {
  const articleSchema = generateArticleSchema(options);
  
  return {
    ...articleSchema,
    "@type": "BlogPosting",
    "blogSection": options.blogSection || undefined
  };
}

/**
 * Generate a complete @graph with multiple schemas
 */
export function generateGraphSchema(schemas: any[]) {
  const graph: any[] = [];

  function stripContext(node: any) {
    if (!node || typeof node !== "object") return node;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ["@context"]: _context, ...rest } = node as any;
    return rest;
  }

  for (const schema of schemas) {
    if (!schema) continue;

    if (
      typeof schema === "object" &&
      "@graph" in schema &&
      Array.isArray((schema as any)["@graph"])
    ) {
      for (const nested of (schema as any)["@graph"]) {
        if (nested) graph.push(stripContext(nested));
      }
      continue;
    }

    graph.push(stripContext(schema));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
