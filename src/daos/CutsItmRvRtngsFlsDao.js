/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const logger = require('../lib/logger');
const CustsItemRvRtngsFls = require('../schemas/CustsItemRvRtngsFiles');
const SetRes = require('../SetRes');

// ---------------------- BEGIN: Customer Items APIs ---------------------- //

// BEGIN: Custs Items List 
const getCustsItemFlsRvRtngsList = (pageNumber, pageLimit, obj, callback) => {
  var resultObj = { CustsItemRvRtgsFlsListCount: 0, CustsItemRvRtgsFlsListData: [] };
  CustsItemRvRtngsFls.find(obj.query).skip((pageNumber - 1) * pageLimit).limit(pageLimit).sort(obj.sortQuery).exec((error, resObj) => {
    if (error) {
      logger.error('Un-konwn Error occured in daos/CustsItemRvRtngsFlsDao.js at getCustsItemFlsRvRtngsList:' + error);
      const errMsg = SetRes.unKnownErr(resultObj);
      callback(errMsg);
    } else if (resObj && resObj.length > 0) {
      resultObj = { CustsItemRvRtgsFlsListCount: resObj.length, CustsItemRvRtgsFlsListData: resObj };
      CustsItemRvRtngsFls.countDocuments(obj.query).exec((errorCount, resultCount) => {
        if (errorCount) {
          logger.error('Un-known Error occured in daos/CustsItemRvRtngsFlsDao.js, at getCustsItemFlsRvRtngsList(countDocuments):' + errorCount);
          const resMsg = SetRes.responseData(resultObj);
          callback(resMsg);
        } else if (resultCount) {
          resultObj = { CustsItemRvRtgsFlsListCount: resultCount, CustsItemRvRtgsFlsListData: resObj };
          const resMsg = SetRes.responseData(resultObj);
          callback(resMsg);
        } else {
          const resMsg = SetRes.responseData(resultObj);
          callback(resMsg);
        }
      });
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  })
}
// END: Custs Items List 
// ---------------------- END: Customer Items APIs ---------------------- //

module.exports = {
  getCustsItemFlsRvRtngsList
}
