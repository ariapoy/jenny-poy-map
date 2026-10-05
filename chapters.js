// 相識影片：章節（播放順序＝這裡的順序）。每一章：
//   date    = 畫面上方顯示的日期文字（純文字，想怎麼寫就怎麼寫；時間軸位置會抓其中第一個 YYYY.MM.DD，抓不到就用該章第一張照片的日期）
//   caption = 下方字幕（圖釘走完、照片彈出後才顯示）
//   title   = 地點短名（畫面不顯示，只當備註）
//   photos  = 照片 id，順序＝圖釘走的順序（見 photos.js；每張照片卡右下角的日期與地名也在 photos.js）
// 可選：hold 讓這章停久一點（倍數）、minSec 這章每頁照片至少停留幾秒（例如 2）、keepView true/false 強制不縮放／強制飛（不寫就自動判斷）、zoom 覆寫縮放、at:[lat,lon] 沒照片時的落點。
window.CHAPTERS = [
  {
    date: '2023.06.23', caption: '第一次相遇與互相認識', title: '民生社區・臺大公衛',
    photos: ['001', '002']
  },
  {
    date: '2024.10.20', caption: '第一次約會登象山', title: '象山', minSec: 2,
    photos: ['003']
  },
  {
    date: '2024.11.09', caption: '政大貓空，我們的交往紀念日', title: '象山', minSec: 2,
    photos: ['077']
  },
  {
    date: '2024.11.23', caption: '接著走草嶺古道', title: '草嶺古道',
    photos: ['004']
  },
  {
    date: '2024 ~ 2025', caption: '在台北各地區走透透', title: '臺北',
    photos: ['005', '006', '007', '008', '013', '014', '018', '019']
  },
  {
    date: '2025.01.19', caption: '一起過生日、逛展覽', title: '臺北', keepView: true,
    photos: ['009', '010', '011', '020']
  },
  {
    date: '2025.03.29', caption: '看電影、校園馬拉松', title: '臺北', keepView: true,
    photos: ['023', '028', '029', '017']
  },
  {
    date: '2025.02.08', caption: '參加桃園燈節', title: '桃園燈節',
    photos: ['012']
  },
  {
    date: '2025.03.23', caption: '回宜蘭 Poy 老家、登龜山島', title: '宜蘭・龜山島',
    photos: ['015', '016']
  },
  {
    date: '2025.04.26', caption: '參訪鶯歌、新北美術館', title: '鶯歌',
    photos: ['021', '022']
  },
  {
    date: '2025.05.10', caption: '回嘉義 Jenny 老家', title: '嘉義',
    photos: ['024', '043', '044']
  },
  {
    date: '2025.05.11', caption: '參訪臺南安平', title: '臺南',
    photos: ['025', '026', '027']
  },
  {
    date: '2025.06.08', caption: '去冬山河路跑', title: '冬山河',
    photos: ['030', '031']
  },
  {
    date: '2025.06.13', caption: '第一次一起出國去澳洲雪梨', title: '雪梨・藍山',
    photos: ['032', '033', '034']
  },
  {
    date: '2025.06.16', caption: '前往布里斯本拜訪學妹', title: '布里斯本',
    photos: ['035', '036', '037', '074']
  },
  {
    date: '2025.06.19', caption: '飛回臺灣順便經過香港', title: '香港',
    photos: ['038']
  },
  {
    date: '2025.06.28', caption: '訂婚了！兩家人相見歡', title: '訂婚', hold: 1.3, minSec: 2,
    photos: ['039', '040']
  },
  {
    date: '2025.07.06', caption: '和重要的媒人～佳霖見面', title: '古亭', minSec: 2,
    photos: ['041']
  },
  {
    date: '2025.08.20', caption: '挑婚戒、拍婚紗照', title: '婚戒・婚紗',
    photos: ['042', '045', '046']
  },
  {
    date: '2025.10.03', caption: '我們登記結婚了！', title: '登記結婚', hold: 1.3, minSec: 2,
    photos: ['047', '048']
  },
  {
    date: '2026 前半年', caption: 'Poy 前往德州農工大學交換', title: '德州農工大學',
    photos: ['066', '067', '068']
  },
  {
    date: '2026.05.28', caption: '前往猶他州，蜜月開始了！', title: '猶他州',
    photos: ['049', '075']
  },
  {
    date: '2026.05.30', caption: '我們在黃石公園旅遊', title: '黃石・大提頓',
    photos: ['050', '079', '051', '052']
  },
  {
    date: '2026.05.30', caption: '在大提頓有 Jenny Lake', title: '黃石・大提頓',
    photos: ['054', '055']
  },
  {
    date: '2026.06.04', caption: '丹佛、紅石劇場、洛磯山脈', title: '丹佛',
    photos: ['056', '057', '073']
  },
  {
    date: '2026.06.08', caption: '前往達拉斯、奧斯汀、聖安東尼奧', title: '德州',
    photos: ['058', '070', '069']
  },
  {
    date: '2026.06.08', caption: '德州農工大學、休士頓', title: '德州',
    photos: ['059', '061', '060']
  },
  {
    date: '2026.08.15', caption: 'Poy 回國與朋友聚餐', title: '回到臺灣',
    photos: ['062', '063', '064', '065']
  },
  {
    date: '2026.08.15', caption: '與家人聚餐', title: '回到臺灣', minSec: 2,
    photos: ['071', '076']
  },
];

// 開場：兩人各自從老家出發到臺北會合（第一章第一張照片的位置）
window.INTRO = {
  jenny: { name: 'Jenny', from: [23.4801, 120.4491], label: '嘉義' },
  poy: { name: 'Poy', from: [24.7570, 121.7530], label: '宜蘭' },
};

// 結尾：先拉遠看全部足跡（date 是這時上方的文字、caption 是字幕），再從世界慢慢拉回 finale.photo 的地點（婚禮場地），
// 圖釘走到那裡、照片彈出，上方換成 finale.date、下方換成 finale.caption；zoom 是最後停在飯店時的縮放（越大越近，15–17）
window.ENDING = {
  date: '2023-2026',                    // 拉遠看足跡時上方顯示的文字（不寫就自動用年份範圍）
  caption: '這是我們一路走來的足跡',
  finale: { photo: '078', date: '2026.10.03', caption: '今天，我們回到這裡，謝謝你們一起見證', zoom: 15.5 },
};

// 配樂：相對於 index.html 的路徑（放在網站資料夾外面，不會進 git）；volume 0–1；fadeOutSec 結尾淡出秒數
window.BGM = { src: '../配樂/陪著你走 盧冠廷 純音樂 鋼琴版 【附鋼琴譜】 ｜ Piano Cover #68 [aTcamrq0UCM].mp3', volume: 0.9, fadeOutSec: 4 };
