import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import type { Content } from '@google/genai';
import {
  UPLOADS_DIR,
  addProduct,
  buildStoreSystemPrompt,
  deleteProduct,
  loadStoreData,
  saveStoreData,
  updateProduct,
  updateStoreProfile,
} from './server/storeService.js';
import type { OrderReceipt, Product, ProductCategoryId } from './src/types/store.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

const CATEGORY_MAP: Record<ProductCategoryId, { en: string; bn: string }> = {
  'audio-tech': { en: 'Audio & Tech', bn: 'অডিও ও টেক' },
  wearables: { en: 'Wearables', bn: 'ওয়্যারেবলস' },
  'leather-carry': { en: 'Leather & Carry', bn: 'লেদার ও ক্যারি' },
  workspace: { en: 'Workspace Tech', bn: 'ওয়ার্কস্পেস টেক' },
  'personal-care': { en: 'Personal Care', bn: 'পার্সোনাল কেয়ার' },
  'home-living': { en: 'Home & Living', bn: 'হোম ও লিভিং' },
};

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}

function saveBase64ProductImage(dataUrl: string, slugHint: string): string | null {
  const match = dataUrl.match(/^data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)$/i);
  if (!match) return null;
  const mimeSubtype = match[1].toLowerCase();
  const ext = mimeSubtype === 'jpeg' ? 'jpg' : mimeSubtype;
  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length === 0 || buffer.length > 5 * 1024 * 1024) return null;

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  const safeHint = slugHint.replace(/[^a-z0-9-]/gi, '-').toLowerCase().slice(0, 40) || 'product';
  const filename = `${safeHint}-${Date.now()}.${ext}`;
  fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

function loadOrders(): OrderReceipt[] {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as OrderReceipt[]) : [];
  } catch {
    return [];
  }
}

function saveOrder(receipt: OrderReceipt): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const existing = loadOrders();
  existing.unshift(receipt);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}

function getBaseUrl(req: Request): string {
  const configured = process.env.APP_URL?.trim();
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured.replace(/\/+$/, '');
  }
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectRouteSeo(html: string, req: Request): string {
  const baseUrl = getBaseUrl(req);
  const lang: 'en' | 'bn' = req.query.lang === 'en' ? 'en' : 'bn';
  const store = loadStoreData();
  const title =
    lang === 'bn'
      ? `${store.profile.storeNameBn} – প্রোডাক্ট কালেকশন ও AI শপিং অ্যাসিস্ট্যান্ট`
      : `${store.profile.storeNameEn} – Curated Products & AI Shopping Assistant`;
  const description = lang === 'bn' ? store.profile.taglineBn : store.profile.taglineEn;
  const cleanPath = req.path === '/' ? '/' : req.path.replace(/\/+$/, '');
  const canonicalUrl = `${baseUrl}${cleanPath}`;
  const safeTitle = escapeHtmlAttr(title);
  const safeDesc = escapeHtmlAttr(description);

  let out = html
    .replace(/<html lang="[^"]*"/i, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );

  const seoHeadTags = [
    `<link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />`,
    `<link rel="alternate" hreflang="bn" href="${escapeHtmlAttr(`${canonicalUrl}?lang=bn`)}" />`,
    `<link rel="alternate" hreflang="en" href="${escapeHtmlAttr(`${canonicalUrl}?lang=en`)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtmlAttr(canonicalUrl)}" />`,
  ].join('\n    ');

  out = out.replace('</head>', `    ${seoHeadTags}\n  </head>`);
  return out;
}

function extractErrorDetails(err: unknown): { status: number; message: string } {
  const raw = err instanceof Error ? err.message : String(err || 'Unknown AI error');
  if (raw.includes('PERMISSION_DENIED') || raw.includes('403')) {
    return {
      status: 403,
      message: 'Gemini API permission denied. Please verify your API key in Settings > Secrets.',
    };
  }
  if (raw.includes('API_KEY_INVALID') || raw.includes('400')) {
    return {
      status: 400,
      message: 'Gemini API key appears invalid. Please check Settings > Secrets.',
    };
  }
  if (raw.includes('RESOURCE_EXHAUSTED') || raw.includes('429')) {
    return {
      status: 429,
      message: 'AI assistant is receiving high traffic right now. Please wait a moment and try again.',
    };
  }
  if (raw.includes('NOT_FOUND') || raw.includes('404')) {
    return {
      status: 404,
      message: 'Requested Gemini model could not be found.',
    };
  }
  return {
    status: 502,
    message: raw || 'Unable to generate an AI response right now.',
  };
}

async function startServer(): Promise<void> {
  const app = express();
  app.disable('x-powered-by');
  app.use('/api/products', express.json({ limit: '8mb' }));
  app.use(express.json({ limit: '256kb' }));

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  app.use((req: Request, res: Response, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (req.path.startsWith('/api/')) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }
    next();
  });

  app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d', index: false }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, service: 'store-ai-api' });
  });

  // Live store catalog + owner/store profile
  app.get('/api/store', (_req: Request, res: Response) => {
    const store = loadStoreData();
    res.json(store);
  });

  // Update Store & Owner About profile (immediately informs AI Assistant)
  app.put('/api/store-profile', (req: Request, res: Response) => {
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
    const updated = updateStoreProfile({
      storeNameEn: sanitizeText(body.storeNameEn, 100) || undefined,
      storeNameBn: sanitizeText(body.storeNameBn, 100) || undefined,
      ownerNameEn: sanitizeText(body.ownerNameEn, 80) || undefined,
      ownerNameBn: sanitizeText(body.ownerNameBn, 80) || undefined,
      taglineEn: sanitizeText(body.taglineEn, 240) || undefined,
      taglineBn: sanitizeText(body.taglineBn, 240) || undefined,
      aboutEn: sanitizeText(body.aboutEn, 1200) || undefined,
      aboutBn: sanitizeText(body.aboutBn, 1200) || undefined,
      locationEn: sanitizeText(body.locationEn, 100) || undefined,
      locationBn: sanitizeText(body.locationBn, 100) || undefined,
      deliveryPolicyEn: sanitizeText(body.deliveryPolicyEn, 400) || undefined,
      deliveryPolicyBn: sanitizeText(body.deliveryPolicyBn, 400) || undefined,
      returnPolicyEn: sanitizeText(body.returnPolicyEn, 400) || undefined,
      returnPolicyBn: sanitizeText(body.returnPolicyBn, 400) || undefined,
      phone: sanitizeText(body.phone, 40) || undefined,
      whatsapp: sanitizeText(body.whatsapp, 40) || undefined,
      email: sanitizeText(body.email, 120) || undefined,
    });
    res.json({ success: true, store: updated });
  });

  // Add new product
  app.post('/api/products', (req: Request, res: Response) => {
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
    const nameEn = sanitizeText(body.nameEn, 120);
    const nameBn = sanitizeText(body.nameBn, 120) || nameEn;
    const categoryIdRaw = sanitizeText(body.categoryId, 40) as ProductCategoryId;
    const categoryMeta = CATEGORY_MAP[categoryIdRaw] || CATEGORY_MAP['audio-tech'];
    const categoryId: ProductCategoryId = CATEGORY_MAP[categoryIdRaw] ? categoryIdRaw : 'audio-tech';
    const priceBdt = Number(body.priceBdt);
    const stock = Number(body.stock);
    const descriptionEn = sanitizeText(body.descriptionEn, 600);
    const descriptionBn = sanitizeText(body.descriptionBn, 600) || descriptionEn;

    if (!nameEn || Number.isNaN(priceBdt) || priceBdt <= 0 || Number.isNaN(stock) || stock < 0) {
      res.status(400).json({
        success: false,
        message: 'Valid product name, positive price, and non-negative stock quantity are required.',
      });
      return;
    }

    const baseId =
      nameEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40) || 'product';
    const id = `${baseId}-${Date.now().toString(36)}`;
    const sku = `AE-${id.slice(0, 6).toUpperCase()}`;

    let imageUrl = sanitizeText(body.imageUrl, 300);
    if (typeof body.imageDataUrl === 'string' && body.imageDataUrl.startsWith('data:image/')) {
      const saved = saveBase64ProductImage(body.imageDataUrl, baseId);
      if (!saved) {
        res.status(400).json({
          success: false,
          message: 'Uploaded product image must be PNG, JPG, or WebP under 5MB.',
        });
        return;
      }
      imageUrl = saved;
    }

    const product: Product = {
      id,
      sku,
      nameEn,
      nameBn,
      categoryId,
      categoryEn: categoryMeta.en,
      categoryBn: categoryMeta.bn,
      priceBdt: Math.round(priceBdt),
      stock: Math.floor(stock),
      unitEn: sanitizeText(body.unitEn, 20) || 'pcs',
      unitBn: sanitizeText(body.unitBn, 20) || 'টি',
      descriptionEn: descriptionEn || `${nameEn} available in store.`,
      descriptionBn: descriptionBn || `${nameBn} স্টোরে পাওয়া যাচ্ছে।`,
      specsEn: [],
      specsBn: [],
      variants: [sanitizeText(body.variant, 60) || 'Standard'],
      image: imageUrl || '',
    };

    const updated = addProduct(product);
    res.status(201).json({ success: true, product, store: updated });
  });

  // Update product stock, price, or info
  app.patch('/api/products/:id', (req: Request, res: Response) => {
    const id = sanitizeText(req.params.id, 80);
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
    const updates: Partial<Product> = {};

    if (typeof body.stock === 'number' && !Number.isNaN(body.stock) && body.stock >= 0) {
      updates.stock = Math.floor(body.stock);
    }
    if (typeof body.priceBdt === 'number' && !Number.isNaN(body.priceBdt) && body.priceBdt > 0) {
      updates.priceBdt = Math.round(body.priceBdt);
    }
    if (typeof body.nameEn === 'string' && sanitizeText(body.nameEn, 120)) {
      updates.nameEn = sanitizeText(body.nameEn, 120);
    }
    if (typeof body.nameBn === 'string' && sanitizeText(body.nameBn, 120)) {
      updates.nameBn = sanitizeText(body.nameBn, 120);
    }
    if (typeof body.descriptionEn === 'string' && sanitizeText(body.descriptionEn, 600)) {
      updates.descriptionEn = sanitizeText(body.descriptionEn, 600);
    }
    if (typeof body.descriptionBn === 'string' && sanitizeText(body.descriptionBn, 600)) {
      updates.descriptionBn = sanitizeText(body.descriptionBn, 600);
    }
    if (typeof body.imageDataUrl === 'string' && body.imageDataUrl.startsWith('data:image/')) {
      const saved = saveBase64ProductImage(body.imageDataUrl, id);
      if (!saved) {
        res.status(400).json({
          success: false,
          message: 'Uploaded product image must be PNG, JPG, or WebP under 5MB.',
        });
        return;
      }
      updates.image = saved;
    }

    const updated = updateProduct(id, updates);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }
    res.json({ success: true, product: updated, store: loadStoreData() });
  });

  app.delete('/api/products/:id', (req: Request, res: Response) => {
    const id = sanitizeText(req.params.id, 80);
    const deleted = deleteProduct(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }
    res.json({ success: true, store: loadStoreData() });
  });

  // Order placement -> validates stock and decrements real stock in store-data.json
  app.post('/api/orders', (req: Request, res: Response) => {
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
    const customerName = sanitizeText(body.customerName, 120);
    const phone = sanitizeText(body.phone, 40);
    const deliveryArea = body.deliveryArea === 'outside' ? 'outside' : 'dhaka';
    const address = sanitizeText(body.address, 300);
    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (customerName.length < 2 || phone.replace(/[^0-9+]/g, '').length < 7 || address.length < 5 || rawItems.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Please provide customer name, valid phone number, delivery address, and at least one item.',
      });
      return;
    }

    const store = loadStoreData();
    const orderItems: OrderReceipt['items'] = [];
    let subtotalBdt = 0;

    for (const entry of rawItems) {
      if (!entry || typeof entry !== 'object') continue;
      const itemObj = entry as Record<string, unknown>;
      const productId = sanitizeText(itemObj.productId, 80);
      const variant = sanitizeText(itemObj.variant, 80) || 'Standard';
      const quantity = Math.floor(Number(itemObj.quantity));
      const product = store.products.find((p) => p.id === productId);

      if (!product || Number.isNaN(quantity) || quantity <= 0) {
        res.status(400).json({ success: false, message: 'Invalid item in cart.' });
        return;
      }
      if (product.stock < quantity) {
        res.status(409).json({
          success: false,
          message: `Insufficient stock for ${product.nameEn}. Only ${product.stock} left.`,
        });
        return;
      }

      product.stock -= quantity;
      subtotalBdt += product.priceBdt * quantity;
      orderItems.push({
        productId: product.id,
        nameEn: product.nameEn,
        nameBn: product.nameBn,
        variant,
        quantity,
        unitPriceBdt: product.priceBdt,
      });
    }

    const deliveryFeeBdt = deliveryArea === 'outside' ? 130 : 70;
    const receipt: OrderReceipt = {
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
      customerName,
      phone,
      deliveryArea,
      address,
      subtotalBdt,
      deliveryFeeBdt,
      totalBdt: subtotalBdt + deliveryFeeBdt,
      items: orderItems,
      createdAt: new Date().toISOString(),
    };

    saveStoreData(store);
    saveOrder(receipt);

    res.status(201).json({
      success: true,
      receipt,
      store,
    });
  });

  // Server-Side Gemini AI Product & Store Chat Assistant (SSE Streaming)
  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      res.status(500).json({
        success: false,
        message: 'Gemini API key is not configured on the server. Please set GEMINI_API_KEY in Settings > Secrets.',
      });
      return;
    }

    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
    const userMessage = sanitizeText(body.message, 1500);
    const focusedProductId = sanitizeText(body.focusedProductId, 80) || undefined;
    const rawHistory = Array.isArray(body.history) ? body.history : [];

    if (!userMessage) {
      res.status(400).json({
        success: false,
        message: 'Please enter a message for the AI assistant.',
      });
      return;
    }

    const store = loadStoreData();
    const systemInstruction = buildStoreSystemPrompt(store, focusedProductId);

    const contents: Content[] = [];
    for (const turn of rawHistory.slice(-12)) {
      if (!turn || typeof turn !== 'object') continue;
      const t = turn as Record<string, unknown>;
      const role = t.role === 'model' ? 'model' : 'user';
      const text = sanitizeText(t.text, 2000);
      if (text) {
        contents.push({ role, parts: [{ text }] });
      }
    }
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    try {
      const stream = await ai.models.generateContentStream({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();

      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (err) {
      const details = extractErrorDetails(err);
      if (!res.headersSent) {
        res.status(details.status).json({
          success: false,
          message: details.message,
        });
      } else {
        res.write(`data: ${JSON.stringify({ error: details.message })}\n\n`);
        res.end();
      }
    }
  });

  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    const lastmod = new Date().toISOString().split('T')[0];
    const routes = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/#products', priority: '0.9', changefreq: 'daily' },
      { loc: '/#about', priority: '0.8', changefreq: 'weekly' },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
      .map(
        (r) =>
          `  <url>\n    <loc>${baseUrl}${r.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
      )
      .join('\n')}\n</urlset>\n`;

    res.type('application/xml').send(xml);
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.get('*', async (req: Request, res: Response, next) => {
      try {
        const templatePath = path.resolve(__dirname, 'index.html');
        const rawHtml = fs.readFileSync(templatePath, 'utf-8');
        const transformed = await vite.transformIndexHtml(req.originalUrl, rawHtml);
        const seoHtml = injectRouteSeo(transformed, req);
        res.status(200).set({
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'index, follow',
        }).end(seoHtml);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (req: Request, res: Response) => {
      const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
      const seoHtml = injectRouteSeo(html, req);
      res.status(200).set({
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'index, follow',
      }).end(seoHtml);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Storefront & AI Assistant server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
