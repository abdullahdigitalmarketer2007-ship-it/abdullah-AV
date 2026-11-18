# MASTER PROMPT — Digital Marketing & SEO Specialist Portfolio

## Role
Act as a senior UI/UX designer, brand strategist, and full-stack web developer. Build a polished, modern, responsive personal portfolio website for a Digital Marketing & SEO Specialist based in Bangladesh.

## Project identity
- Website type: Personal portfolio / professional service showcase.
- Owner name: `Abdullah` (use only if the owner confirms this should be public; otherwise use `[Your Name]`).
- Professional title: Digital Marketing & SEO Specialist.
- Audience: Bangladeshi businesses, entrepreneurs, startups, creators, and potential clients.
- Languages: Bangla and English, with a visible language switcher.
- Main goal: Build professional credibility and generate relevant client enquiries.
- Brand name: Not yet decided. Use an editable text wordmark placeholder; do not invent a final brand identity.

## Read all project files before implementation
1. `PRD.md`: source of truth for goals, audiences, page structure, features, journeys, and acceptance criteria.
2. `DESIGN_SYSTEM.md`: source of truth for visual direction, tokens, typography, layout, components, and responsive behavior.
3. `CONTENT.md`: source of truth for draft copy, headings, CTAs, and content placeholders. Keep claims factual and owner-editable.
4. `ASSETS.md`: source of truth for logo, portrait, project imagery, and image-generation prompts.
5. This file coordinates the build. Do not contradict the other files. If information is missing, preserve a clearly marked placeholder and ask the owner rather than inventing it.

## Website positioning
Present the owner as a digital marketing and SEO professional. The website is a portfolio, not an online store. Its primary purpose is to explain skills and services, display verified work, and make it easy to contact the owner.

## Required pages / sections
- Home
- About
- Skills & Tools
- Services
- Portfolio / Projects
- Case Study detail template (only for real, approved projects)
- Blog / Insights (optional; include only if the owner plans to publish)
- Contact
- Privacy Policy (only if forms or analytics collect data; draft requires owner review)

## Required functionality
- Responsive navigation and mobile menu.
- Bangla / English language switcher.
- Hero section with professional title, short positioning statement, and clear CTAs.
- About section with factual biography and experience placeholders.
- Skills and tools section; show only tools and skills the owner confirms.
- Services section with service descriptions and “Discuss a Project” / “Request a Quote” CTA.
- Portfolio grid with real project entries. If none are supplied, show an honest “Projects will be added soon” state or clearly labelled editable placeholders; do not create fake clients or results.
- Project detail pages or modal only if useful and supported by real project content.
- Contact form with validation and honest success/error states.
- WhatsApp contact CTA using an owner-provided number. Until configured, do not create a fake link or number.
- Social profile links only when exact URLs are supplied.
- Basic SEO: semantic HTML, unique title/meta description per page, clean URLs, sitemap, robots.txt, Open Graph metadata, descriptive alt text, and structured data only when accurate.
- Accessibility: keyboard navigation, visible focus, readable contrast, labels, and useful form errors.

## Design direction
Follow `DESIGN_SYSTEM.md`. Aim for a premium, minimal, confident portfolio. Use a clear typographic hierarchy, restrained colors, generous spacing, a strong hero, concise service cards, and well-presented project case studies. Avoid generic agency-template clutter and unnecessary e-commerce features.

## Technical expectations
- Use a maintainable component-based architecture supported by the chosen Google AI Studio environment.
- Separate reusable UI, content data, and form/backend logic.
- Do not expose API keys or private credentials in client-side code.
- Validate and sanitize form submissions on both client and server where a backend is used.
- Do not pretend that form delivery, WhatsApp, analytics, or other integrations work until configured and tested.
- Provide loading, empty, success, and error states.
- Optimize images and avoid unnecessary libraries.

## Build sequence
1. Read all five files and list missing owner-supplied details.
2. Establish design tokens, typography, responsive container, navigation, and footer.
3. Build the homepage hero, About, Skills, Services, and Contact sections.
4. Build the Portfolio grid and case-study template.
5. Add bilingual content and language switching.
6. Add working contact form integration only if a backend/email endpoint is configured; otherwise clearly label the form as a demo.
7. Implement SEO, accessibility, responsive behavior, and performance improvements.
8. Test all links, forms, language states, mobile navigation, and empty portfolio states.
9. Provide setup, configuration, and deployment instructions.

## Definition of done
- The website clearly communicates who the specialist is and how to contact them.
- All public claims, skills, tools, projects, and results are owner-confirmed.
- No fake testimonials, client logos, certificates, rankings, statistics, or performance promises.
- No cart, checkout, payment gateway, product inventory, or admin dashboard unless the owner later explicitly changes the project scope.
- Both Bangla and English experiences are complete for key navigation and content.
- The website works on mobile, tablet, and desktop.
- All buttons and forms have real actions or honest placeholder states.
- SEO and accessibility fundamentals are implemented.

## Owner details required before launch
- Confirm public display name and final professional title.
- Confirm brand/portfolio name, logo, and domain if any.
- Final biography and accurate years of experience.
- Confirmed skills, tools, and services.
- Real project descriptions, screenshots, and permission to show client details.
- Business email, WhatsApp number, and social profile URLs.
- Preferred contact form destination.
