# 個人網站

這是一份自介與資料索引站，套用 [nextjs-portfolio-blog-research](https://github.com/zhengzangw/nextjs-portfolio-blog-research)（MIT）後改成：

- 首頁當索引
- About / Projects / Timeline / Diary 分頁
- Discord、Instagram、GitHub
- 繁中／英文切換（`/zh` 為繁中，`/en` 為英文；開 `/` 會轉到 `/zh`）
- 日夜模式切換

## 開始

```bash
npm install
npm run dev
```

開 [http://localhost:3000](http://localhost:3000)（開發時請走 `/zh` 或 `/en`）。

**填自己的資料請看 [CONTENT.md](./CONTENT.md)。**

## 頁面

| 路徑 | 內容 |
| --- | --- |
| `/zh`、`/en` | 首頁索引 |
| `/zh/about`、`/en/about` | 關於自己 |
| `/zh/projects`、`/en/projects` | 作品索引 |
| `/zh/timeline`、`/en/timeline` | 時間軸 |
| `/zh/diary`、`/en/diary` | 文章（日記 / 學習筆記 / 心得） |
| `/zh/likes`、`/en/likes` | 收藏（遊戲、音樂） |
| `/zh/academic`、`/en/academic` | 學術（研究、paper） |

舊的 `/`、`/about`、`/blog` 會導向對應的 `/zh/...` 路徑。

## 上線（Cloudflare Pages）

這個站是 Next.js 靜態匯出（`output: "export"`），部署到 Cloudflare Pages。免費網址會是 `https://<專案名>.pages.dev`。之後要綁自己的網域，在 Pages 專案加 Custom Domain 即可。

**不要**再用 OpenNext / Workers 部署同一份 repo，否則還是會碰到 Worker 3 MiB 上限。

### 第一次接到 Cloudflare Pages

程式已經 push 到 GitHub 之後：

1. 開 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Import a repository**
2. 授權 GitHub，選這個 repo
3. 建置設定：
   - Framework preset：Next.js（Static HTML Export）或 None
   - Package manager：`npm`（用 `package-lock.json`）
   - Build command：`npx next build`（或 `npm run build`）
   - Build output directory：`out`
4. 環境變數可先空著，先部署一次
5. Save and Deploy，等建置成功，複製公開網址（`*.pages.dev`）
6. 回到專案 **Settings → Environment variables**，加上：
   - `NEXT_PUBLIC_SITE_URL` = `https://moyan-5hx.pages.dev`（不要結尾斜線；之後若綁自己的網域，改成那個網域）
   - 可選：`NEXT_PUBLIC_GTM_ID`、`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
7. 再觸發一次部署（Retry deployment 或空 commit push），sitemap 與 canonical 才會用對的網址
8. 若先前有 Workers 專案連著同一個 repo，關掉或刪掉它的自動部署，避免兩套搶

### 讓 Google 收錄（還沒買網域也可以）

程式會在 Cloudflare Pages 建置時用這個專案的 `*.pages.dev` 當正式網址，不要填成別的站（例如另一個 `moyan.pages.dev` 起始頁）。

1. Cloudflare Pages → **Settings → Environment variables**，Production 的 `NEXT_PUBLIC_SITE_URL` 設成 `https://moyan-5hx.pages.dev`，存檔後 **Retry deployment**
2. **Security** 不要開 Bot Fight / Super Bot Fight，也不要開 Under Attack Mode，否則 Googlebot 會被擋
3. 部署完成後打開確認：
   - https://moyan-5hx.pages.dev/robots.txt 裡的 Sitemap 是 `https://moyan-5hx.pages.dev/sitemap.xml`
   - https://moyan-5hx.pages.dev/sitemap.xml 裡的連結可以點
4. 用 Google 帳號開 [Search Console](https://search.google.com/search-console)，選 **網址前置詞**，填 `https://moyan-5hx.pages.dev`
5. 選 **HTML 標記**，複製 `content="...."` 裡的字串
6. 把該字串設成環境變數 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`，再部署一次
7. 回到 Search Console 按驗證，通過後在 **Sitemaps** 送 `https://moyan-5hx.pages.dev/sitemap.xml`
8. 用「網址檢查」抽查 `/zh`，再「要求編入索引」

Bing 可選： [Bing Webmaster](https://www.bing.com/webmasters) 驗證後把代碼設成 `NEXT_PUBLIC_BING_SITE_VERIFICATION`。

預覽部署（非 `main`）會標 `noindex`，避免 Google 收錄預覽網址。

### 之後怎麼更新

改內容 → commit → `git push`。Cloudflare Pages 會自動重建並上線。

| 想改什麼 | 改哪個檔 |
| --- | --- |
| 名字、自介、頭像路徑 | `src/i18n/messages/*/personal.json`、`src/data/site.ts` |
| 作品、時間軸、友站 | `src/i18n/messages/*/collections.json` |
| 新日記 / writeup | `content/blog/zh/` 或 `content/blog/en/`（模板見 [CONTENT.md](./CONTENT.md)） |
| 網站網址、追蹤碼 | Cloudflare Pages 環境變數，存檔後重建 |

細節仍以 [CONTENT.md](./CONTENT.md) 為準。

## 技術

Next.js 16（靜態匯出）、Tailwind CSS 4、next-intl、shadcn/ui、Cloudflare Pages。模板原作者見 LICENSE。
