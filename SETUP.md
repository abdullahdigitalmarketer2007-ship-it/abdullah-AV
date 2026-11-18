# Portfolio Setup & Customization Guide

## 1. Confirm Contact Details & Social Profiles
Add your confirmed public contact details in `.env` (or directly in `src/config/siteConfig.ts`):

```env
VITE_CONTACT_EMAIL="your-email@example.com"
VITE_WHATSAPP_NUMBER="+8801XXXXXXXXX"
VITE_LINKEDIN_URL="https://www.linkedin.com/in/your-profile"
VITE_FACEBOOK_URL="https://www.facebook.com/your-page"
```

Direct email, WhatsApp, and social links stay hidden until valid values are configured so visitors never encounter fake links.

## 2. Contact Form Storage & Webhook Forwarding
- Submitted enquiries are validated on the server (`POST /api/contact`) and saved to `data/enquiries.json`.
- To also forward new enquiries to Slack, Discord, Formspree, or an automation webhook (Zapier/Make), set `CONTACT_WEBHOOK_URL` in `.env`.

## 3. Add Your Real Portrait & Verified Case Studies
- **Owner portrait**: Place an approved photo inside `public/` and update `portraitUrl` in `src/config/siteConfig.ts`.
- **Verified projects**: Edit the `portfolio.projects` array in `src/data/content.ts` (`en` and `bn`) once client permissions and real outcomes are ready. Set `isTemplate: false` and update `statusLabel`.

## 4. Development & Production Commands
- Development server: `npm run dev` (runs Express + Vite on port `3000`)
- Type check: `npm run lint`
- Production build: `npm run build`
- Production server: `NODE_ENV=production npm start`
