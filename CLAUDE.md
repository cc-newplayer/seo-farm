# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static AI news and tools aggregation website ("AI前沿"). No build step, no dependencies, no package manager — open `index.html` directly in a browser.

## Architecture

Single-page static site split into three files:

- **`index.html`** — Semantic HTML structure with 5 sections: hero, news (`#news`), tools (`#tools`), timeline (`#updates`), models table (`#models`). All data rendering is delegated to `script.js`.
- **`styles.css`** — CSS custom properties in `:root` define the design tokens (colors, radius, shadow). Dark theme only. Layout uses CSS Grid (`news-grid`, `tools-grid`) and Flexbox throughout. Responsive breakpoint at 768px.
- **`script.js`** — Contains all data arrays (`newsData`, `toolsData`, `timelineData`, `modelsData`) and render functions. No framework, no modules — plain ES6. Render functions are called once on init and re-called on filter tab clicks.

## Data Management

All content is hardcoded in `script.js` as arrays of plain objects. To add or update content, edit the relevant array:

- `newsData` — news cards (fields: `id`, `featured`, `tag`, `date`, `title`, `desc`, `source`, `time`)
- `toolsData` — tool cards (fields: `id`, `name`, `icon`, `category`, `color`, `desc`, `badge`, `stars`, `url`)
- `timelineData` — technology timeline entries
- `modelsData` — leaderboard rows

## Key Patterns

- **Filter tabs**: `setupTabs(containerId, renderFn)` wires a tab group to a render function. The render function receives the `data-filter` value of the clicked tab.
- **Tag/badge label mapping**: `tagLabel()`, `categoryLabel()`, `badgeLabel()` map data keys to display strings — update these when adding new category values.
- **Featured news**: A news card with `featured: true` gets `grid-column: span 2` only when the `all` filter is active.
- **Score bar widths**: Rendered as inline `style="width:X%"` calculated relative to `maxScore` — recomputed each render.
- **Render targets**: Each section has a static container div in `index.html` (e.g. `#news-list`, `#tools-list`); render functions in `script.js` set `innerHTML` on these containers directly.
- **UI language**: All display text is in Chinese (Simplified). Keep new labels/copy consistent with existing Chinese text.
