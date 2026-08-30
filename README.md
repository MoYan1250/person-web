# 個人網站

這是一份自介與資料索引站，套用 [nextjs-portfolio-blog-research](https://github.com/zhengzangw/nextjs-portfolio-blog-research)（MIT）後改成：

- 首頁當索引
- About / Projects / Timeline / Diary 分頁
- Discord、Instagram、GitHub
- 繁中／英文切換（`/` 為繁中，`/en` 為英文）
- 日夜模式切換

## 開始

```bash
npm install
npm run dev
```

開 [http://localhost:3000](http://localhost:3000)。

**填自己的資料請看 [CONTENT.md](./CONTENT.md)。**

## 頁面

| 路徑 | 內容 |
| --- | --- |
| `/` | 首頁索引 |
| `/about` | 關於自己 |
| `/projects` | 作品索引 |
| `/timeline` | 時間軸 |
| `/diary` | 文章（日記 / 學習筆記 / 心得） |
| `/likes` | 收藏（遊戲、音樂） |
| `/academic` | 學術（研究、paper） |

舊的 `/blog` 會導向 `/diary`。

## 上線（Cloudflare Workers）

這個站用 [OpenNext](https://opennext.js.org/cloudflare) 跑在 Cloudflare Workers。免費網址會是 `https://person-web.<你的子網域>.workers.dev`。之後要綁自己的網域，在 Cloudflare 後台加 Custom Domain 即可。

### 第一次接到 Cloudflare

程式已經 push 到 GitHub 之後：

1. 開 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Import a repository**
2. 授權 GitHub，選這個 repo
3. 建置設定：
   - 框架：OpenNext / Next.js（有預設就用預設）
   - Package manager：`npm`（用 `package-lock.json`）
   - Build command：`npx opennextjs-cloudflare build`
   - Deploy command：交給 Wrangler（讀專案裡的 `wrangler.jsonc`）
4. 環境變數可先空著，先部署一次
5. Save and Deploy，等建置成功，複製公開網址
6. 回到專案 **Settings → Variables and Secrets**，加上：
   - `NEXT_PUBLIC_SITE_URL` = 剛才的 `https://....workers.dev`（不要結尾斜線）
   - 可選：`NEXT_PUBLIC_GTM_ID`
   - 可選：`GA4_PROPERTY_ID`、`GA4_CLIENT_EMAIL`、`GA4_PRIVATE_KEY`（不設也不影響網站本體；日記瀏覽次數會顯示 0）
7. 再觸發一次部署（Redeploy 或空 commit push），sitemap 與 OG 才會用對的網址

本機若已登入 Wrangler，也可以直接：

```bash
npm run deploy
```

Git 連線設好之後，不必每次手動跑這個。

### 之後怎麼更新

改內容 → commit → `git push`。Cloudflare 會自動重建並上線。

| 想改什麼 | 改哪個檔 |
| --- | --- |
| 名字、自介、頭像路徑 | `src/i18n/messages/*/personal.json`、`src/data/site.ts` |
| 作品、時間軸、友站 | `src/i18n/messages/*/collections.json` |
| 新日記 / writeup | `content/blog/zh/` 或 `content/blog/en/`（模板見 [CONTENT.md](./CONTENT.md)） |
| 網站網址、追蹤碼 | Cloudflare 後台環境變數，存檔後重建 |

細節仍以 [CONTENT.md](./CONTENT.md) 為準。

## 技術

Next.js 16、Tailwind CSS 4、next-intl、shadcn/ui、OpenNext（Cloudflare Workers）。模板原作者見 LICENSE。
