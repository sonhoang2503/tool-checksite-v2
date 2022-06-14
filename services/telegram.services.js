const UrlService = require('./url.services');
const axios = require('axios');
const { checkData } = require('../utils/checkData');
const connectDB = require('../utils/DB');

const chunk = (arr, chunkSize) => {
  let chunked = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunked.push(arr.slice(i, i + chunkSize));
  }

  return chunked;
};

const sendMessage = async (message) => {
  const token = process.env.TOKEN_TEL;
  const chatId = process.env.GROUPCHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;
  const res = await axios({
    method: 'get',
    url,
  });
};

exports.sendNotif = async () => {
  const raw = await UrlService.getUrls();
  const rawChunk = chunk(raw, 10);
  const rawList = await checkData(rawChunk);
  const errorList = rawList
    .map((item) => item.value)
    .filter((item) => {
      return item.status !== 200;
    });

  if (errorList.length > 0) {
    const msg = `ERROR, ERROR!!! Please check these Sites! Something went wrong!!
                https://toolcheckurls-hoangnguyen.netlify.app/list`;

    await UrlService.updateErrorList(errorList);
    await sendMessage(msg);
  } else {
    const msg = `Everything is working fine!! Keep going`;
    await sendMessage(msg);
  }
};
