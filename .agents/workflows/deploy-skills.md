---
description: How to deploy OpenClaw skills from local PC to cloud server (Coder workspace)
---

# Deploy Skills to Cloud OpenClaw

## Prerequisites

- Skills folder on your local PC (e.g., `C:\Users\SAGAR\Downloads\skills\`)
- GitHub repo for the skills (e.g., `https://github.com/SAGARRAMBADE21/Loveable-skills.git`)
- OpenClaw running on Coder workspace (forge)
- VS Code with Coder extension connected to forge

## Step 1: Prepare SKILL.md format

Every skill needs a `SKILL.md` with this frontmatter:

```yaml
---
name: your-skill-name
description: "One line description"
homepage: https://example.com
user-invocable: true
disable-model-invocation: false
metadata: {"openclaw":{"emoji":"🔧"}}
---
```

> ⚠️ Do NOT use `requires.config` in metadata — OpenClaw does not support custom config keys and will mark the skill as "missing".

## Step 2: Push to GitHub (from local PC)

```powershell
cd C:\Users\SAGAR\Downloads\skills
git add -A
git commit -m "Update skills"
git push origin main
```

## Step 3: Connect to forge workspace

1. Open VS Code
2. Open Coder extension (sidebar)
3. Find **forge** → **main**
4. Click the **▷ arrow** to open remote VS Code window
5. Open terminal: `Ctrl + ~`

## Step 4: Pull skills on server

### First time setup:
```bash
rm -rf ~/.openclaw/skills/*
cd ~/.openclaw/skills
git clone https://github.com/SAGARRAMBADE21/Loveable-skills.git .
```

### Subsequent updates:
```bash
cd ~/.openclaw/skills
git pull
```

## Step 5: Restart OpenClaw

```bash
openclaw gateway --force
```

## Step 6: Verify

```bash
openclaw skills list
```

All skills should show **✓ ready**.

## Quick Update Workflow (after first setup)

When you edit skills locally:

```powershell
# On Windows PC
cd C:\Users\SAGAR\Downloads\skills
git add -A
git commit -m "description of changes"
git push origin main
```

```bash
# On forge terminal
cd ~/.openclaw/skills
git pull
openclaw gateway --force
openclaw skills list
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Skills show "✗ missing" | Remove `requires.config` from metadata in SKILL.md |
| `openclaw config edit` error | Don't use it — edit config with `nano ~/.openclaw/openclaw.json` |
| `Unknown config keys` | Run `openclaw doctor --fix` to remove invalid keys |
| `not a git repository` | Delete skills folder and re-clone: `rm -rf ~/.openclaw/skills/* && cd ~/.openclaw/skills && git clone REPO_URL .` |
| Skills not showing at all | Check skills are in `~/.openclaw/skills/` not in a subfolder |
