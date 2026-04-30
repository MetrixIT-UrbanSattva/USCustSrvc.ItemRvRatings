/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const util = require('../lib/util');
const CutsItmRvRtngsSrvc = require('../services/CutsItmRvRtngsSrvc');
const token = require('../tokens');
const CutsItmRvRtngsCntrlVldn = require('../controllers/CutsItmRvRtngsCntrlVldn');

// ---------------------- BEGIN: Customer Items APIs ---------------------- //

const apiServerStatus = (req, res) => {
  const resObj = { httpStatus: 200, status: '200', resData: { message: 'Kaia Mart - Vendor Customers API server is running' } };
  util.sendApiResponse(res, resObj);
}

// BEGIN: Custs Items List
const getCustsItemRvRtngsList = (req, res) => {
  const lv = CutsItmRvRtngsCntrlVldn.listVldn(req);
  if (lv.flag) {
    if (req.headers.kmvcatoken) {
      const decodedData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
      const tv = CutsItmRvRtngsCntrlVldn.tknVldn(decodedData);
      if (tv.flag) {
        CutsItmRvRtngsSrvc.getCustsItemRvRtngsList(req.body, decodedData.tokenData, (resObj) => {
          util.sendApiResponse(res, resObj);
        });
      } else {
        const tr = tv.result;
        util.sendApiResponse(res, tr);
      }
    } else {
      CutsItmRvRtngsSrvc.getCustsItemRvRtngsList(req.body, {}, (resObj) => {
        util.sendApiResponse(res, resObj);
      });
    }
  } else {
    const lr = lv.result;
    util.sendApiResponse(res, lr);
  }
};

const userMyOrdsRvwRtng = (req, res) => {
  const bodyValdn = CutsItmRvRtngsCntrlVldn.cusMyOrdersRvwRtngVald(req);
  if (bodyValdn.isFlag) {
    const decodedData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tokenValdn = CutsItmRvRtngsCntrlVldn.tknVldn(decodedData);
    if (tokenValdn.flag) {
      CutsItmRvRtngsSrvc.cusMyOrdsRvwRating(req.body, decodedData.tokenData, req.headers.kmvcatoken, (resArr) => {
        util.sendApiResponse(res, resArr);
      })
    } else {
      util.sendApiResponse(res, tokenValdn.result);
    }
  } else {
    util.sendApiResponse(res, bodyValdn.result);
  }
}

const userMyOrdsRvwRtngView = (req, res) => {
  const bodyValdn = CutsItmRvRtngsCntrlVldn.cusMyOrdersRvwRtngVald(req);
  if (bodyValdn.isFlag) {
    const decodedData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tokenValdn = CutsItmRvRtngsCntrlVldn.tknVldn(decodedData);
    if (tokenValdn.flag) {
      CutsItmRvRtngsSrvc.userMyOrdsRvwRtngView(req.body, (resArr) => {
        util.sendApiResponse(res, resArr);
      })
    } else {
      util.sendApiResponse(res, tokenValdn.result);
    }
  } else {
    util.sendApiResponse(res, bodyValdn.result);
  }
}

const userMyOrdsRvwRtngUpdate = (req, res) => {
  const bodyValdn = CutsItmRvRtngsCntrlVldn.cusMyOrdersRvwRtngVald(req);
  if (bodyValdn.isFlag) {
    const decodedData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tokenValdn = CutsItmRvRtngsCntrlVldn.tknVldn(decodedData);
    if (tokenValdn.flag) {
      CutsItmRvRtngsSrvc.cusMyOrdsRvwRtngUpd(req.body, decodedData.tokenData, req.headers.kmvcatoken, (resArr) => {
        util.sendApiResponse(res, resArr);
      })
    } else {
      util.sendApiResponse(res, tokenValdn.result);
    }
  } else {
    util.sendApiResponse(res, bodyValdn.result);
  }
}

const updateCustsItemRvRtngsLikesCount = (req, res) => {
  const decodedData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
  const tv = CutsItmRvRtngsCntrlVldn.tknVldn(decodedData);
  if (tv.flag) {
    CutsItmRvRtngsSrvc.updateCustsItemRvRtngsLikesCount(req.body, req.headers.kmvcatoken, (resObj) => {
      util.sendApiResponse(res, resObj);
    });
  } else {
    const tr = tv.result;
    util.sendApiResponse(res, tr);
  }
};
//  END: Custs Items List 

module.exports = {
  apiServerStatus, userMyOrdsRvwRtng,
  getCustsItemRvRtngsList, userMyOrdsRvwRtngView,
  userMyOrdsRvwRtngUpdate, updateCustsItemRvRtngsLikesCount
}
