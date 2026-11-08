# 要改哪裡

改站上的文字與清單時，照下面的檔案改，不必動版型。

中文在 `zh.json`，英文在 `en.json`。兩個都要改，語系切換才會一致。

## 名字、頭像、網站網址

| 項目 | 檔案 |
| --- | --- |
| 英文名、navbar 後備資料 | [`src/data.tsx`](src/data.tsx) |
| 網站 URL、最後更新日期、頭像路徑 | [`src/data/site.ts`](src/data/site.ts) |
| 頭像 | [`public/moyan-mark.png`](public/moyan-mark.png)。若要換圖，覆蓋這個檔，或改 `src/data/site.ts` 的 `avatarUrl` |
| 顯示名字、一句話、自介 Markdown、個人卡 | [`src/i18n/messages/zh/personal.json`](src/i18n/messages/zh/personal.json) 與 [`src/i18n/messages/en/personal.json`](src/i18n/messages/en/personal.json) 的 `name`、`subtitle`、`headline`、`bioMarkdown`、`location`、`handle`、`focus`、`since`、`hero` |

`bioMarkdown` 支援 Markdown 連結，例如 `[GitHub](https://github.com/your-github)`。

## Discord / Instagram / GitHub / Email

兩邊都要改，而且 `src/data.tsx` 的 `contact.social` 也建議一併改。

改這些物件：

- [`src/i18n/messages/zh/collections.json`](src/i18n/messages/zh/collections.json) → `social`
- [`src/i18n/messages/en/collections.json`](src/i18n/messages/en/collections.json) → `social`

| 平台 | 要改的欄位 |
| --- | --- |
| GitHub | `social.GitHub.url` |
| Instagram | `social.instagram.url` |
| Discord | `social.discord.url`（例如 `https://discord.gg/your-invite`）。點卡片會直接開啟邀請連結。 |
| Email | `social.email.url`（例如 `mailto:you@example.com`）。會出現在 About 的聯絡區。 |

把 `content: true` 的項目會出現在首頁個人卡。About 的聯絡區另外會顯示 Email。

## 關於自己、關鍵詞

| 項目 | 檔案裡的 key |
| --- | --- |
| 長自介 | `personal.json` → `bioMarkdown` |
| 關鍵詞 | `collections.json` → `skills`（字串陣列） |

## 友站

改 `collections.json` → `friends.items`。中英兩邊都要改。

```json
{
  "name": "朋友的名字",
  "url": "https://example.com",
  "description": "一句話介紹這個站。",
  "avatar": ""
}
```

頭像可留空，會顯示名字縮寫。若要放圖，檔案丟進 `public/`，`avatar` 寫成 `"/friends/name.png"`，或直接用對方網站的頭像網址。

## 作品

改 `collections.json` → `projects.items`。

每個作品大致長這樣：

```json
{
  "title": "專案名稱",
  "href": "https://github.com/you/repo",
  "dates": "2026",
  "active": true,
  "description": "一句話說明。",
  "technologies": ["Next.js", "TypeScript"],
  "authors": "",
  "links": [
    { "type": "GitHub", "href": "https://github.com/you/repo", "icon": "github" }
  ],
  "image": "",
  "video": ""
}
```

封面圖可放到 `public/`，再把 `image` 設成 `"/your-project.png"`。

## 時間軸

改 `collections.json` → `timeline.items`。

```json
{
  "date": "2024-09",
  "title": "標題",
  "description": "發生了什麼。",
  "type": "work",
  "types": ["work", "life"],
  "tags": ["Next.js", "Volunteer"],
  "links": [{ "label": "官方網站", "href": "https://example.com" }]
}
```

`type` 是主要分類，只能是 `work`、`edu` 或 `life`。需要同時算進兩個篩選的話，再加 `types`。`tags` 與 `links` 可省略。首頁只顯示前幾筆，完整 logbook 在 `/timeline`。請把最新的放最前面。

## 文章

檔案放在：

- 繁中：[`content/blog/zh/`](content/blog/zh/)
- 英文：[`content/blog/en/`](content/blog/en/)

新增一篇就複製對應模板，改檔名與開頭。`category` 決定列表上的標籤：

- `diary`：日記 → 模板 [`content/blog/_templates/zh/diary.mdx`](content/blog/_templates/zh/diary.mdx) / [`en/diary.mdx`](content/blog/_templates/en/diary.mdx)
- `notes`：學習筆記 → 模板 [`content/blog/_templates/zh/notes.mdx`](content/blog/_templates/zh/notes.mdx) / [`en/notes.mdx`](content/blog/_templates/en/notes.mdx)
- `review`：心得
- `writeup`：Writeup

```md
---
title: "下雨的星期二"
date: "2026-09-01"
summary: "列表上會看到的一句預覽。"
category: diary
---

正文用 Markdown 寫。
```

同一個檔名（不含副檔名）最好中英都有，語系切換才對得上。列表在 `/diary`，可用標籤篩選。

## 學術

研究清單在 `collections.json` → `academic.research`。讀過的 paper 在 `academic.papers`。中英兩邊都要改。

收藏頁已從站上移除。若要加回來，步驟在 [backup/likes/README.md](backup/likes/README.md)。

## 介面文案（導覽、按鈕）

[`src/i18n/messages/zh/common.json`](src/i18n/messages/zh/common.json) 與 [`src/i18n/messages/en/common.json`](src/i18n/messages/en/common.json)

通常不用動。若要改導覽名稱，看 `navbar.items`。

## 語系與網址

[`src/i18n/routing.ts`](src/i18n/routing.ts)

- 預設語系是 `zh`（繁中）
- `/zh` 是中文，`/en` 是英文；開 `/` 會轉到 `/zh`

網站網址由環境變數 `NEXT_PUBLIC_SITE_URL` 決定，說明見 [DEPLOY.md](./DEPLOY.md)。本機沒設時預設是 `http://localhost:3000`。
