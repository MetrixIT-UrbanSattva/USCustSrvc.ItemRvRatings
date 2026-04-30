/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const status = "Active";

// ---------------------- BEGIN: Customer Items APIs ---------------------- //

const getCustsItemFlsRvRtngsList = (reqBody, tokenData) => {
  const query = {
    delFlag: false,
    vndrOrg: tokenData.vid,
    hoda: status,
    voiCode: reqBody.itemId
  }
  const sortQuery = { fSeq: -1, cDtNum: -1, uDtNum: -1 };
  return { query, sortQuery }
};

// ---------------------- End: Customer Items APIs ---------------------- //

module.exports = {
  getCustsItemFlsRvRtngsList
}
