const fs = require("fs");

const readFile = (file) => {
  let rawdata = fs.readFileSync(file);
  let parsedData = JSON.parse(rawdata);
  return parsedData;
};

const prepareData = (data) => {
  const resultObject = {};

  for (const key in data) {
    let email = data[key].split("@");
    if (!resultObject.hasOwnProperty(email[1])) {
      resultObject[email[1]] = [email[0], key];
    }
  }
  return resultObject;
};

module.exports = { readFile, prepareData };
