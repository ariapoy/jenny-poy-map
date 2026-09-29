# Jenny & Poy 相識影片 · 地圖時間軸

用地圖與時間軸呈現我們相識以來的足跡：65 張照片依日期串成 56 站，兩人的琺瑯圖釘代替滑鼠在地圖上移動、留下軌跡，抵達每一站時彈出當時的照片。這個網頁用來螢幕錄影，再上字幕做成婚禮上播放的相識影片。

## 使用

直接用瀏覽器開啟 `index.html` 即可（底圖需要連網）。操作、快速鍵、錄影建議與改資料的方法見 [使用說明.md](使用說明.md)。

## 檔案結構

```
index.html      主程式（單一檔案：Leaflet + MarkerCluster + MapLibre GL 底圖）
photos.js       65 張照片的資料（日期、地點、座標、座標來源）
pin.png         去背的兩人圖釘
photos/         網頁用照片（長邊 1400px）
thumbs/         地圖縮圖（長邊 320px）
lib/            離線函式庫（Leaflet 1.9.4、Leaflet.markercluster 1.5.3、MapLibre GL 5.24、leaflet-maplibre-gl）
使用說明.md     操作說明
```

## 版本控制

在這個資料夾第一次建立 git 倉庫（Terminal，在 `網站/` 資料夾內）：

```bash
git init -b main
git add -A
git commit -m "建立相識影片地圖時間軸網站 v1.1" \
  -m "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

## 部署到 GitHub Pages（要公開時再做）

先在 GitHub 建立空的 `jenny-poy-map` 倉庫（不要勾 README），再：

```bash
git remote add origin https://github.com/ariapoy/jenny-poy-map.git
git push -u origin main
```

推上去後到 GitHub → Repository → Settings → Pages → Source 選 `main` branch、`/ (root)`，
網址會是 https://ariapoy.github.io/jenny-poy-map/ 。

注意：GitHub Pages 是公開網頁，`photos/` 裡的照片任何人拿到網址都能看、能下載。

## 底圖與授權

底圖使用 [OpenFreeMap](https://openfreemap.org)（Positron 樣式，免金鑰）；資料 © [OpenMapTiles](https://www.openmaptiles.org/) © [OpenStreetMap](https://www.openstreetmap.org/copyright) 貢獻者。
