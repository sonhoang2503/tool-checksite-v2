const convertFile = require('./utils/convert-file');
const isUrl = require('is-valid-http-url');

const arr = convertFile('./TOP page/askcoininfo.com.txt');
// const arr = convertFile('./TOP page/Therecipes.txt');

const arrOfObj = arr
  .filter((url) => isUrl(url))
  .map((item) => {
    return { url: item };
  });

// const arrOfErr = error
//   .filter((item) => item !== '')
//   .map((item) => {
//     return { url: item, status: 500 };
//   });

console.log(arrOfObj);

// console.log(arr);
require('dotenv').config({ path: './.env' });
const connectDB = require('./utils/DB');
const Url = require('./models/url');
const ErrorURL_update = require('./models/error.update');
const UrlError = require('./models/error');

const removeData = async () => {
  await connectDB(process.env.DB_URI);
  await Url.deleteMany();
  await ErrorURL_update.deleteMany();
  await UrlError.deleteMany();
  console.log('Remove data successfully');
};

// removeData();

const importData = async () => {
  await connectDB(process.env.DB_URI);
  // await UrlError.create(arrOfErr);
  await Url.create(arrOfObj);
  console.log('Data add successfully');
};

importData();
