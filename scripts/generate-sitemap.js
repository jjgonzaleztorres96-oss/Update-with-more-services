#!/usr/bin/env node
/**
 * Generates sitemap.xml from all .html files in the root directory.
 * Usage: node scripts/generate-sitemap.js
 */

import { readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE = 'https://www.cornerstonepropainting.com';
const TODAY = new Date().toISOString().split('T')[0];

// Pages to exclude from sitemap
const EXCLUDE = new Set(['404.html', 'preview.html']);

const files = readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && !EXCLUDE.has(f))
  .sort();

const urls = files.map(file => {
  const slug = file === 'index.html' ? '' : `/${file.replace(/\.html$/, '')}`;
  const loc = `${BASE}${slug || '/'}`;
  const priority = file === 'index.html' ? '1.0'
    : file.startsWith('service-') || file.startsWith('painters-') ? '0.8'
    : file.startsWith('blog-') ? '0.6'
    : '0.7';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

const outPath = join(ROOT, 'sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`Wrote ${files.length} URLs to sitemap.xml`);
