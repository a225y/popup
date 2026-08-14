# popup_bundle_helper.js 文件說明

## 1. 概述

本檔案負責處理「台中大遠百滿額回饋試算」的前端邏輯，包含：

- 商品項目定義
- 數量調整與預設組合
- 回饋金額與回饋率計算
- DOM 更新與事件綁定

## 2. 主要常數

### REBATE_STEP

每滿 2,000 元可獲得的回饋門檻。

### REBATE_AMOUNT

每滿 2,000 元對應回饋金額為 200 元。

### BONUS_STEP

額外加碼門檻為 10,000 元。

### BONUS_AMOUNT

額外加碼回饋金額為 200 元。

## 3. 商品資料

`ITEMS` 陣列定義以下商品：

- `p8`：全效8點，價格 16,700
- `p4`：基本4點，價格 9,200
- `half4`：基本4點30日美肌實感組，價格 5,000

## 4. 預設組合

`PRESETS` 陣列提供常用購買組合，例如：

- 基本4點×1
- 基本4點＋基本4點30日美肌實感組
- 基本4點×2
- 基本4點＋全效8點
- 基本4點×2＋基本4點30日美肌實感組

## 5. 核心函數

### total()

計算目前商品總金額。

### rebate(amount)

計算回饋金額，公式為：

`floor(amount / 2000) × 200 + floor(amount / 10000) × 200`

### fmt(n)

將數字格式化為 NT$ 金額字串。

### setQty(key, value)

更新指定商品數量，並重新渲染畫面。

### applyPreset(preset)

套用指定預設組合。

### clearAll()

將所有商品數量清空。

### render()

更新總金額、回饋金額與回饋率，並重新繪製商品列表與預設按鈕。

## 6. DOM 結構

HTML 文件中已經預先定義以下容器：

- `#items`：商品選擇區
- `#presets`：預設組合按鈕區
- `#totalAmount`：總金額
- `#rebateAmount`：回饋金額
- `#rebateRate`：回饋率

## 7. 使用方式

在頁面載入後，腳本會自動執行並綁定事件，使用者可直接操作：

- 點擊 + / - 調整數量
- 點擊預設組合快速帶入
- 點擊清空恢復為零

## 8. 維護建議

- 若新增商品，請同步更新 `ITEMS`
- 若調整促銷規則，請同步修改 `REBATE_STEP`、`REBATE_AMOUNT`、`BONUS_STEP`、`BONUS_AMOUNT`
- 若要調整 UI，請修改 [popup_bundle_helper.css](popup_bundle_helper.css)；若要調整內容結構，請修改 [popup_bundle_helper.html](popup_bundle_helper.html)
