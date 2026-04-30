/**
 * Copyright (C) NextGen Technology Solutions, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Written by NextGen <info@ngstek.com>, Jan 2020
 */

var moment = require('moment');

const currUTCObj = () => {
  const utcMoment = moment.utc();
  const currUTCDtTmStr = utcMoment.format('YYYY-MM-DD HH:mm:ss');
  const currUTCDtTmNum = moment(currUTCDtTmStr, 'YYYY-MM-DD HH:mm:ss').valueOf();
  const currUTCDtTm = new Date(currUTCDtTmStr);
  return {currUTCDtTmStr, currUTCDtTmNum, currUTCDtTm};
}

const currUTC = (type) => {
  const utcMoment = moment.utc();
  const currUTCDtTmStr = utcMoment.format('YYYY-MM-DD HH:mm:ss');
  switch(type) {
    case 'Num':
      const currUTCDtTmNum = moment(currUTCDtTmStr, 'YYYY-MM-DD HH:mm:ss').valueOf();
      return currUTCDtTmNum;
    case 'DtTm':
      const currUTCDtTm = new Date(currUTCDtTmStr);
      return currUTCDtTm;
    default:
      return currUTCDtTmStr;
  }
}

const isJsonEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

// --- Delete Folder === //
const dltFolder = (filesPath) => {
  if (filesPath && filesPath.length > 0) {
    var folder = filesPath[0].destination || '';
    rimraf(folder, function () { });
  }
}

// --- Random String Generation --- //
const randomStrGen = (str, size) => {
  var result = '';
  for (let i = size; i > 0; --i) result += str[Math.floor(Math.random() * str.length)];
  return result;
};

module.exports = {
  currUTCObj, currUTC,
  isJsonEmpty, dltFolder,
  randomStrGen
}
