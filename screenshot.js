const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('file:///home/user/Website-corner/preview.html#page-services', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  // scroll to the detail section
  await page.evaluate(() => {
    document.querySelector('.svc-detail').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/tmp/svc-interior-full.png', fullPage: false });
  await browser.close();
  console.log('done');
})();
