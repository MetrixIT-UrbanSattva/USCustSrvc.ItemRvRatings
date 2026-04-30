/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const util = require('../lib/util');
const CutsItmRvRtngsFlsSrvc = require('../services/CutsItmRvRtngsFlsSrvc');
const token = require('../tokens');
const CutsItmRvRtngsCntrlVldn = require('../controllers/CutsItmRvRtngsCntrlVldn');

// ---------------------- BEGIN: Customer Items APIs ---------------------- //

const apiServerStatus = (req, res) => {
  const resObj = { httpStatus: 200, status: '200', resData: { message: 'Kaia Mart - Vendor Customers API server is running' } };
  util.sendApiResponse(res, resObj);
}

// BEGIN: Custs Items List
const getCustsItemFlsRvRtngsList = (req, res) => {
  const lv = CutsItmRvRtngsCntrlVldn.listVldn(req);
  if (lv.flag) {
    const decodedData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tv = CutsItmRvRtngsCntrlVldn.tokenValidation(decodedData);
    if (tv.flag) {
      CutsItmRvRtngsFlsSrvc.getCustsItemFlsRvRtngsList(req.body, decodedData.tokenData, (resObj) => {
        util.sendApiResponse(res, resObj);
      });
    } else {
      const tr = tv.result;
      util.sendApiResponse(res, tr);
    }
  } else {
    const lr = lv.result;
    util.sendApiResponse(res, lr);
  }
};
//  END: Custs Items List 

module.exports = {
  apiServerStatus,
  getCustsItemFlsRvRtngsList
}
