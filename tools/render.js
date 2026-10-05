// 相識影片：虛擬時間逐格錄製，2 倍解析度（3840×2160），每格等地圖磚與照片載好、再等兩個真實畫面才截圖
const { chromium } = require('playwright');
const fs=require('fs');
const FPS=30, STEP=1000/FPS, W=1920, H=1080, DPR=2;
const START=+(process.argv[2]||0), END=process.argv[3]?+process.argv[3]:Infinity, TAG=process.argv[4]||'';
const DIR='/home/claude/render/frames4k/';
const log=(...a)=>{ const s=new Date().toISOString().slice(11,19)+' '+a.join(' '); console.log(s); fs.appendFileSync('/home/claude/render/render4k'+TAG+'.log', s+'\n'); };
(async () => {
  const browser = await chromium.launch({ proxy:{server:process.env.HTTPS_PROXY}, args:['--ignore-certificate-errors','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--autoplay-policy=no-user-gesture-required','--font-render-hinting=none','--run-all-compositor-stages-before-draw','--disable-checker-imaging','--disable-new-content-rendering-timeout'] });
  const ctx = await browser.newContext({ viewport:{width:W,height:H}, deviceScaleFactor:DPR, ignoreHTTPSErrors:true });
  await ctx.addInitScript({ path: '/home/claude/tw/node_modules/timeweb/dist/timeweb.js' });
  const page = await ctx.newPage();
  page.on('pageerror', e => log('PAGEERROR', e.message));
  await page.goto('file:///home/claude/site/index.html', { waitUntil:'load' });
  await page.addStyleTag({ content: '.leaflet-control-zoom{display:none!important}' });
  await page.keyboard.press('h');                                           // 先藏控制列、字卡，暖機期間讓它們的過渡跑完
  await page.evaluate(()=>{ document.querySelector('#hud').style.opacity=0; });
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const settle = async () => {
    for (let i=0;i<300;i++){
      const st=await page.evaluate(()=>{ const gl=window.__app.gl; let tiles=true; if (gl){ try{ gl.redraw(); tiles=gl.areTilesLoaded()&&gl.isStyleLoaded(); }catch(e){} }
        const imgs=[...document.querySelectorAll('.card img, .pm img, .polaroid img')].every(im=>im.complete); return {tiles,imgs}; });
      if (st.tiles&&st.imgs) return i;
      await sleep(100);
    }
    return -1;
  };
  let vt=0;
  for (let i=0;i<80;i++){ vt+=100; await page.evaluate(t=>timeweb.goTo(t), vt); await sleep(30); }
  await settle();
  const info = await page.evaluate(()=>({ sel: document.querySelector('#total').value, target: window.__app.plan && window.__app.plan.target, dur: window.__app.bgm.duration, chapters: window.__app.chapters.length, photos: window.__app.photos.length, dpr: devicePixelRatio, font: getComputedStyle(document.querySelector('#hudDate')).fontFamily.slice(0,60) }));
  log('setup', JSON.stringify(info));
  if (info.sel!=='bgm' || !info.target || info.target<200000){ log('ABORT: 總長不是配樂長度'); await browser.close(); process.exit(1); }
  const totalMs = info.target + 1000, N = Math.ceil(totalMs/STEP);
  await page.evaluate(()=>{ window.__app.play(); });
  const t0=Date.now(); const vt0=vt;
  if (START>0){   // 快轉到起點：先把 WebGL 底圖整個拿掉（停住不畫會被 Chrome 判定 context lost），快轉完再重新掛上
    await page.evaluate(()=>{ window.__app.dropBasemap(); const c=window.__app.trailCanvas; c.__draw=c._draw; c._draw=function(){}; });   // 底圖拿掉、軌跡畫布也先不畫，免得 GPU 被塞爆
    // 每一步都讓瀏覽器真的合成一次畫面（兩個真實 rAF），否則 compositor 會留下卡住的標記殘影（跟著畫面不動的鬼影）
    for (let f=0; f<START; f++){ vt = vt0 + (f+1)*STEP; await page.evaluate(t=>timeweb.goTo(t), vt); await page.evaluate(()=>new Promise(r=>timeweb.realtime.requestAnimationFrame(()=>timeweb.realtime.requestAnimationFrame(r)))); if (f%500===499) log('fast-forward', f+1, '/', START, ((Date.now()-t0)/1000).toFixed(0)+'s'); }
    await page.evaluate(()=>{ const c=window.__app.trailCanvas; c._draw=c.__draw; c._redraw(); window.__app.setBasemap('liberty'); });
    for (let i=0;i<600;i++){ const ok=await page.evaluate(()=>{ const gl=window.__app.gl; return !!(gl && gl.isStyleLoaded() && gl.loaded()); }); if (ok) break; await sleep(200); }
    await settle(); log('fast-forward to', START, 'done', ((Date.now()-t0)/1000).toFixed(0)+'s');
  }
  const LAST=Math.min(N, END);
  for (let f=START; f<LAST; f++){
    vt = vt0 + (f+1)*STEP;
    await page.evaluate(t=>timeweb.goTo(t), vt);
    const s = await settle();
    await page.evaluate(()=>new Promise(r=>timeweb.realtime.requestAnimationFrame(()=>timeweb.realtime.requestAnimationFrame(r))));
    let buf=null; for (let a=0;a<3 && !buf;a++){ try { buf = await page.screenshot({ type:'jpeg', quality:95, timeout:90000 }); } catch(e){ log(`shot retry ${a+1} at frame ${f}: ${e.message.split('\n')[0]}`); await sleep(2000); } }
    if (!buf) throw new Error('screenshot failed 3 times at frame '+f);
    fs.writeFileSync(DIR+`f${String(f).padStart(5,'0')}.jpg`, buf);
    if (f%100===0 || s<0){ const el=(Date.now()-t0)/1000; const st=await page.evaluate(()=>({ clock: document.querySelector('#clock').textContent.slice(2,13), hud: document.querySelector('#hudDate').textContent.slice(0,12), z:+window.__app.map.getZoom().toFixed(1), cards: document.querySelectorAll('.card.on').length })); log(`frame ${f}/${LAST} settle=${s} ${JSON.stringify(st)} elapsed ${(el/60).toFixed(0)}min eta ${(el/(f-START+1)*(LAST-f-1)/60).toFixed(0)}min`); }
  }
  log('DONE frames', START, '-', LAST);
  await browser.close();
})().catch(e=>{ log('FATAL', e.stack||e.message); process.exit(1); });
