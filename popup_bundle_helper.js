/**
 * 台中大遠百滿額回饋試算小工具
 *
 * 功能：
 * - 提供商品數量調整與預設組合
 * - 依照購物金額計算回饋金額與回饋率
 * - 由 HTML 靜態結構與 JavaScript 邏輯分離，便於維護
 *
 * @author Copilot
 * @version 1.0.0
 */
(function () {
  const REBATE_STEP = 2000,
    REBATE_AMOUNT = 200;
  const BONUS_STEP = 10000,
    BONUS_AMOUNT = 200;

  const ITEMS = [
    { key: "p8", label: "全效8點", price: 16700 },
    { key: "p4", label: "基本4點", price: 9200 },
    { key: "half4", label: "基本4點30日美肌實感組", price: 5000 },
  ];

  const PRESETS = [
    { label: "基本4點×1", qty: { p4: 1 } },
    { label: "基本4點＋基本4點30日美肌實感組", qty: { p4: 1, half4: 1 } },
    { label: "基本4點×2", qty: { p4: 2 } },
    { label: "基本4點＋全效8點", qty: { p4: 1, p8: 1 } },
    { label: "基本4點×2＋基本4點30日美肌實感組", qty: { p4: 2, half4: 1 } },
  ];

  let qty = Object.fromEntries(ITEMS.map((i) => [i.key, 0]));

  const app = document.getElementById("app");
  const itemsEl = document.getElementById("items");
  const presetsEl = document.getElementById("presets");
  const totalAmountEl = document.getElementById("totalAmount");
  const rebateAmountEl = document.getElementById("rebateAmount");
  const rebateRateEl = document.getElementById("rebateRate");

  function total() {
    return ITEMS.reduce((sum, item) => sum + qty[item.key] * item.price, 0);
  }

  function rebate(amount) {
    return (
      Math.floor(amount / REBATE_STEP) * REBATE_AMOUNT +
      Math.floor(amount / BONUS_STEP) * BONUS_AMOUNT
    );
  }

  function fmt(n) {
    return "NT$" + Math.round(n).toLocaleString();
  }

  function setQty(key, value) {
    qty[key] = Math.max(0, value);
    render();
  }

  function applyPreset(preset) {
    qty = Object.fromEntries(ITEMS.map((item) => [item.key, 0]));
    Object.entries(preset.qty).forEach(([key, value]) => {
      qty[key] = value;
    });
    render();
  }

  function clearAll() {
    qty = Object.fromEntries(ITEMS.map((item) => [item.key, 0]));
    render();
  }

  function renderItems() {
    itemsEl.innerHTML = ITEMS.map(
      (item) => `
      <div class="item">
        <div class="name">${item.label}</div>
        <div class="price">${fmt(item.price)} / 件</div>
        <div class="stepper">
          <button type="button" data-action="qty" data-key="${item.key}" data-value="${qty[item.key] - 1}">－</button>
          <input type="text" readonly value="${qty[item.key]}" />
          <button type="button" data-action="qty" data-key="${item.key}" data-value="${qty[item.key] + 1}">＋</button>
        </div>
      </div>
    `,
    ).join("");
  }

  function renderPresets() {
    presetsEl.innerHTML = [
      ...PRESETS.map(
        (preset, idx) =>
          `<button type="button" class="preset-btn" data-action="preset" data-index="${idx}">${preset.label}</button>`,
      ),
      '<button type="button" class="clear-btn" data-action="clear">清空</button>',
    ].join("");
  }

  function bindEvents() {
    app.addEventListener("click", (event) => {
      const target = event.target;
      const action = target.dataset.action;

      if (!action) return;

      if (action === "qty") {
        const key = target.dataset.key;
        const rawValue = Number(target.dataset.value);
        setQty(key, rawValue);
        return;
      }

      if (action === "preset") {
        const idx = Number(target.dataset.index);
        applyPreset(PRESETS[idx]);
        return;
      }

      if (action === "clear") {
        clearAll();
      }
    });
  }

  function render() {
    const amount = total();
    const rb = rebate(amount);
    const rate = amount > 0 ? ((rb / amount) * 100).toFixed(1) + "%" : "—";

    totalAmountEl.textContent = fmt(amount);
    rebateAmountEl.textContent = fmt(rb);
    rebateRateEl.textContent = rate;

    renderItems();
    renderPresets();
  }

  bindEvents();
  render();
})();
