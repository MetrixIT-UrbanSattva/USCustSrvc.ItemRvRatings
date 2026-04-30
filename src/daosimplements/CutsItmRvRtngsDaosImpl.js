/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const CommonSrvc = require('../services/CommonSrvc');
var {v4: uuidv4} = require('uuid');
const status = "Active";

// ---------------------- BEGIN: Customer Items APIs ---------------------- //

const getCustsItemRvRtngsList = (reqBody, tokenData) => {
   const vndrOrg =  tokenData.iss ? {vndrOrg: tokenData.vid} : {};
  const query = {
    delFlag: false,
    ...vndrOrg,
    isReview: true,
    hoda: status,
    citd : reqBody.unitId
  }
  const sortQuery = { hCount: 1, lCount: 1, rating: 1, cDtNum: -1, uDtNum: -1 };
  return { query, sortQuery }
};

const setItmRvRtnatgData = (reqBody, tdata) => {
  const currentUTC = CommonSrvc.currUTCObj();
  return {
    _id: uuidv4(),
    citd: reqBody.itemData.ciId,
    vndrOrg: reqBody.itemData.vndrOrg,
    voName: reqBody.itemData.voName,
    voCode: reqBody.itemData.voCode,
    item: reqBody.itemData.item,
    itemCode: reqBody.itemData.itemCode,
    voItem: reqBody.itemData.voItem,
    voiCode: reqBody.itemData.voiCode,

    uId: reqBody.itemData.uid,
    pName: reqBody.itemData.sodl.pName || '',
    mName: reqBody.itemData.lName  || '',
    // uipath: reqBody.itemData.uipath,
    mobCcNum: reqBody.itemData.sodl.mobCcNum || '' ,
    emID: reqBody.itemData.sodl.emID || '',
    refUID: reqBody.itemData.refUID || '',
    so : reqBody.itemData.so,
    soCode: reqBody.itemData.soCode,
    soGrp: reqBody.itemData.soGrp,
    soGrpCode: reqBody.itemData.soGrpCode,
    soiCode: reqBody.itemData.voiCode,
    soItem: reqBody.itemData._id,
    rating: reqBody.rating,
    reviewTitle: reqBody.reviewTitle,
    review: reqBody.review,
    hoda: 'Inactive',
    cuRakam: tdata.ur,
    cUser: tdata.iss,
    cUserName: tdata.pn,
    cDtStr: currentUTC.currUTCDtTmStr,
    cDtNum: currentUTC.currUTCDtTmNum,
    uuRakam: tdata.ur,
    uUser: tdata.iss,
    uUserName: tdata.pn,
    uDtStr: currentUTC.currUTCDtTmStr,
    uDtNum: currentUTC.currUTCDtTmNum,

  }

}
const itmRvwRtngView = (reqBody) => {
return { delFlag: false, _id: reqBody.id}
}

const itmRvwRtnglikeCountUpdate = (reqBody) => {
  const query = { delFlag: false, _id: reqBody._id };
  const count = reqBody.lType === 'Liked' ? {lCount : reqBody.count, dlCount: reqBody.dCount} : {dlCount : reqBody.count, lCount: reqBody.dCount};
  const updateObj = {
    ...count,
    uuRakam: reqBody.uuRakam,
    uUser: reqBody.uUser,
    uUserName: reqBody.uUserName,
    uDtStr: reqBody.uDtStr,
    uDtNum: reqBody.uDtNum,
  };
  return {query, updateObj}
}
const itmRvwRtngCountupdate = (reqBody) => {
  const query = { delFlag: false, _id: reqBody._id };
  const count = reqBody.lType === 'Liked' ? {lCount : reqBody.count} : {dlCount : reqBody.count};
  const updateObj = {
    ...count,
    uuRakam: reqBody.uuRakam,
    uUser: reqBody.uUser,
    uUserName: reqBody.uUserName,
    uDtStr: reqBody.uDtStr,
    uDtNum: reqBody.uDtNum,
  };
  return {query, updateObj}
}
const itmRvwRtngUpdate = (reqBody, tdata) => {
  const currentUTC = CommonSrvc.currUTCObj();
  return {
  rating: reqBody.rating,
  reviewTitle: reqBody.reviewTitle,
  review: reqBody.review,
  uuRakam: tdata.ur,
  uUser: tdata.iss,
  uUserName: tdata.pn,
  uDtStr: currentUTC.currUTCDtTmStr,
  uDtNum: currentUTC.currUTCDtTmNum,
  }
}

const setApiRvwData = (data, key) => {
  const ratdUsr = key == 'crt' ? 1 : 0;
  return {
    voItem: data.voItem,
    rtngCnt: data.rating,
    ratdUsr
  }
  }
// ---------------------- End: Customer Items APIs ---------------------- //

module.exports = {
  getCustsItemRvRtngsList, setItmRvRtnatgData,
  itmRvwRtngView, itmRvwRtngUpdate, itmRvwRtnglikeCountUpdate, itmRvwRtngCountupdate, setApiRvwData
}
