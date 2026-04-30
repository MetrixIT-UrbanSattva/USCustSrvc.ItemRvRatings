/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */
const ApiCallSrvc = require('../services/ApiCallSrvc')
const CustsItemRvRtngs = require('../schemas/CustsItemRvRtngs');
const CutsItmRvRtngsDaosImpl = require('../daosimplements/CutsItmRvRtngsDaosImpl');
const CutsItmRvRtngsDao = require('../daos/CutsItmRvRtngsDao');

// ---------------------- BEGIN: Customer Items APIs ---------------------- //

// BEGIN: Custs Items List
const getCustsItemRvRtngsList = (reqBody, tokenData, callback) => {
  const obj = CutsItmRvRtngsDaosImpl.getCustsItemRvRtngsList(reqBody, tokenData);
  CutsItmRvRtngsDao.getCustsItemRvRtngsList(reqBody.crntPgNum, reqBody.pageLimit, obj, callback);
};

const cusMyOrdsRvwRating = (reqBody, tdata, kmvcatoken, cb) => {
  const itmRvwData = CutsItmRvRtngsDaosImpl.setItmRvRtnatgData(reqBody, tdata);
  const createItmRvwRtng = new CustsItemRvRtngs(itmRvwData);
  CutsItmRvRtngsDao.createItmRvwRtng(createItmRvwRtng, resObj => {
    if (resObj.status == '200') {
      const resData = resObj.resData.result;
      const rvwData = CutsItmRvRtngsDaosImpl.setApiRvwData(resData, 'upd');
      ApiCallSrvc.adminItmRvwRtngUpd(resData, kmvcatoken);
      ApiCallSrvc.setApiItemsRating(rvwData, kmvcatoken)
      ApiCallSrvc.adminItmRvwRtng(itmRvwData, kmvcatoken);
      ApiCallSrvc.vcItmRvwRtngUpd(resData, kmvcatoken)
      cb(resObj);
    } else {
      cb(resObj);
    }
  });
}

const userMyOrdsRvwRtngView = (reqBody, callback) => {
  const obj = CutsItmRvRtngsDaosImpl.itmRvwRtngView(reqBody);
  CutsItmRvRtngsDao.itmRvwView(obj, callback);
};

const cusMyOrdsRvwRtngUpd = (reqBody, tData, kmvcatoken, callback) => {
  const obj = CutsItmRvRtngsDaosImpl.itmRvwRtngView(reqBody);
  const updObj = CutsItmRvRtngsDaosImpl.itmRvwRtngUpdate(reqBody, tData);
  CutsItmRvRtngsDao.itmRvwUpdate(obj, updObj, resObj => {
    if (resObj.status == '200') {
      const resData = resObj.resData.result;
      ApiCallSrvc.adminItmRvwRtngUpd(resData, kmvcatoken);
      ApiCallSrvc.vcItmRvwRtngUpd(resData, kmvcatoken)
      callback(resObj);
    } else {
      callback(resObj);
    }
  });
};

const updateCustsItemRvRtngsLikesCount = (reqBody, kmvcatoken, callback) => {
  if(reqBody.value == 'update') {
    const obj = CutsItmRvRtngsDaosImpl.itmRvwRtnglikeCountUpdate(reqBody);
    updateFunct(obj,  kmvcatoken, callback);
  } else {
    const obj = CutsItmRvRtngsDaosImpl.itmRvwRtngCountupdate(reqBody);
    updateFunct(obj, kmvcatoken, callback);
  }
}
// END: Custs Items List

// ---------------------- END: Customer Items APIs ---------------------- //

module.exports = {
  getCustsItemRvRtngsList, cusMyOrdsRvwRating,
  userMyOrdsRvwRtngView, cusMyOrdsRvwRtngUpd,
  updateCustsItemRvRtngsLikesCount
}

const updateFunct = (obj, kmvcatoken, callback) => {
  CutsItmRvRtngsDao.itmRvwUpdate(obj.query, obj.updateObj, (resObj) => {
    callback(resObj);
    resObj.status == '200' && ApiCallSrvc.updateCustsItemRvRtngsLikesCount(resObj.resData.result, kmvcatoken);
  }); 
}
