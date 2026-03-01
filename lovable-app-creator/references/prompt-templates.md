# Prompt Templates by App Type

These are optimized, ready-to-compose prompt templates for each app type. The agent fills in the `{variables}` based on user input and sub-skill outputs.

---

## Landing Page Template

```
Build a modern landing page for "{app_name}" — {one_line_description}.

DESIGN:
{brand_enforcer_output}

PAGE STRUCTURE:
1. NAVIGATION: Sticky top nav with logo (left), nav links (center: Features, Pricing, Testimonials), CTA button (right: "Get Started"). On scroll, add backdrop-filter blur and subtle shadow.

2. HERO SECTION: 
   - Large headline (display size): "{headline}"
   - Subtitle (body size, muted color): "{subtitle}"
   - Primary CTA button: "{cta_text}"
   - Secondary CTA: "{secondary_cta}" (outlined)
   - Hero image/illustration on right (desktop) or below (mobile)

3. SOCIAL PROOF BAR: Company logos or "Trusted by X+ users" with small logos. Subtle fade-in animation.

4. FEATURES SECTION:
   - Section heading: "Features" with subtitle
   - 3-column grid of feature cards, each with:
     - Lucide icon (24px, primary color)
     - Feature title (h3)
     - Feature description (body-sm, muted)
   - Cards animate in on scroll (stagger 80ms)

5. TESTIMONIALS:
   - 3 testimonial cards with avatar, name, role, quote, star rating.
   - Carousel on mobile, grid on desktop.

6. PRICING:
   - {pricing_tiers} pricing cards (Free, Pro, Enterprise typical).
   - Highlighted "recommended" tier with primary border/shadow.
   - Feature comparison list with check/x icons.
   - Monthly/Annual toggle.

7. CTA SECTION:
   - Dark or primary-colored background.
   - Large headline, subtitle, CTA button.
   - Optional: email input + submit.

8. FOOTER:
   - 4-column link grid: Product, Company, Resources, Legal.
   - Social media icons.
   - Copyright + "Built with Lovable" attribution.

ANIMATIONS:
{animation_choreographer_output}

ACCESSIBILITY:
{accessibility_guard_output}

RESPONSIVE:
- Desktop: Full multi-column layouts.
- Tablet: 2-column feature grid, stacked hero.
- Mobile: Single column, hamburger menu, full-width buttons.

TECHNICAL:
- Use shadcn/ui for all components (Button, Card, Badge, NavigationMenu).
- Use Framer Motion for scroll animations.
- Use Lucide React for icons.
- All images have alt text.
- Semantic HTML with proper heading hierarchy.
```

---

## Dashboard Template

```
Build a {domain} dashboard called "{app_name}".

DESIGN:
{brand_enforcer_output}
Theme: {theme} (light-professional | dark-operational | high-contrast)
Density: {density}

LAYOUT:
{dashboard_pro_output}

1. SIDEBAR (left, collapsible 240px/64px):
   - Logo at top
   - Nav items: {nav_items}
   - Active item highlighted with primary color
   - Collapse toggle at bottom
   - User avatar + name at bottom

2. TOP BAR (56px height):
   - Breadcrumbs (left)
   - Search input with ⌘K shortcut (center)
   - Date range picker: Today, 7d, 30d, 90d, Custom (right-center)
   - Notification bell + user avatar (right)
   - On scroll: backdrop-filter blur(10px)

3. MAIN CONTENT:
   KPI ROW ({kpi_count} cards):
   {For each KPI:}
   - {kpi_name}: Large number (2rem, tabular-nums), {trend_direction} trend arrow, percentage change, sparkline

   CHART AREA ({chart_layout}):
   {For each chart:}
   - {chart_type} chart: {chart_description} using Recharts
   - Interactive tooltips, {chart_colors}

   DATA TABLE:
   - Columns: {table_columns}
   - Sortable headers, row hover, pagination
   - Inline action buttons on row hover

FEATURES:
{numbered_feature_list}

AUTHENTICATION:
- Supabase Auth with email/password
- Protected routes — redirect to login if not authenticated
- User profile in sidebar

DATABASE (Supabase):
{table_schemas}

RESPONSIVE:
- Desktop (1280px+): Full sidebar + multi-column
- Tablet (768-1279px): Collapsed sidebar + 2-column
- Mobile (<768px): Hidden sidebar + single column
```

---

## E-Commerce Template

```
Build a {store_type} e-commerce store called "{app_name}" with a {brand_tone} design.

DESIGN:
{brand_enforcer_output}

{ecommerce_ui_output}

PAGES:

1. STOREFRONT (homepage):
   - Hero: Full-width featured {collection/product}, headline, CTA
   - Categories: Bento grid with {category_count} category cards
   - Trending: Horizontal product scroll
   - Social proof: Reviews section
   - Newsletter: Email input + subscribe

2. PRODUCT LISTING:
   - Filter sidebar (slide-in on mobile): Category, Price range, {custom_filters}
   - Sort bar: Relevance, Price (Low-High, High-Low), Newest
   - Product grid: {columns}-column with hover-reveal quick-add
   - Pagination or infinite scroll

3. PRODUCT DETAIL:
   - 60/40 split: Image gallery (left) / Product info (right)
   - Gallery: Swipeable with thumbnail strip and dot indicators
   - Info: Name, rating, price, {variant_selectors}, quantity, Add to Cart
   - Accordion: Description, {spec_sections}, Reviews
   - Related products carousel

4. CART (slide-in drawer):
   - shadcn Sheet from right
   - Item cards with quantity +/- and remove
   - Order summary with subtotal, shipping, tax, total
   - Checkout CTA button

5. CHECKOUT:
   - 3 steps: Shipping → Payment → Review
   - Progress indicator
   - Shipping form with validation
   - Stripe Elements for payment
   - Order summary sidebar
   - Trust badges (Secure Checkout, Free Shipping, Returns)

INTERACTIONS:
{commerce_interaction_specs}

BACKEND:
- Supabase for products, cart, orders
- Supabase Auth for user accounts
- Stripe for payments (Edge Function)
- Supabase Storage for product images

RESPONSIVE:
- Desktop: Multi-column grids, side-by-side PDP
- Tablet: 2-column grids, stacked PDP
- Mobile: Single column, full-width buttons, swipe gestures
```

---

## SaaS Application Template

```
Build a SaaS application called "{app_name}" — {description}.

DESIGN:
{brand_enforcer_output}

PAGES:

1. MARKETING LANDING PAGE:
   {Use landing_page template above}

2. AUTH PAGES:
   - Login: Email/password + Google SSO + "Forgot password"
   - Signup: Name, email, password + Google SSO + Terms checkbox
   - Forgot Password: Email input + reset link
   - Design: Centered card on subtle gradient background
   - Use Supabase Auth

3. ONBOARDING (first-time user):
   - 3-step wizard: Welcome → Setup preferences → Complete
   - Progress indicator
   - Skip option
   - Store preferences in Supabase user metadata

4. MAIN DASHBOARD:
   {Use dashboard template components}

5. SETTINGS:
   - Tabs: Profile, Account, Notifications, Billing, Team
   - Profile: Avatar upload, name, email, bio
   - Account: Password change, delete account
   - Notifications: Toggle switches for email/push preferences
   - Billing: Current plan, usage, upgrade CTA, payment method
   - Team: Invite members, role management, member list

FEATURES:
{numbered_feature_list}

BACKEND:
- Supabase Auth (email + Google OAuth)
- Supabase Database with Row Level Security
- Supabase Edge Functions for server-side logic
- Supabase Storage for file uploads
{additional_integrations}

RESPONSIVE:
- Fully responsive, mobile-first
- Dashboard collapses to single column on mobile
- Settings uses vertical tab list on mobile
```

---

## Blog Template

```
Build a blog/publication called "{app_name}" with a {brand_style} design.

DESIGN:
{brand_enforcer_output}
Typography-focused: Large, readable body text (1.125rem, 1.8 line-height).

PAGES:

1. HOME:
   - Featured post (large card with image, title, excerpt, author, date)
   - Recent posts grid (3-column on desktop)
   - Category filter pills
   - Newsletter signup section

2. ARTICLE LIST:
   - Category filter + search
   - Post cards: Image, title, excerpt, author avatar+name, date, read time
   - Pagination

3. ARTICLE DETAIL:
   - Title (display size), author, date, read time
   - Featured image (full-width)
   - Article body (max-width 680px, centered)
   - Share buttons (X, LinkedIn, Copy Link)
   - Author bio card
   - Related posts at bottom

4. ABOUT PAGE:
   - Team/author bios
   - Mission statement
   - Contact information

RESPONSIVE:
- Desktop: 3-column grid, wide article images
- Mobile: Single column, full-width images
```

---

## Portfolio Template

```
Build a portfolio website for "{name}" — a {profession}.

DESIGN:
{brand_enforcer_output}
Clean, minimal — let the work speak.

PAGES:

1. HERO:
   - Large name/title
   - One-line bio
   - Subtle scroll indicator
   - Optional: animated background or gradient

2. PROJECTS GRID:
   - {columns}-column masonry or bento grid
   - Project cards: Image thumbnail, title, category tag
   - Hover: Image lightens/darkens, title slides up
   - Filter by category (pills or tabs)
   - {animation_choreographer_output}

3. PROJECT DETAIL:
   - Project title, year, category
   - Full-width hero image
   - Description text
   - Image gallery (grid or carousel)
   - Tools/tech used (badge pills)
   - Next/Previous project navigation

4. ABOUT:
   - Photo, bio text
   - Skills/tools list
   - Experience timeline (optional)
   - Downloadable resume link

5. CONTACT:
   - Contact form (name, email, message) using React Hook Form + Zod
   - Social links (GitHub, LinkedIn, Dribbble, etc.)
   - Email address

ANIMATIONS:
{animation_choreographer_output}

RESPONSIVE:
- Desktop: Multi-column project grid
- Tablet: 2-column grid
- Mobile: Single column, swipeable galleries
```

---

## URL Construction

After composing the prompt from the template above:

```javascript
// Pseudocode for URL construction
const prompt = composePrompt(appType, userInput, subSkillOutputs);
const encodedPrompt = encodeURIComponent(prompt);

let url = `https://lovable.dev/?autosubmit=true#prompt=${encodedPrompt}`;

// Add reference images if provided
if (referenceImages.length > 0) {
  for (const img of referenceImages.slice(0, 10)) {
    url += `&images=${encodeURIComponent(img)}`;
  }
}

// Verify URL length is reasonable
if (url.length > 60000) {
  // Simplify prompt — remove animation details, reduce feature specificity
  prompt = simplifyPrompt(prompt);
}
```

## Prompt Length Guidelines

| App Complexity | Target Prompt Length | Content Focus                        |
|----------------|---------------------|--------------------------------------|
| Simple         | 1,000–2,000 chars   | Structure + design + core features   |
| Medium         | 2,000–5,000 chars   | + interactions + backend + responsive |
| Complex        | 5,000–10,000 chars  | + detailed specs + multi-page + auth  |
| Maximum        | 10,000–50,000 chars | Full specification (rarely needed)    |

> **Best practice**: 2,000–5,000 characters produces the best results. Lovable performs better with clear, structured prompts than extremely long ones.
