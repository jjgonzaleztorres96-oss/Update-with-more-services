const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('file:///home/user/Website-corner/preview.html#page-services', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const imgInfo = await page.evaluate(() => {
    const img = document.querySelector('#page-services .svc-photo');
    if (!img) return { found: false };
    return {
      found: true,
      srcStart: img.src ? img.src.substring(0, 60) : 'EMPTY',
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      offsetWidth: img.offsetWidth,
      offsetHeight: img.offsetHeight,
    };
  });
  console.log(JSON.stringify(imgInfo, null, 2));

  await browser.close();
})();
