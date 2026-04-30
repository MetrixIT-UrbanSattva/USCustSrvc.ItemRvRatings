/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const CutsItmRvRtngsFlsDaosImpl = require('../daosimplements/CutsItmRvRtngsFlsDaosImpl');
const CutsItmRvRtngsFlsDao = require('../daos/CutsItmRvRtngsFlsDao');

// ---------------------- BEGIN: Customer Items APIs ---------------------- //

// BEGIN: Custs Items List
const getCustsItemFlsRvRtngsList = (reqBody, tokenData, callback) => {
  const obj = CutsItmRvRtngsFlsDaosImpl.getCustsItemFlsRvRtngsList(reqBody, tokenData);
  CutsItmRvRtngsFlsDao.getCustsItemFlsRvRtngsList(reqBody.crntPgNum, reqBody.pageLimit, obj, callback);
};
// END: Custs Items List

// ---------------------- END: Customer Items APIs ---------------------- //

module.exports = {
  getCustsItemFlsRvRtngsList
}
