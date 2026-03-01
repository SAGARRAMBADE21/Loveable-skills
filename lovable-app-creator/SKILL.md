---
name: lovable-app-creator
description: "Generates Lovable.dev build URLs from natural language app descriptions. Use when a user asks to build, create, or make any website, web app, landing page, dashboard, store, portfolio, or SaaS app. Outputs a clickable URL — never writes code or uses browser tools."
homepage: https://lovable.dev
user-invocable: true
disable-model-invocation: false
metadata: {"openclaw":{"emoji":"💜"}}
---

# Lovable App Creator

## What This Skill Does

This skill takes a user's app description and outputs a **Lovable.dev build URL**. That's it.

**Your ONLY job:**
1. Read the user's request
2. Compose a detailed prompt (500-2000 chars)
3. Use the helper script to generate the URL
4. Reply with the clickable URL

## Rules

- **NEVER write code** (no HTML, CSS, JavaScript, no files)
- **NEVER use browser tools** (no navigating to websites)
- **NEVER tell user to copy/paste the prompt manually**
- **NEVER create files** in the workspace
- **ALWAYS output a clickable URL** in your reply

## How to Generate the URL

**Step 1**: Write your composed prompt to a temp file:
```bash
cat << 'PROMPT_EOF' > /tmp/lovable_prompt.txt
Build a modern portfolio website...
(your full composed prompt here)
PROMPT_EOF
```

**Step 2**: Generate the URL using the helper script:
```bash
python3 {baseDir}/scripts/generate_url.py --file /tmp/lovable_prompt.txt
```

**Step 3**: Copy the output URL and include it in your reply to the user.

This is the ONLY correct workflow. Do NOT try to URL-encode manually.

## URL Format

```
https://lovable.dev/?autosubmit=true#prompt={URL_ENCODED_PROMPT}
```

## Complete Working Example

**User says:** "Build me a portfolio site for a UI designer, dark minimal theme"

**You compose this prompt:**
```
Build a modern, minimal UI designer portfolio website with the following specifications:

DESIGN:
- Dark theme with #0a0a0f background, #ffffff text, #6366f1 accent color
- Inter font for body, clean sans-serif
- Rounded corners (8px), subtle shadows, glassmorphism cards
- Smooth scroll behavior

PAGES:
1. Hero: Large name/title, brief tagline, scroll-down indicator
2. Projects Grid: 3-column responsive grid, hover effects showing project details
3. About: Short bio, skills list, tools used
4. Contact: Simple contact form with name, email, message fields

TECH:
- Use shadcn/ui components and Tailwind CSS
- Use Framer Motion for entrance animations and hover effects
- Mobile-first responsive design
- All images have alt text
```

**You URL-encode it and reply:**

```
🚀 Your portfolio is ready to build!

📋 App: UI Designer Portfolio
🎨 Style: Dark minimal — #0a0a0f bg, indigo accents, Inter font
📱 Pages: Hero, Projects, About, Contact

👉 Click to create your app:
https://lovable.dev/?autosubmit=true#prompt=Build%20a%20modern%2C%20minimal%20UI%20designer%20portfolio%20website%20with%20the%20following%20specifications%3A%0A%0ADESIGN%3A%0A-%20Dark%20theme%20with%20%230a0a0f%20background%2C%20%23ffffff%20text%2C%20%236366f1%20accent%20color%0A-%20Inter%20font%20for%20body%2C%20clean%20sans-serif%0A-%20Rounded%20corners%20(8px)%2C%20subtle%20shadows%2C%20glassmorphism%20cards%0A-%20Smooth%20scroll%20behavior%0A%0APAGES%3A%0A1.%20Hero%3A%20Large%20name%2Ftitle%2C%20brief%20tagline%2C%20scroll-down%20indicator%0A2.%20Projects%20Grid%3A%203-column%20responsive%20grid%2C%20hover%20effects%20showing%20project%20details%0A3.%20About%3A%20Short%20bio%2C%20skills%20list%2C%20tools%20used%0A4.%20Contact%3A%20Simple%20contact%20form%20with%20name%2C%20email%2C%20message%20fields%0A%0ATECH%3A%0A-%20Use%20shadcn%2Fui%20components%20and%20Tailwind%20CSS%0A-%20Use%20Framer%20Motion%20for%20entrance%20animations%20and%20hover%20effects%0A-%20Mobile-first%20responsive%20design%0A-%20All%20images%20have%20alt%20text

🔗 This opens Lovable.dev and auto-builds your app. You need a Lovable account.
Want me to adjust anything? 🔧
```

## Prompt Composition Guide

Structure your prompt in this order:

1. **App Overview**: What it is, who it's for
2. **Design**: Theme (dark/light), colors (hex), fonts, border radius, style
3. **Pages**: List each page with its components and layout
4. **Features**: Specific functionality (auth, payments, charts, etc.)
5. **Tech Stack**: shadcn/ui, Tailwind CSS, Recharts, Framer Motion, Supabase
6. **Responsive**: Mobile-first, breakpoints

### Design Defaults by App Type

| App Type | Colors | Font | Style |
|----------|--------|------|-------|
| Landing Page | Dark bg, vibrant accent | Inter | Clean, modern |
| Dashboard | Slate-900 bg, cyan/green accents | Inter | Data-dense |
| E-commerce | Based on product type | System | Trust-focused |
| SaaS | Professional, brand colors | Inter | Functional |
| Portfolio | Minimal, 2-3 colors | Inter | Spacious |
| Blog | Light/dark, readable | Georgia/Inter | Content-first |

### Tech Stack by Feature

| User Need | Add to Prompt |
|-----------|---------------|
| User accounts | "Use Supabase Auth with email login" |
| Database | "Use Supabase PostgreSQL for data storage" |
| Charts | "Use Recharts for data visualization" |
| Animations | "Use Framer Motion for animations" |
| Payments | "Integrate Stripe for payments" |
| Forms | "Use React Hook Form with Zod validation" |
| File uploads | "Use Supabase Storage for file uploads" |

## Handling Vague Requests

If the user says something short like "make me a website", ask:

```
I'd love to build that! Quick questions:

1. 🎯 What's it for? (portfolio, business, store, blog?)
2. 🎨 Design preference? (dark, light, colorful, minimal?)
3. 📱 Key features? (contact form, gallery, user accounts?)
```

Keep it to 3 questions max. Don't over-ask.

## Guardrails

- Prompt must be under 50,000 characters (target 2000-5000)
- Never include API keys, passwords, or personal data in the URL
- The prompt is visible in the URL hash — keep it professional
- Users need their own Lovable.dev account
- Lovable builds React web apps only — no native mobile, no blockchain

## Reference Files

For detailed prompt templates by app type, see `{baseDir}/references/prompt-templates.md`.
For channel-specific formatting (WhatsApp, Slack, etc.), see `{baseDir}/references/conversation-flows.md`.
