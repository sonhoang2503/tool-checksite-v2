// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

exports.getBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
    ],
    ignoreHTTPSErrors: true,
  });
};

exports.getUrlStatus = async (browser, url) => {
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        request.resourceType() === 'image' ||
        request.resourceType() === 'stylesheet' ||
        request.resourceType() === 'script' ||
        request.resourceType() === 'media' ||
        request.resourceType() === 'websocket' ||
        request.resourceType() === 'eventsource' ||
        request.resourceType() === 'font' ||
        request.resourceType() === 'fetch'
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
    const response = await page.goto(url, {
      waitUntil: 'load',
      // Remove the timeout
      timeout: 0,
    });

    const status = response.status();

    await page.close();
    return { url: url, status: status };
  } catch (err) {
    console.log(err);
  }
};
