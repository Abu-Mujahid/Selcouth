# Selcouth | سيلكوت

Truth shall always prevail.

A minimalist, modern static site for the Selcouth Telegram channel. English‑only UI with a bilingual title lockup, topic cards, dark mode, reading progress bar, simple search, and optional Telegram post embeds on each topic page.

## Structure

- `index.html` — Landing with intro and topic grid.
- `topics/*.html` — One page per topic with placeholders for featured posts and Telegram embeds.
- `scripts/main.js` — Theme toggle, progress bar, search, reading time, and Telegram embed injection.
- `styles.css` — Modern dark/light theme with accessible defaults.
- `assets/selcouth-wordmark.png` — Your uploaded logo (add this file).
- `assets/favicon.svg` — Favicon.
- `CNAME` — Custom domain (selcouth.io).
- `404.html` — GitHub Pages 404.

## Telegram

- Link works with your invite URL: https://t.me/+IQ-KS8czLp4wMGVl
- Embeds require a PUBLIC channel handle (e.g., `@Selcouth`). If you want embeds:
  1. Set `TELEGRAM_HANDLE` in `scripts/main.js` (without `@`).
  2. On any topic page, add post IDs to the container:
     ```html
     <div class="tg-embeds" data-post-ids="12,15,21"></div>
     ```
  3. Commits will auto-render widgets.

## Deployment (GitHub Pages + selcouth.io)

1. Create a new repo (e.g., `selcouth-site`) and push these files to the root of the `main` branch.
2. In GitHub: Settings → Pages → Build and deployment → Source: `Deploy from a branch`, Branch: `main`, Folder: `/ (root)`.
3. Keep the `CNAME` file in the repo with `selcouth.io`.
4. DNS:
   - Add A records on your domain to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - (Optional IPv6 AAAA):
     - 2606:50c0:8000::153
     - 2606:50c0:8001::153
     - 2606:50c0:8002::153
     - 2606:50c0:8003::153
5. Back in Settings → Pages, set the Custom domain to `selcouth.io` and enable HTTPS.

## Editing content

- Update the intro copy in `index.html`.
- Add featured posts on each topic page: insert titles, summaries, and a `Sources` list.
- For your logo, place the uploaded image at `assets/selcouth-wordmark.png` or change the `<img>` `src` path.

## Contributing

Open issues or send PRs for tweaks. When you’re ready with post titles/summaries and Telegram embed IDs, share them and we’ll wire everything up quickly.
