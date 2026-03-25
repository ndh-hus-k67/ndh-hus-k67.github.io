// https://docs.astro.build/en/guides/integrations-guide/sitemap/#usage
import type { APIRoute } from 'astro';

const disallowedPaths = ['/_astro/', '/404', '/404.html'];

const robotsTxt = `
User-agent: *
${disallowedPaths.map((path) => `Disallow: ${path}`).join('\n')}
Allow: /

Sitemap: ${new URL('sitemap-groups.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};