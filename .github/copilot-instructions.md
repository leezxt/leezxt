# Copilot 雲端代理程式說明

## 儲存庫概覽

這是一個屬於 **李任鈞** 的**個人作品集網站**，專注於 Java 開發與全端網頁設計。網站所有使用者介面文字均使用繁體中文（zh-Hant）。

## 儲存庫結構

```
leezxt/leezxt
├── index.html      # 單頁作品集網站（整個前端）
├── README.md       # GitHub 個人首頁 README（大部分為預設範本）
└── .github/
    └── copilot-instructions.md
```

## 技術堆疊

- **HTML5** — 單一 `index.html` 檔案，無建置系統或打包工具
- **Tailwind CSS** — 透過 CDN 載入（`https://cdn.tailwindcss.com`），無本地安裝
- **Font Awesome 6.4.0** — 透過 CDN 載入，用於圖示
- **Google Fonts** — Noto Sans TC（繁體中文），透過 CSS `@import` 載入
- **無套件管理器**（無 `package.json`、`pom.xml` 等）
- **無測試框架**
- **無 CI/CD 流程**

## 如何在此儲存庫進行開發

### 修改方式

- 所有 UI 變更直接在 `index.html` 中進行。
- 使用 **Tailwind 工具類別** 來撰寫樣式。除非涉及 Tailwind 無法處理的動畫或過場效果，否則不要撰寫原始 CSS（這類樣式放在 `<head>` 中的 `<style>` 區塊）。
- 所有面向使用者的文字請保持**繁體中文**。
- 色彩主題為**翠綠色**（`emerald-*` 類別）。新增區塊或元件時請維持此主題。

### 無需建置步驟

本專案無需建置、編譯或安裝步驟。修改 `index.html` 後可立即生效。若需預覽，直接在瀏覽器中開啟 `index.html` 即可。

### 無程式碼風格檢查或測試

本專案未設定任何 linter、格式化工具或測試套件。請透過視覺檢查 HTML 結構來驗證變更是否正確。

## 頁面區塊（依順序）

1. **導航欄** (`<nav>`) — 固定於頂部的導覽列，包含錨點連結
2. **首頁橫幅區** (`#home`) — 漸層背景、浮動個人頭像、姓名、標語、行動呼籲按鈕
3. **關於我區** (`#about`) — 簡短自我介紹段落
4. **技能區** (`#skills`) — 4 個卡片的格狀排版：Java、網頁開發、學習探索、團隊協作
5. **作品集區** (`#portfolio`) — 3 個卡片的格狀排版，含專案預覽圖
6. **聯絡區** (`#contact`) — 電子郵件、Instagram、GitHub 連結
7. **頁尾** — 版權聲明

## 重要慣例

- 卡片使用可重複利用的 `card-hover` CSS 類別（定義於 `<style>`），產生懸停上浮效果。
- 個人頭像使用 `profile-character` 類別，具圓形裁切與邊框效果。
- 首頁橫幅背景使用 `gradient-bg` 類別（翠綠漸層）。
- 裝飾性模糊光暈使用 `blob-decorator` 類別。
- 作品集圖片使用 `portfolio-img` 類別，產生懸停放大效果。
- 所有區塊使用 `max-w-5xl mx-auto` 或 `max-w-3xl mx-auto` 將內容置中並限制寬度。

## 常見任務

- **新增作品集卡片**：複製 `#portfolio` 中現有的卡片 `<div>`，更新圖片 URL、分類標籤、標題與描述。
- **新增技能卡片**：複製 `#skills` 中現有的卡片 `<div>`，更新圖示類別、色彩類別、標題與描述文字。
- **更新聯絡連結**：找到 `#contact` 中的 `<a>` 標籤，更新 `href` 屬性。
- **更換色彩主題**：將所有 `emerald` 工具類別替換為其他 Tailwind 色彩（例如 `blue`、`violet`），同時更新 `<style>` 中 `gradient-bg` 的 `linear-gradient`。

## 已知問題 / 注意事項

- 首頁橫幅區 `<img>` 標籤中的個人頭像 `src` 指向有時效限制的 Azure Blob Storage URL，該連結可能已過期，需要替換。
- Instagram 與 GitHub 的聯絡連結目前使用 `href="#"` 佔位符，需要填入真實的 URL。
- 電子郵件 `href` 使用 `mailto:your-email@example.com`，為佔位符，尚未填入真實信箱。
- 手機版導覽列的漢堡圖示（`fa-bars`）尚未綁定任何 JavaScript，手機版選單目前無法使用。
