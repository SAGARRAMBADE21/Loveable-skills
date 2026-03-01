---
name: lovable-app-creator
description: "Create full Lovable.dev apps from natural language descriptions through any OpenClaw channel. Handles prompt engineering, project setup, and build URL generation."
homepage: https://lovable.dev
user-invocable: true
disable-model-invocation: false
metadata: {"openclaw":{"emoji":"💜"}}
---

# Lovable App Creator

## Purpose

Create complete, production-quality web applications on Lovable.dev directly from any OpenClaw channel (WhatsApp, Slack, Discord, Telegram, iMessage, etc.). The user describes what they want in plain language; this skill handles prompt engineering, architecture decisions, design system selection, and project creation via Lovable's Build-with-URL API.

This is the **master orchestrator** skill. It composes prompts using the other Lovable skills (brand-enforcer, animation-choreographer, accessibility-guard, dashboard-pro, ecommerce-ui) when relevant, producing a comprehensive generation prompt that Lovable can execute in one shot.

> **How it works**: Lovable.dev provides a Build-with-URL API that accepts a URL-encoded prompt (up to 50,000 characters) and optional reference images. This skill constructs the optimal prompt, generates the build URL, and delivers it to the user through their messaging channel.

## Inputs

The user provides a natural language description through their messaging channel. The skill extracts the following from the conversation:

| Parameter       | Extracted From              | Required | Fallback                    |
|-----------------|-----------------------------|----------|-----------------------------|
| `app_idea`      | User's description          | yes      | —                           |
| `app_type`      | Classification of idea      | auto     | landing_page                |
| `brand_style`   | User's aesthetic preference | auto     | startup                     |
| `features`      | Specific features mentioned | auto     | Core features only          |
| `integrations`  | Backend/API needs           | auto     | None                        |
| `reference_urls`| Example sites/screenshots   | no       | None                        |

## App Type Classification

Classify the user's request into one of these categories to determine which sub-skills and templates to activate:

| App Type         | Trigger Keywords                                    | Sub-Skills Activated                          |
|------------------|-----------------------------------------------------|-----------------------------------------------|
| `landing_page`   | landing, website, homepage, portfolio, one-page      | brand-enforcer, animation-choreographer       |
| `dashboard`      | dashboard, analytics, admin, panel, monitoring       | dashboard-pro, brand-enforcer                 |
| `ecommerce`      | store, shop, products, cart, checkout, e-commerce     | ecommerce-ui, brand-enforcer                  |
| `saas`           | SaaS, app, platform, tool, subscription, users       | brand-enforcer, accessibility-guard           |
| `blog`           | blog, articles, posts, content, magazine              | brand-enforcer, animation-choreographer       |
| `portfolio`      | portfolio, showcase, gallery, work, projects          | brand-enforcer, animation-choreographer       |
| `form_app`       | survey, form, questionnaire, registration, booking   | accessibility-guard, brand-enforcer           |
| `social`         | social, feed, community, forum, chat                 | brand-enforcer, accessibility-guard           |
| `custom`         | (anything else)                                       | brand-enforcer                                |

## Workflow

### Phase 1: Understand the Request

When the user sends a message like _"Build me a fitness tracking app with workout logging, progress charts, and a dark theme"_, decompose it:

1. **Extract core idea**: Fitness tracking app → `saas` type.
2. **Identify features**: Workout logging, progress charts.
3. **Detect design preferences**: Dark theme → dark color scheme.
4. **Check for integrations**: Charts → Recharts. User data → Supabase Auth + Database.
5. **Identify reference material**: If user shares screenshots or URLs, capture them as `reference_urls`.

If the description is vague (under 20 words), ask clarifying questions:

```
I'd love to build that! To create the best app, I need a few details:

1. 🎯 What's the primary purpose? (e.g., track workouts, sell products, show portfolio)
2. 👥 Who will use it? (e.g., individuals, teams, customers)
3. 🎨 Any design preference? (e.g., dark mode, colorful, minimal, professional)
4. 📱 Key features? (e.g., user accounts, charts, payments, forms)
5. 🌐 Any websites you like the look of? (share links for reference)
```

### Phase 2: Architect the Application

Based on the extracted information, determine the technical architecture:

**Page Structure** — Define the pages and navigation:

| App Type      | Default Pages                                                    |
|---------------|------------------------------------------------------------------|
| landing_page  | Hero, Features, Testimonials, Pricing, CTA, Footer               |
| dashboard     | Login, Dashboard Overview, Detail Views, Settings                 |
| ecommerce     | Storefront, Product Listing, Product Detail, Cart, Checkout       |
| saas          | Landing, Login/Signup, Dashboard, Settings, Billing               |
| blog          | Home, Article List, Article Detail, About, Categories             |
| portfolio     | Hero, Projects Grid, Project Detail, About, Contact               |
| form_app      | Landing, Form Steps, Confirmation, Admin View                     |
| social        | Feed, Profile, Notifications, Messages, Settings                  |

**Tech Stack Decisions** (all within Lovable's ecosystem):

| Need                | Solution                              |
|---------------------|---------------------------------------|
| UI Components       | shadcn/ui + Tailwind CSS              |
| Authentication      | Supabase Auth                         |
| Database            | Supabase (PostgreSQL)                 |
| File Storage        | Supabase Storage                      |
| Charts / Data Viz   | Recharts                              |
| Animations          | Framer Motion                         |
| Payments            | Stripe (via Supabase Edge Functions)  |
| Icons               | Lucide React                          |
| Routing             | React Router DOM                      |
| State Management    | React Query (TanStack Query)          |
| Forms               | React Hook Form + Zod validation      |

### Phase 3: Compose the Prompt

Build a comprehensive prompt (max 50,000 chars, target 2,000–5,000 for optimal results). Structure:

```
[APP OVERVIEW]
Build a {app_type} called "{app_name}" that {core_purpose}. 
Target audience: {audience}.

[DESIGN SYSTEM]
{Output from brand-enforcer sub-skill}
- Style: {brand_style}
- Colors: {palette}
- Fonts: {fonts}
- Border radius: {radius}

[PAGE STRUCTURE]
{For each page:}
Page: {page_name}
- Layout: {layout_description}
- Components: {component_list}
- Interactions: {interaction_descriptions}

[FEATURES]
{Numbered list of specific features with implementation details}

[ANIMATIONS]
{Output from animation-choreographer sub-skill if activated}

[ACCESSIBILITY]
{Output from accessibility-guard sub-skill if activated}

[BACKEND INTEGRATION]
{Supabase tables, Auth requirements, Edge Functions needed}

[RESPONSIVE DESIGN]
- Desktop: {desktop_layout}
- Tablet: {tablet_adaptations}
- Mobile: {mobile_adaptations}

[TECHNICAL CONSTRAINTS]
- Use shadcn/ui for all UI components
- Use Recharts for any charts/graphs
- Use Framer Motion for animations
- Use React Router DOM for routing
- Use React Hook Form + Zod for form validation
- All images should have alt text
- All interactive elements need focus states
- Support prefers-reduced-motion
- Mobile-first responsive design
```

### Phase 4: Generate Build URL

Construct the Lovable Build-with-URL:

```
Base URL: https://lovable.dev/
Parameters:
  ?autosubmit=true
  #prompt={URL_ENCODED_PROMPT}
  &images={URL_ENCODED_IMAGE_1}  (if reference images provided)
  &images={URL_ENCODED_IMAGE_2}  (if additional images)
```

**URL Construction Rules**:
- Prompt must be URL-encoded (spaces → %20, special chars encoded).
- Maximum prompt length: 50,000 characters.
- Maximum 10 image URLs.
- Image URLs must be publicly accessible (JPEG, PNG, or WebP).
- Image URLs themselves must be URL-encoded.

### Phase 5: Deliver to User

Send the response back through the user's channel:

```
🚀 Your {app_type} is ready to build!

📋 App: {app_name}
🎨 Style: {brand_style} with {color_description}
📱 Pages: {page_count} pages
⚡ Features: {feature_summary}

👉 Click to create your app:
{generated_lovable_url}

This will open Lovable.dev and automatically start building your app.
You'll be able to preview it and make changes in real-time.

Want me to adjust anything before you build?
```

### Phase 6: Iterative Refinement

If the user wants changes after reviewing:

1. **Design changes**: "Make it darker" → adjust palette, regenerate URL.
2. **Feature additions**: "Add user authentication" → add Supabase Auth to prompt.
3. **Layout changes**: "Make the hero bigger" → adjust hero section in prompt.
4. **Style changes**: "Make it more playful" → switch brand style, regenerate.

Each refinement regenerates the build URL with the updated prompt.

## Prompt Templates by App Type

> See `references/prompt-templates.md` for complete, ready-to-use prompt templates for each app type.

## Conversation Flow Examples

### Example 1: Quick Build (Minimal Input)

**User**: "Build me a portfolio website"

**Agent response**:
```
I'll create a stunning portfolio for you! A few quick questions:

1. 🎯 What do you do? (designer, developer, photographer, etc.)
2. 🎨 Design vibe? (minimal, bold, creative, dark)
3. 📸 How many projects to showcase?
```

**User**: "I'm a UI designer, make it minimal and clean, about 8 projects"

**Agent**: _(composes prompt with brand-enforcer=minimalist, animation-choreographer=subtle+smooth, generates URL)_

```
🚀 Your portfolio is ready to build!

📋 App: UI Design Portfolio
🎨 Style: Minimalist — neutral palette, Inter font, clean grid
📱 Pages: 4 (Hero, Projects Grid, Project Detail, Contact)
⚡ Features: Project grid with hover previews, smooth scroll animations, contact form, responsive

👉 Click to create:
https://lovable.dev/?autosubmit=true#prompt=Build%20a%20minimalist%20UI%20designer%20portfolio...

Want me to adjust anything?
```

### Example 2: Complex Build (Detailed Input)

**User**: "I need a SaaS dashboard for my HR analytics startup called PeopleMetrics. Dark theme, shows headcount trends, attrition rates, hiring funnel, employee satisfaction scores. Need user login and team workspaces."

**Agent**: _(classifies as dashboard+saas, activates dashboard-pro+brand-enforcer+accessibility-guard, composes full prompt with Supabase Auth, Recharts, dark-operational theme)_

```
🚀 Your HR analytics dashboard is ready to build!

📋 App: PeopleMetrics
🎨 Style: Technical dark theme — slate-950, cyan accents
📱 Pages: 5 (Login, Dashboard, Employees, Reports, Settings)
⚡ Features: 
  - Supabase Auth (email + Google SSO)
  - 4 KPI cards (headcount, attrition, open roles, satisfaction)
  - Recharts: headcount trend, hiring funnel, attrition breakdown
  - Data table with sorting, filtering, pagination
  - Team workspaces with role-based access
  - Collapsible sidebar navigation
  - Date range picker with presets

🔧 Backend: Supabase (Auth + PostgreSQL + Row Level Security)
📊 Charts: Recharts with dark-operational palette

👉 Click to create:
https://lovable.dev/?autosubmit=true#prompt=Build%20an%20HR%20analytics%20dashboard...

This is a complex app — Lovable will scaffold the entire thing. 
You can refine each page in Lovable's editor after generation.

Want me to adjust the scope, features, or design?
```

### Example 3: E-Commerce Build

**User**: "Create a luxury candle store with a dark elegant theme"

**Agent**: _(classifies as ecommerce, activates ecommerce-ui with store_type=artisan_goods + brand_tone=luxury, brand-enforcer=editorial, animation-choreographer=subtle+cinematic)_

```
🚀 Your luxury candle store is ready to build!

📋 App: Luxury Candle Store
🎨 Style: Luxury dark — #0a0e1a background, gold accents, Playfair Display headings
📱 Pages: 5 (Storefront, Collection, Product Detail, Cart, Checkout)
⚡ Features:
  - Hero with featured collection
  - Product grid with hover zoom + quick-add
  - Product detail with image gallery + scent notes
  - Slide-in cart drawer
  - Multi-step checkout with Stripe
  - Newsletter signup

👉 Click to create:
https://lovable.dev/?autosubmit=true#prompt=Build%20a%20luxury%20candle%20e-commerce...
```

## Sub-Skill Composition

When composing the final prompt, this skill conditionally includes output from other Lovable skills:

| Condition                              | Sub-Skill Invoked           | Output Included               |
|----------------------------------------|----------------------------|-------------------------------|
| Always                                 | lovable-brand-enforcer      | Design tokens, colors, fonts  |
| User wants animations / not disabled   | lovable-animation-choreographer | Timing, entrances, hovers  |
| App type = dashboard                   | lovable-dashboard-pro       | Layout, charts, KPIs          |
| App type = ecommerce                   | lovable-ecommerce-ui        | Product layouts, cart, checkout |
| Accessibility level specified          | lovable-accessibility-guard | WCAG constraints              |

## Guardrails

- Never generate a prompt exceeding 50,000 characters. Target 2,000–5,000 for best results.
- Never include sensitive data (API keys, passwords, personal info) in the build URL — prompts are visible in the URL hash.
- Always ask clarifying questions if the user's description is under 20 words.
- Never promise features Lovable cannot deliver (native mobile apps, blockchain, ML model training).
- Always inform the user that the generated URL will open Lovable.dev and require a Lovable account.
- If the user provides reference images, verify they are publicly accessible URLs before including.
- Do not auto-submit the URL on behalf of the user — always let the user click the link themselves.
- Always include responsive design instructions in the prompt.
- For apps requiring authentication, always include Supabase Auth in the prompt.
- For apps requiring payments, always include Stripe integration instructions.

## Failure Handling

| Problem | Recovery |
|---------|----------|
| User description too vague | Ask the 5 clarifying questions (purpose, audience, design, features, references). |
| Generated prompt too long (>50K chars) | Simplify by removing detailed animation specs and reference docs. Focus on core structure and features. |
| User shares non-public image URLs | Inform user: "I can't use that image as a reference since it's not publicly accessible. Can you share a public URL or describe what you want?" |
| User wants unsupported feature | "Lovable builds React web apps. For {feature}, you'd need to add that after generation using {alternative}. Want me to include the closest web equivalent?" |
| Build URL doesn't work | "Try opening this link in a browser where you're logged into Lovable.dev. If you don't have an account, sign up at lovable.dev first." |
| User wants changes after building | "You can refine directly in Lovable's editor! Just describe the change in Lovable's chat. Or tell me what to adjust and I'll generate a new build URL." |

## External Endpoints

This skill constructs URLs pointing to `https://lovable.dev/`. It does not make API calls or transmit data to any endpoint. The user manually clicks the generated link.

## Security & Privacy

- This skill generates URLs only — it does not execute code or make API requests.
- Build prompts may contain the user's app idea; no sensitive personal data should be included.
- Reference image URLs are included in the build URL fragment (hash) which is not sent to servers in HTTP requests.
- Users must have their own Lovable.dev account to use the generated URLs.

## Trust Statement

This skill contains no executable scripts. It produces Lovable Build-with-URL links from natural language descriptions. It does not access the filesystem, execute commands, or communicate with external services. The user retains full control by choosing whether to click the generated link.
