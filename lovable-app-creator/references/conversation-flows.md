# Conversation Flows Reference

## Channel-Specific Formatting

### WhatsApp / Telegram
- Use emoji for visual structure (bullet points don't render well).
- Keep messages under 4096 characters.
- Split long responses into multiple messages.
- Use *bold* for emphasis (WhatsApp markdown).
- Links are auto-previewed — build URL will show Lovable.dev preview.

```
🚀 *Your app is ready to build!*

📋 App: FitTracker
🎨 Style: Dark theme, cyan accents
📱 Pages: 4 pages

⚡ Features:
• Workout logging
• Progress charts
• User authentication
• Profile settings

👉 *Click to create your app:*
https://lovable.dev/?autosubmit=true#prompt=...

Want me to adjust anything? 🔧
```

### Slack
- Use Slack Block Kit formatting.
- Buttons can embed the build URL directly.
- Use threads for refinement conversations.

```
:rocket: *Your app is ready to build!*

*App:* FitTracker
*Style:* Dark theme, cyan accents  
*Pages:* Dashboard, Workouts, Progress, Settings

*Features:*
• Workout logging with exercise library
• Progress charts (Recharts)
• Supabase Auth
• Profile management

<https://lovable.dev/?autosubmit=true#prompt=...|:arrow_right: Build on Lovable>

Reply in thread to adjust the design or features.
```

### Discord
- Use Discord embed formatting.
- Code blocks for technical details.
- Thread for refinements.

```
🚀 **Your app is ready to build!**

**App:** FitTracker
**Style:** Dark theme, cyan accents
**Pages:** 4

**Features:**
- Workout logging
- Progress charts
- User auth
- Profile settings

**👉 Build it:** [Click here to create](https://lovable.dev/?autosubmit=true#prompt=...)

> Reply to adjust design or features.
```

### iMessage
- Keep it simple and short.
- Links are auto-previewed.
- No rich formatting available.

```
🚀 Your FitTracker app is ready!

Dark theme, 4 pages, workout logging + progress charts.

Click to build:
https://lovable.dev/?autosubmit=true#prompt=...

Reply to adjust anything.
```

---

## Clarification Question Trees

### When User Says: "Build me an app"
```
What kind of app? Pick one or describe:
1️⃣ Landing page / Website
2️⃣ Dashboard / Admin panel
3️⃣ Online store
4️⃣ SaaS tool
5️⃣ Blog / Content site
6️⃣ Portfolio
7️⃣ Something else — just describe it!
```

### When User Says: "Build me a dashboard"
```
Great! What data will the dashboard show?
1. 📊 What metrics/KPIs are most important?
2. 🏢 What industry? (Marketing, Finance, DevOps, HR, etc.)
3. 🎨 Light or dark theme?
4. 👥 Need user login?
```

### When User Says: "Build me a store"
```
Let's create your store! Quick questions:
1. 🛍️ What are you selling? (fashion, electronics, food, digital, etc.)
2. 🎨 What vibe? (luxury, playful, minimal, bold, eco)
3. 💳 Need payment integration?
4. 📦 How many products approximately?
```

### When User Says: "Make it look like [reference]"
```
I'll use that as inspiration! To get it right:
1. What specific elements do you like? (layout, colors, typography, animations)
2. What would you change from the reference?
3. What's YOUR brand name and colors?

Share a screenshot or URL for best results — I can use it as a visual reference!
```

---

## Refinement Conversation Patterns

### Design Refinements
```
User: "Make it darker"
Agent: Updated to dark theme — slate-950 background, lighter text. 
       New build link: [URL]

User: "I don't like the colors"  
Agent: What colors do you prefer? Options:
       1. 💜 Purple/Indigo (modern tech)
       2. 💚 Green/Emerald (nature/growth)
       3. 🔵 Blue/Cyan (trust/professional)
       4. 🟠 Orange/Amber (energy/creative)
       5. 🖤 Monochrome (elegant/minimal)
       Or share your brand hex colors!

User: "More animations"
Agent: Upgraded to expressive cinematic animations — 
       parallax hero, bouncy card entrances, glow CTAs.
       New build link: [URL]
```

### Feature Refinements
```
User: "Add user login"
Agent: Added Supabase Auth with:
       ✅ Email/password signup + login
       ✅ Google SSO
       ✅ Protected routes
       ✅ Profile page in settings
       New build link: [URL]

User: "I need payment"
Agent: Added Stripe integration:
       ✅ Pricing page with plan comparison
       ✅ Stripe checkout (via Supabase Edge Function)
       ✅ Subscription management in settings
       New build link: [URL]

User: "Add a blog section"
Agent: Added blog pages:
       ✅ Blog listing with category filters
       ✅ Article detail with rich text
       ✅ Author bios
       ✅ Related posts
       New build link: [URL]
```

### Scope Management
```
User: "Can it also have AI chat?"
Agent: Lovable can build a chat UI, but connecting to an actual AI API
       (OpenAI, Claude, etc.) requires backend setup after generation.
       
       I can add:
       ✅ Chat interface UI (message bubbles, input, send button)
       ✅ Conversation thread layout
       ⚠️ AI backend — you'll need to add your API key in Supabase
           Edge Functions after the app is created.
       
       Want me to include the chat UI? You can wire up the AI later.
```

---

## Error Recovery

### URL Too Long
```
The app specification is very detailed and creating a long URL.
I'll streamline it:

Option 1: Build the core app first, add features iteratively in Lovable
Option 2: I'll split into 2 builds — structure first, then refinement

Which do you prefer?
```

### User Not Logged Into Lovable
```
It looks like you might not be logged into Lovable.dev yet.

Steps:
1. Go to lovable.dev
2. Sign up / Log in (free tier available)
3. Come back and click the build link

Or I can resend the link when you're ready! 👍
```

### Lovable Generation Didn't Match
```
Sometimes Lovable needs a nudge! Try these in Lovable's chat:

"Fix the [specific issue]"
"The [component] should look like [description]"

Or tell me what went wrong and I'll regenerate with a more specific prompt. 🔧
```
