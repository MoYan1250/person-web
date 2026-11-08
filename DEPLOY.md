# 部署

這個站是 Next.js 靜態匯出（`output: "export"`），部署在 Cloudflare Pages。

目前的公開網址是 [https://moyan-5hx.pages.dev](https://moyan-5hx.pages.dev)。之後若綁自己的網域，在 Pages 專案加 Custom Domain，並把 `NEXT_PUBLIC_SITE_URL` 改成那個網址。

不要再用 OpenNext / Workers 部署同一份 repo。Worker 有 3 MiB 上限，這份站放不進去。

## 建置

| 項目 | 值 |
| --- | --- |
| Framework preset | Next.js (Static HTML Export)，或 None |
| Package manager | npm |
| Build command | `npm run build` |
| Build output directory | `out` |

`package.json` 裡的 `"private": true` 只表示不要發布到 npm，不影響 GitHub 或 Cloudflare。

## 環境變數

正式環境至少要有：

- `NEXT_PUBLIC_SITE_URL` = `https://moyan-5hx.pages.dev`（不要結尾斜線）

可選：

- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`

改完環境變數要重新部署，sitemap 與 canonical 才會用新網址。

Cloudflare Pages 建置時，若環境變數仍指向別的 `*.pages.dev`，程式會改用這次部署所屬專案的穩定網址。自有網域則以 `NEXT_PUBLIC_SITE_URL` 為準。

預覽部署（非 `main`）會標 `noindex`。

## 更新

改內容 → commit → `git push`。Cloudflare Pages 會從 `main` 自動重建。

## 搜尋引擎

1. Production 的 `NEXT_PUBLIC_SITE_URL` 設成正式網址，存檔後重新部署。
2. Cloudflare **Security** 不要開 Bot Fight、Super Bot Fight 或 Under Attack Mode，否則 Googlebot 會被擋。
3. 確認 `https://moyan-5hx.pages.dev/robots.txt` 的 Sitemap 指向同一個網域的 `sitemap.xml`。
4. 到 [Search Console](https://search.google.com/search-console) 用網址前置詞驗證，HTML 標記的值放進 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`，再部署一次。
5. 驗證通過後送交 `sitemap.xml`。

Bing 可選：[Bing Webmaster](https://www.bing.com/webmasters)，驗證碼放進 `NEXT_PUBLIC_BING_SITE_VERIFICATION`。
