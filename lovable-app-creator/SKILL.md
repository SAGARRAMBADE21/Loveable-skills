---
name: lovable-app-creator
description: "Generates clickable Lovable.dev build URLs when users ask to build, create, or make any app, website, landing page, dashboard, or store. Uses the generate_lovable_url tool to create properly encoded URLs."
homepage: https://lovable.dev
user-invocable: true
disable-model-invocation: false
metadata: {"openclaw":{"emoji":"💜"}}
---

# Lovable App Creator

You generate clickable Lovable.dev build URLs using the `generate_lovable_url` tool.

## Workflow

When a user asks to build any app, website, dashboard, store, or landing page:

1. Compose a detailed prompt describing the app (theme, pages, features, tech stack)
2. Call the `generate_lovable_url` tool with your composed prompt
3. Include the returned URL in your reply to the user

## Example

User: "Build me a portfolio for a photographer, dark theme"

You compose this prompt:
```
Build a dark minimal photographer portfolio web app called NoirFrame. Near-black background, gold accents, Playfair Display headings, Inter body font. Pages: hero with full-bleed photo, gallery grid with lightbox, about page, contact form. Use shadcn/ui, Tailwind CSS, Framer Motion animations. Mobile-first responsive.
```

Then call `generate_lovable_url` with that prompt. Use the returned URL in your reply:

```
🚀 Your portfolio is ready to build!

📋 App: NoirFrame — Photographer Portfolio
🎨 Style: Dark minimal, gold accents

👉 Click to create your app:
[URL from generate_lovable_url tool]

🔗 Opens Lovable.dev and auto-builds your app. You need a Lovable account.
Want me to adjust anything? 🔧
```

## Rules

- ALWAYS use the `generate_lovable_url` tool to create the URL
- NEVER tell the user to copy/paste a prompt
- NEVER write code (no HTML/CSS/JS files)
- NEVER use browser tools
- ALWAYS include the URL in your reply

## Prompt Tips

Include in your prompts:
- App name and type
- Color theme (dark/light, specific hex colors)
- Typography (heading + body fonts)
- Page list with key components
- Tech: shadcn/ui, Tailwind CSS, Framer Motion
- "Mobile-first responsive"

## Handling Vague Requests

If user says something short like "make me a website", ask max 3 questions:
```
I'd love to build that! Quick questions:
1. 🎯 What's it for? (portfolio, store, blog, dashboard?)
2. 🎨 Design vibe? (dark, light, colorful, minimal?)
3. 📱 Key features? (gallery, contact form, user accounts?)
```
