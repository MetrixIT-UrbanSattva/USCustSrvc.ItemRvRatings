/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const SetRes = require('../SetRes');
const userType = 'VC User';

const listVldn = (req) => {
  const reqBody = req.body;
 if (!reqBody.unitId || !reqBody.crntPgNum || !reqBody.pageLimit ) {
    const ma = SetRes.mandatory();
    return { flag: false, result: ma };
  } else {
    return { flag: true };
  }
};

const tknVldn = (tData) => {
  if(!tData) {
    const it = SetRes.tokenInvalid();
    return {flag: false, result: it};
  } else if(tData.isExpired) {
    const te = SetRes.tokenExpired();
    return {flag: false, result: te};
  } else if(tData.tokenData && tData.tokenData.ur != userType) {
    const ad = SetRes.invalidAccess();
    return {flag: false, result: ad};
  } else {
    return {flag: true};
  }
}

const cusMyOrdersRvwRtngVald = (req) => {
  const reqBody = req.body;
  if (!req.headers.kmvcatoken) {
    const tr = SetRes.tokenRequired();
    return {isFlag: false, result: tr}
  // } else if (!reqBody.activePage || !reqBody.pageLimit) {
  //   const bv = SetRes.bodyValidation();
  //   return {isFlag: false, result: bv}
  } else {
    return {isFlag: true}
  }
}

module.exports = {
  listVldn,
  tknVldn, cusMyOrdersRvwRtngVald,
}