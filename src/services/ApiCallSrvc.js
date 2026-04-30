/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */


var axios = require('axios');
var config = require('config');

const adminItmRvwRtng = (data, kmvcatoken) => {
  const headers = { headers: { kmvcatoken } };
  axios.post(config.apivcitemrvrtngsDomain + 'kmva/user/myorders/item/rating', data, headers)
   .then((res) => {}).catch((err) => { });
};

const adminItmRvwRtngUpd = (data, kmvcatoken) => {
  const headers = { headers: { kmvcatoken } };
  axios.put(config.apivcitemrvrtngsDomain +'kmva/user/myorders/item/rating/update', data, headers)
   .then((res) => {}).catch((err) => { });
};

const vcItmRvwRtngUpd = (data, kmvcatoken) => {
  const headers = { headers: { kmvcatoken } };
  axios.post(config.apimyordersDomain + 'kmvcd/user/myorders/order/item/update/rating', data, headers)
  .then((res) => {}).catch((err) => { });
};

const updateCustsItemRvRtngsLikesCount = (data, kmvcatoken) => {
  const headers = { headers: { kmvcatoken } };
  axios.put(config.apivcitemrvrtngsDomain + 'kmva/custs/item/rvrtngs/likes/count/update', data, headers)
  .then((res) => {}).catch((err) => { });
}

const setApiItemsRating = (data, kmvcatoken) => {
  const headers = { headers: { kmvcatoken } };
  axios.put(config.apiitemsDomain + 'kmvc/voitems/update/item/review/ratings', data, headers)
  .then((res) => {}).catch((err) => { });
};

module.exports = {
  adminItmRvwRtng, vcItmRvwRtngUpd,
  adminItmRvwRtngUpd, updateCustsItemRvRtngsLikesCount, setApiItemsRating
}

