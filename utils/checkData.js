const puppeteer = require('../utils/puppeteer');

exports.checkData = async (data, check = false) => {
  try {
    // const urlData = data.map(item => item.url);
    let resList = [];
    const browser = await puppeteer.getBrowser();

    if (check === true) {
      const list = data.map((url) => {
        return new Promise(async (resolve, reject) => {
          const obj = await puppeteer.getUrlStatus(browser, url);

          resolve(obj);
        });
      });

      await Promise.allSettled(list)
        .then((results) => {
          results.forEach((item) => {
            resList.push(item);
          });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      for (const chunk of data) {
        // console.log(false);
        const list = chunk.map((item) => {
          return new Promise(async (resolve, reject) => {
            const obj = await puppeteer.getUrlStatus(browser, item.url);

            resolve(obj);
          });
        });

        const test = await Promise.allSettled(list).catch((err) => {
          throw err;
        });

        test.forEach((item) => resList.push(item));
      }
    }
    await browser.close();
    return resList;
  } catch (err) {
    console.log(err);
  }
};
