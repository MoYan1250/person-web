# 收藏頁備份

這份備份是從網站拿掉「收藏」時留下的，方便之後加回來。

## 內容

- `src/app/likes/page.tsx`：收藏頁
- `src/components/game-card.tsx`：遊戲卡片
- `src/data/liked-game-covers.ts`：封面路徑
- `public/likes/games/`：遊戲封面圖
- `messages/zh-likes.json`、`messages/en-likes.json`：中英文收藏資料

## 加回來

1. 把 `src/app/likes` 放回 `src/app/[locale]/likes`。
2. 把 `game-card.tsx` 放回 `src/components/likes/game-card.tsx`。
3. 把 `liked-game-covers.ts` 放回 `src/data/liked-game-covers.ts`。
4. 把 `public/likes` 放回網站的 `public/likes`。
5. 把兩份 `*-likes.json` 的內容，以 `"likes"` 這個欄位加回 `src/i18n/messages/zh/collections.json` 與 `en/collections.json`（放在 `friends` 後面即可）。
6. 導覽、首頁卡片、sitemap、`public/_redirects` 的 `/likes`，以及 `src/lib/search-index.ts` 裡的收藏索引，一併加回。

當時導覽項目是：

```json
{
  "href": "/likes",
  "icon": "heart",
  "label": "收藏"
}
```

英文介面的 `label` 是 `Likes`。
