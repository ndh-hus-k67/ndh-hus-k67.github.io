// https://docs.astro.build/en/guides/content-collections/#defining-collections

import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: new URL('./content/products/', import.meta.url) }),
    schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    updatedAt: z.coerce.date().optional(),
    category: z.union([
      z.enum(['bu-long', 'oc-vit', 'san-pham-khac']),
      z.object({
        slug: z.string(),
        name: z.string(),
      })
    ]),
    subcategory: z.string().optional(),
    productType: z.object({
      slug: z.string(),
      name: z.string(),
    }).optional(),
    filters: z.object({
      material: z.array(z.string()).optional(),
      diameter: z.array(z.string()).optional(),
      length_mm: z.array(z.number()).optional(),
      surface: z.array(z.string()).optional(),
      application: z.array(z.string()).optional(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
    variants: z.array(
      z.object({
        sku: z.string(),
        name: z.string(),
        material: z.string().optional(),
        diameter: z.string().optional(),
        length_mm: z.number().optional(),
      })
    ).optional(),
    breadcrumbs: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
      })
    ).optional(),
    relatedCategory: z.array(
      z.object({
        slug: z.string(),
        name: z.string(),
      })
    ).optional(),
    main: z.object({
      id: z.number(),
      content: z.string(),
      imgCard: image(),
      imgMain: image(),
      imgAlt: z.string(),
    }),
    tabs: z.array(
      z.object({
        id: z.string(),
        dataTab: z.string(),
        title: z.string(),
      })
    ),
    longDescription: z.object({
      title: z.string(),
      subTitle: z.string(),
      btnTitle: z.string(),
      btnURL: z.string(),
    }),
    descriptionList: z.array(
      z.object({
        title: z.string(),
        subTitle: z.string(),
      })
    ),
    specificationsLeft: z.array(
      z.object({
        title: z.string(),
        subTitle: z.string(),
      })
    ),
    specificationsRight: z.array(
      z.object({
        title: z.string(),
        subTitle: z.string(),
      })
    ).optional(),
    tableData: z.array(
      z.object({
        feature: z.array(z.string()),
        description: z.array(z.array(z.string())),
      })
    ).optional(),
    blueprints: z.object({
      first: image().optional(),
      second: image().optional(),
    }).optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: new URL('./content/blog/', import.meta.url) }),
  schema: ({ image }) => z.object ({
  title: z.string(),
  description: z.string(),
  // `contents` is optional to allow writing full Markdown in the file body.
  // If provided, pages will render it as paragraph strings (legacy format).
  contents: z.array(z.string()).optional(),
  author: z.string(),
  role: z.string().optional(),
  authorImage: image(),
  authorImageAlt: z.string(),
  pubDate: z.date(),
  cardImage: image(),
  cardImageAlt: z.string(),
  readTime: z.number(),
  tags: z.array(z.string()).optional(),
  }),
});

const insightsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: new URL('./content/insights/', import.meta.url) }),
  schema: ({ image }) => z.object ({
  title: z.string(),
  description: z.string(),
  // contents: z.array(z.string()),
  cardImage: image(),
  cardImageAlt: z.string(),
  }),
});

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  'products': productsCollection,
  'blog': blogCollection,
  'insights': insightsCollection,
};
