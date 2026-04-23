# Copilot Cloud Agent Instructions

## Repository Overview

This is a **personal portfolio website** for 李任鈞 (Li Ren-Jun), a developer focused on Java development and full-stack web design. The site is written entirely in Traditional Chinese (zh-Hant).

## Repository Structure

```
leezxt/leezxt
├── index.html      # Single-page portfolio website (the entire frontend)
├── README.md       # GitHub profile README (mostly default template)
└── .github/
    └── copilot-instructions.md
```

## Tech Stack

- **HTML5** — single `index.html` file, no build system or bundler
- **Tailwind CSS** — loaded via CDN (`https://cdn.tailwindcss.com`), no local installation
- **Font Awesome 6.4.0** — loaded via CDN for icons
- **Google Fonts** — Noto Sans TC (Traditional Chinese), loaded via `@import` in CSS
- **No package manager** (no `package.json`, `pom.xml`, etc.)
- **No test framework**
- **No CI/CD pipeline**

## How to Work on This Repo

### Making Changes

- All UI changes are made directly in `index.html`.
- Use **Tailwind utility classes** for styling. Do not write raw CSS unless it involves animations or transitions that Tailwind cannot handle (these go in the `<style>` block in `<head>`).
- Keep the language **Traditional Chinese** for all user-facing text.
- The color theme is **emerald/green** (`emerald-*` classes). Maintain this theme for new sections or components.

### No Build Step Required

There is no build, compile, or install step. Changes to `index.html` are immediately effective. To preview, simply open `index.html` in a browser.

### No Linting or Tests

There are no linters, formatters, or test suites configured. Validate changes by visual inspection of the HTML structure.

## Page Sections (in order)

1. **Navigation bar** (`<nav>`) — fixed top bar with anchor links
2. **Hero Section** (`#home`) — gradient background, floating profile image, name, tagline, CTA buttons
3. **About Section** (`#about`) — short bio paragraph
4. **Skills Section** (`#skills`) — 4-card grid: Java, Web Dev, Learning, Teamwork
5. **Portfolio Section** (`#portfolio`) — 3-card grid with project previews
6. **Contact Section** (`#contact`) — email, Instagram, GitHub links
7. **Footer** — copyright line

## Key Conventions

- Cards use the reusable `card-hover` CSS class (defined in `<style>`) for hover lift effect.
- Profile image uses the `profile-character` class with circular crop and border.
- The hero background uses the `gradient-bg` class (emerald gradient).
- Decorative blur blob uses the `blob-decorator` class.
- Portfolio images use `portfolio-img` for the zoom-on-hover effect.
- All sections use `max-w-5xl mx-auto` or `max-w-3xl mx-auto` for centered content width.

## Common Tasks

- **Add a new portfolio card**: Copy an existing card `<div>` in `#portfolio` and update image URL, category label, title, and description.
- **Add a new skill card**: Copy an existing card `<div>` in `#skills` and update the icon class, color classes, title, and description text.
- **Update contact links**: Find the `<a>` tags in `#contact` and update `href` attributes.
- **Change color theme**: Replace `emerald` utility classes with another Tailwind color (e.g., `blue`, `violet`). Also update the `gradient-bg` linear-gradient in `<style>`.

## Known Issues / Notes

- The profile image `src` in the `<img>` tag within the hero section points to a time-limited Azure Blob Storage URL. It may expire and need replacing.
- Contact links for Instagram and GitHub currently use `href="#"` placeholders and need real URLs.
- The email `href` uses `mailto:your-email@example.com` which is a placeholder.
- The mobile navigation hamburger icon (`fa-bars`) has no JavaScript attached to it — the mobile menu is not functional.
