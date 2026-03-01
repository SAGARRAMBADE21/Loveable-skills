---
name: lovable-app-creator
description: "Generates clickable Lovable.dev build URLs when users ask to build, create, or make any app, website, landing page, dashboard, or store. Runs a command to URL-encode the prompt and returns the build URL."
homepage: https://lovable.dev
user-invocable: true
disable-model-invocation: false
metadata: {"openclaw":{"emoji":"💜"}}
---

# Lovable App Creator

When a user asks to build any app, website, or page, follow these exact steps:

## Step 1: Compose a prompt

Write a short app description (200-500 characters). Include:
- App name and type
- Theme (dark/light) and colors
- Pages and key components
- "Use shadcn/ui, Tailwind CSS, Framer Motion. Mobile-first responsive."

## Step 2: Generate the URL using run_command

Run this bash command, replacing YOUR_PROMPT with your composed prompt:

```bash
python3 -c "import urllib.parse; print('https://lovable.dev/?autosubmit=true#prompt=' + urllib.parse.quote('''YOUR_PROMPT'''))"
```

Example:
```bash
python3 -c "import urllib.parse; print('https://lovable.dev/?autosubmit=true#prompt=' + urllib.parse.quote('''Build a dark minimal photographer portfolio called NoirFrame with hero, gallery grid with lightbox, about, and contact pages. Near-black background, gold accents, Playfair Display headings, Inter body. Use shadcn/ui, Tailwind CSS, Framer Motion. Mobile-first responsive.'''))"
```

This outputs a full URL like: `https://lovable.dev/?autosubmit=true#prompt=Build%20a%20dark%20minimal...`

## Step 3: Reply to the user

Use the URL from the command output in your reply:

```
🚀 Your app is ready to build!

📋 App: [Name] — [Description]
🎨 Style: [Theme details]

👉 Click to create your app:
[PASTE THE URL FROM COMMAND OUTPUT HERE]

🔗 Opens Lovable.dev and auto-builds your app. You need a Lovable account.
Want me to adjust anything? 🔧
```

## Rules

- You MUST run the python3 command to generate the URL — do NOT try to URL-encode manually
- NEVER tell the user to "copy/paste" a prompt into Lovable
- NEVER write code files (no HTML, CSS, JS)
- NEVER use browser tools
- ALWAYS include the generated URL in your reply
