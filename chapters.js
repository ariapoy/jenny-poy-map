// 相識影片：章節（播放順序＝這裡的順序）。
// 每章：title = 左上角/字卡的地點短名；caption = 字幕；photos = 照片 id（見 photos.js）。
// 可選：dateLabel 覆寫日期顯示、zoom 覆寫地圖縮放、hold 讓這章停久一點（倍數）、at:[lat,lon] 沒照片時的落點。
window.CHAPTERS = [
  { title:'民生社區・臺大公衛', caption:'第一次相遇與互相認識', photos:['001','002'] },
  { title:'象山', caption:'第一次約會登象山', photos:['003'] },
  { title:'草嶺古道', caption:'接著走草嶺古道', photos:['004'] },
  { title:'臺北', caption:'在台北各地區走透透，和親朋好友們一起度過連假',
    photos:['005','006','007','008','009','010','011','013','014','017','018','019','020','023','028','029'] },
  { title:'桃園燈節', caption:'參加桃園燈節', photos:['012'] },
  { title:'宜蘭・龜山島', caption:'回宜蘭 Poy 老家、登龜山島', photos:['015','016'] },
  { title:'鶯歌', caption:'參訪鶯歌陶瓷博物館、新北美術館', photos:['021','022'] },
  { title:'嘉義', caption:'回嘉義 Jenny 老家', photos:['024','043','044'] },
  { title:'臺南', caption:'與 Jenny 家人一起去臺南', photos:['025','026','027'] },
  { title:'冬山河', caption:'與 Jenny 家人一起去冬山河路跑', photos:['030','031'] },
  { title:'雪梨・藍山', caption:'前往雪梨、藍山', photos:['032','033','034'] },
  { title:'布里斯本', caption:'前往布里斯本找朋友', photos:['035','036','037'] },
  { title:'香港', caption:'飛回臺灣順便經過香港', photos:['038'] },
  { title:'訂婚', caption:'訂婚了！兩家人相見歡', photos:['039','040'], hold:1.3 },
  { title:'古亭', caption:'和最重要的媒人～佳霖見面！', photos:['041'] },
  { title:'婚戒・婚紗', caption:'開始挑婚戒、拍婚紗照', photos:['042','045','046'] },
  { title:'登記結婚', caption:'我們登記結婚了！', photos:['047','048'], hold:1.3 },
  { title:'德州農工大學', caption:'Poy 前往德州農工大學交換，和 Jenny 遠距相愛', photos:['066','061','067','068'], dateLabel:'2026' },
  { title:'猶他州', caption:'前往猶他州，我們的蜜月開始了！', photos:['049'] },
  { title:'黃石・大提頓', caption:'我們在黃石公園、大提頓旅遊', photos:['050','051','052','053','054','055'] },
  { title:'丹佛', caption:'前往丹佛、紅石劇場、洛磯山脈', photos:['056','057'] },
  { title:'德州', caption:'前往德州、達拉斯、奧斯汀、聖安東尼奧、德州農工大學、休士頓', photos:['058','069','070','059','060'] },
  { title:'回到臺灣', caption:'Poy 回國與家人朋友聚餐', photos:['062','063','064','065','071','072'] },
];

// 開場：兩人各自從老家出發到臺北會合（第一章第一張照片的位置）
window.INTRO = {
  jenny: { name:'Jenny', from:[23.4801, 120.4491], label:'嘉義' },
  poy:   { name:'Poy',   from:[24.7570, 121.7530], label:'宜蘭' },
};

// 結尾字幕
window.ENDING = { title:'我們的足跡', caption:'我們的旅程，還會繼續走下去。' };

// 配樂：相對於 index.html 的路徑（放在網站資料夾外面，不會進 git）；volume 0–1；fadeOutSec 結尾淡出秒數
window.BGM = { src: '../配樂/陪著你走 盧冠廷 純音樂 鋼琴版 【附鋼琴譜】 ｜ Piano Cover #68 [aTcamrq0UCM].mp3', volume: 0.9, fadeOutSec: 4 };
