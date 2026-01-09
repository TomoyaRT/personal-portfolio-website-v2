# 互動式 3D 筆記型電腦導覽場景

> 結合 3D 模型互動與即時網站嵌入的創新作品集展示專案

這是一個整合了兩個專案核心功能的 3D 互動網站：
- **living-frame** 的 3D 模型網站嵌入技術
- **moving-viewpoint** 的多物件相機轉換與精確定位系統

## ✨ 專案特色

### 核心功能

1. **四台筆記型電腦 3D 展示**
   - 使用低多邊形筆記型電腦模型（OBJ 格式）
   - 四台筆記型電腦呈矩陣排列，提供全景視角
   - 每台筆記型電腦都有獨立的材質和光照效果

2. **平滑相機動畫**
   - 點擊任一筆記型電腦，相機會平滑過渡並聚焦到該設備
   - 使用 React Spring 實現流暢的緩動動畫
   - 點擊背景可返回全景視圖

3. **即時網站嵌入**
   - 每台筆記型電腦的螢幕都能顯示即時網站
   - 使用 R3F 的 Html 元件將 iframe 精確定位到 3D 空間
   - 目標網站：https://tomoya-fawn.vercel.app/

4. **互動與視覺效果**
   - 軌道控制器允許拖曳旋轉場景（全景模式）
   - 動態光照系統（環境光、方向光、點光源）
   - 真實陰影效果
   - 深色主題背景

## 🛠 技術棧

### 核心框架與函式庫

| 技術 | 版本 | 用途 |
|------|------|------|
| **React** | 19.2.3 | 前端 UI 框架 |
| **React Three Fiber** | 9.5.0 | React 的 Three.js 渲染器 |
| **Three.js** | 0.182.0 | 3D 圖形引擎 |
| **@react-three/drei** | 10.7.7 | R3F 實用工具集合 |
| **@react-spring/three** | 10.0.3 | 3D 動畫庫 |
| **Vite** | 7.3.1 | 快速建構工具 |
| **pnpm** | - | 套件管理器 |

### 技術亮點

- **模組化架構**：清晰的元件分離（Laptop、Experience、App）
- **OBJ 模型載入**：使用 Three.js OBJLoader 動態載入 3D 資產
- **宣告式 3D 開發**：利用 React Three Fiber 的組件化特性
- **物理動畫**：基於彈簧物理的流暢相機過渡
- **HTML in 3D**：創新的網頁內容 3D 空間嵌入

## 📁 專案結構

```
combine-project/
├── package.json              # 專案配置與依賴管理
├── pnpm-lock.yaml            # 依賴鎖定檔案
├── vite.config.js            # Vite 建構配置
├── index.html                # HTML 入口檔案
├── README.md                 # 專案說明文件（本檔案）
├── public/                   # 靜態資源目錄
│   └── models/              # 3D 模型資源
│       ├── laptop.obj       # 筆記型電腦 3D 模型
│       ├── laptop.mtl       # 材質定義檔案
│       └── textures/        # 紋理貼圖
│           ├── Lowpoly_Laptop_1.jpg
│           ├── Lowpoly_Laptop_2.jpg
│           ├── Lowpoly_Laptop_Nor_1.jpg
│           └── Lowpoly_Laptop_Nor_2.jpg
└── src/                      # 原始碼目錄
    ├── main.jsx              # React 應用程式入口點
    ├── App.jsx               # 主應用元件（Canvas 設置）
    ├── Experience.jsx        # 3D 場景主元件（燈光、相機控制）
    ├── Laptop.jsx            # 筆記型電腦元件（模型載入與渲染）
    └── styles.css            # 全域樣式表
```

## 🚀 環境設置與執行

### 系統需求

- **Node.js**: 18.0+ 或更高版本
- **pnpm**: 8.0+ 或更高版本
- **現代瀏覽器**：支援 WebGL 2.0（Chrome、Firefox、Safari、Edge）

### 安裝步驟

1. **安裝 pnpm**（如果尚未安裝）

```bash
npm install -g pnpm
```

2. **安裝專案依賴**

```bash
pnpm install
```

### 執行指令

#### 開發模式

```bash
pnpm dev
```

啟動開發伺服器，預設在 `http://localhost:5173/` 開啟。
- 支援熱模組替換（HMR）
- 自動開啟瀏覽器
- 支援區域網路訪問

#### 建構生產版本

```bash
pnpm build
```

在 `dist/` 目錄生成優化後的生產版本。

#### 預覽生產版本

```bash
pnpm preview
```

本地預覽建構後的生產版本。

## 🎮 使用說明

### 互動操作

1. **全景模式**（初始視圖）
   - 拖曳場景：旋轉視角觀察四台筆記型電腦
   - 滾輪縮放：拉近或拉遠視角

2. **聚焦模式**
   - 點擊任一筆記型電腦：相機平滑移動並聚焦該設備
   - 螢幕會顯示即時網站內容
   - 可與嵌入的網站互動

3. **返回全景**
   - 點擊背景地面：返回全景視圖
   - 所有筆記型電腦重新可見

## 🏗 實作細節

### 相機動畫邏輯

使用 `@react-spring/three` 實現平滑的相機位置過渡：

```javascript
// 全景視圖相機位置
const overviewPosition = [0, 3, 12]

// 聚焦視圖相機位置（根據點擊的筆記型電腦動態計算）
const focusPosition = [laptop.x, 1.5, laptop.z + 3]

// React Spring 動畫配置
config: {
  mass: 1,          // 質量
  tension: 170,     // 張力
  friction: 26      // 摩擦力
}
```

### 筆記型電腦配置

四台筆記型電腦的空間布局：

```javascript
const laptops = [
  { position: [-2.5, 0, -2.5], rotation: [0, π/4, 0] },   // 左前
  { position: [2.5, 0, -2.5], rotation: [0, -π/4, 0] },   // 右前
  { position: [-2.5, 0, 2.5], rotation: [0, 3π/4, 0] },   // 左後
  { position: [2.5, 0, 2.5], rotation: [0, -3π/4, 0] }    // 右後
]
```

### 模型載入流程

1. 使用 `useLoader` Hook 載入 OBJ 模型
2. 使用 `TextureLoader` 載入紋理貼圖
3. 遍歷模型節點設置 `MeshStandardMaterial`
4. 啟用陰影投射與接收
5. 調整模型縮放和旋轉

### 網站嵌入實作

```jsx
<Html
  transform                        // 啟用 3D 變換
  distanceFactor={1.2}            // 縮放因子
  position={[0, 0.45, -0.02]}     // 相對筆記型電腦的位置
  rotation-x={-0.1}               // 匹配螢幕傾斜角
  rotation-y={Math.PI}            // 180° 翻轉
>
  <iframe src="https://tomoya-fawn.vercel.app/" />
</Html>
```

## 🎨 自訂與擴展

### 更換嵌入網站

修改 `src/Laptop.jsx` 中的 URL：

```jsx
<iframe src="你的網站URL" className="laptop-screen" />
```

### 調整筆記型電腦數量

在 `src/Experience.jsx` 的 `laptops` 陣列中新增或刪除配置：

```javascript
{
  id: 'laptop5',
  position: [x, y, z],
  rotation: [rx, ry, rz],
  focusCamera: [cx, cy, cz]
}
```

### 更換 3D 模型

1. 將新模型檔案放入 `public/models/`
2. 更新 `src/Laptop.jsx` 中的載入路徑
3. 根據新模型調整縮放和位置參數

### 修改配色方案

在 `src/Experience.jsx` 修改光照顏色：

```jsx
<pointLight color="#你的顏色" />
<color attach="background" args={['#你的背景色']} />
```

## 🐛 已知問題與限制

1. **iframe 效能**：多個 iframe 同時載入可能影響效能，目前僅在聚焦時顯示
2. **模型材質**：MTL 檔案中的紋理路徑為絕對路徑，已改用程式碼動態載入
3. **行動裝置**：觸控操作支援有限，建議使用桌面瀏覽器

## 📝 開發規範

- **嚴格隔離**：不修改原始專案檔案（living-frame、moving-viewpoint）
- **純淨依賴**：僅安裝必要套件，避免冗餘
- **扁平結構**：src 目錄最多兩層巢狀
- **套件管理**：統一使用 pnpm

## 📄 授權

MIT License

## 👤 作者

**Tomoya**

---

## 🙏 致謝

本專案整合自以下兩個源專案：

- **living-frame**: 3D 模型網站嵌入技術
- **moving-viewpoint**: 相機轉換與物件聚焦系統

---

**建構時間**: 2026年1月
**技術支援**: React Three Fiber 社群
**3D 資源**: Lowpoly Notebook Model
