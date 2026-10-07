# Hafsaamu Research

A minimal, research-focused Next.js blog inspired by the editorial feel of Google Research.

## Start locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Publish a new article

Create a Markdown file inside `posts/`:

```md
---
title: "Your title"
date: "October 8, 2026"
category: "Research"
author: "Phinu"
excerpt: "Short description."
---

## Introduction

Your article...
```

Then restart/build if needed.

## Deploy

1. Create a GitHub repository.
2. Push this project.
3. Import the repository into Vercel.
4. Deploy.
5. Add your custom domain in Vercel → Project → Settings → Domains.

The blog is intentionally file-based for V1. No database or CMS is required.
