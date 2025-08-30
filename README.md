# Selcouth | سيلكوت

Truth shall always prevail.

Research and curation by **Umm Ḥanẓalah**. This site organizes her work from the Selcouth Telegram channel.

## Deploying to GitHub Pages

### Option 1 — Custom domain (selcouth.io)
1. Make sure a `CNAME` file exists at the repo root with the single line:
   ```
   selcouth.io
   ```
2. GitHub → Repo → Settings → Pages:
   - Build and deployment: Source = "Deploy from a branch"
   - Branch = `main`, Folder = `/ (root)`.
3. DNS: In your domain host, add A records to these GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
   (Optional AAAA for IPv6: 2606:50c0:8000::153, ::8001::153, ::8002::153, ::8003::153)
4. Back in Settings → Pages, set Custom domain to `selcouth.io` and enable "Enforce HTTPS".
5. DNS can take minutes–24h. Use the temporary Pages URL in the meantime.

### Option 2 — GitHub Pages default URL
- With this repo name, your site will be available at:
  ```
  https://abu-mujahid.github.io/Selcouth/
  ```
- If you want the root `https://abu-mujahid.github.io/`, create a separate repo named exactly `Abu-Mujahid.github.io` and put the site there.

## Notes
- The Telegram channel is private; embeds are placeholders only.
- Topic pages automatically display “Curated by Umm Ḥanẓalah” next to the reading time.
- All content is educational and not medical advice.
