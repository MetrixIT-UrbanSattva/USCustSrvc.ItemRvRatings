/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection, {useUnifiedTopology: true, useNewUrlParser: true});
const Schema = mongoose.Schema;

// --- Begin: Customers Item Review Ratings Closed Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  citdc: {type: String, required: true}, // ref: config.collCustsItemDtlsClsd: Customers Item Details Closed - Record ID

  vndrOrg: {type: String, required: true}, // ref: config.collVndrsOrgs: VNDR0001
  item: {type: String, required: true}, // ref: config.collVndrsOrgsItems
  itemCode: {type: String, required: true},
  voItem: {type: String, required: true}, // ref: config.collVndrsOrgsItemsUnits
  voiCode: {type: String, required: true}, // Vendor Organizations Item Code

  // --- Start: For Future Purpose --- //
  uId: {type: String, required: false}, // ref: config.collCustsUsrs
  pName: {type: String, required: false}, // Purti Peru - Full Name
  mName: {type: String, required: false}, // Muddu Name - Short Name
  uipath: {type: String, required: false}, // User Icon Path
  mobCcNum: {type: String, required: false}, // Mobile Number with Country Code
  emID: {type: String, required: false}, // Email ID
  refUID: {type: String, required: false}, // Reference Unique ID
  // --- End: For Future Purpose --- //

  so: {type: String, required: false}, // Sales Order: ref: config.collCustsSalesOrders
  soCode: {type: String, required: false}, // Sales Order Code
  soGrp: {type: String, required: false}, // Sales Order: ref: config.collCustsSOGrps
  soGrpCode: {type: String, required: false}, // Sales Order Group Code
  soItem: {type: String, required: false}, // Sales Order Item: ref: config.collCustsSOItems
  soiCode: {type: String, required: false}, // Sales Order Item Code

  rating: {type: Number, required: true},
  hCount: {type: Number, default: 0}, // Helpfull Count
  lCount: {type: Number, default: 0}, // Likes Count
  dlCount: {type: Number, default: 0}, // Dis Likes Count
  isReview: {type: Boolean, default: false},
  reviewTitle: {type: String, required: false},
  review: {type: String, required: false},
  fPaths: {type: [String], required: false}, // File Paths
  hoda: {type: String, required: true}, // Sale to Customer Status: Created, Active, Inactive, Removed

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuRakam: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cUserName: {type: String, required: true}, // Created Users.pName
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  cDtNum: {type: Number, required: true}, // Date & Time Number
  uuRakam: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uUserName: {type: String, required: true}, // Updated Users.pName
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uDtNum: {type: Number, required: true}, // Date & Time Number
}, {collection: config.collCustsItemRvRtngsClsd});

schema.index({vndrOrg: 1, citdc: 1, uId: 1, so: 1, soItem: 1}, {unique: true});
schema.index({delFlag: 1, voiCode: 1, soiCode: 1, hoda: 1, isReview: 1});

module.exports = mongoose.model(config.collCustsItemRvRtngsClsd, schema);
// --- End: Customers Item Review Ratings Closed Schema --- //
