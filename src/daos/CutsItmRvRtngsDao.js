/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const logger = require('../lib/logger');
const CustsItemRvRtngs = require('../schemas/CustsItemRvRtngs');
const SetRes = require('../SetRes');

// ---------------------- BEGIN: Customer Items APIs ---------------------- //

// BEGIN: Custs Items List 
const getCustsItemRvRtngsList = (pageNumber, pageLimit, obj, callback) => {
  var resultObj = { custsItemRvRtngsListCount: 0, custsItemRvRtngsListData: [] };
  CustsItemRvRtngs.find(obj.query).skip((pageNumber - 1) * pageLimit).limit(pageLimit).sort(obj.sortQuery).exec((error, resObj) => {
    if (error) {
      logger.error('Un-konwn Error occured in daos/CustsItemRvRtngsDao.js at getCustsItemRvRtngsList:' + error);
      const errMsg = SetRes.unKnownErr(resultObj);
      callback(errMsg);
    } else if (resObj && resObj.length > 0) {
      resultObj = { custsItemRvRtngsListCount: resObj.length, custsItemRvRtngsListData: resObj };
      CustsItemRvRtngs.countDocuments(obj.query).exec((errorCount, resultCount) => {
        if (errorCount) {
          logger.error('Un-known Error occured in daos/CustsItemRvRtngsDao.js, at getCustsItemRvRtngsList(countDocuments):' + errorCount);
          const result = SetRes.responseData(resultObj);
          callback(result);
        } else if (resultCount) {
          resultObj = { custsItemRvRtngsListCount: resultCount, custsItemRvRtngsListData: resObj };
          const result = SetRes.responseData(resultObj);
          callback(result);
        } else {
          const result = SetRes.responseData(resultObj);
          callback(result);
        }
      });
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  })
}

const createItmRvwRtng = (createData, callback) => {
  createData.save((error, resultObj)  => {
    if (error) {
      logger.error('There was an Un-konwn Error occured in dao/CustsItemRvRtngsDao.js, at createItmRvwRtng:' + error);
      const err = SetRes.unKnownErr({message: '500 - Unknown Error'});
      callback(err);
    } else if (resultObj && resultObj._id) {
      const resData = SetRes.responseData(resultObj);
      callback(resData);
    } else {
      const cf = SetRes.createFail({});
      callback(cf);
    }
  });
}

const itmRvwView = (obj, callback) => {
  CustsItemRvRtngs.findOne(obj).exec((error, resObj) => {
    if (error) {
      logger.error('Un-konwn Error occured in daos/CustsItemRvRtngsDao.js at itmRvwView:' + error);
      const errMsg = SetRes.unKnownErr({});
      callback(errMsg);
    } else if (resObj && resObj._id) {
      const result = SetRes.responseData(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  })
}

const itmRvwUpdate = (obj, updObj, callback) => {
  CustsItemRvRtngs.findOneAndUpdate(obj, {$set: updObj}, {new: true}).exec((error, resObj) => {
    if (error) {
      logger.error('Un-konwn Error occured in daos/CustsItemRvRtngsDao.js at itmRvwUpdate:' + error);
      const errMsg = SetRes.unKnownErr({});
      callback(errMsg);
    } else if (resObj && resObj._id) {
      const result = SetRes.responseData(resObj);
      callback(result);
    } else {
      const noData = SetRes.updateFail({});
      callback(noData);
    }
  })
}
// END: Custs Items List 
// ---------------------- END: Customer Items APIs ---------------------- //

module.exports = {
  getCustsItemRvRtngsList, createItmRvwRtng, itmRvwView,
  itmRvwUpdate
}
