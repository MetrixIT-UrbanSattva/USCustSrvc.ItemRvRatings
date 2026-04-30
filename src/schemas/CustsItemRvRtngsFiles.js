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

// --- Begin: Customers Item Review Ratings Files Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  cirr: {type: String, required: true, ref: config.collCustsItemRvRtngs},
  citd: {type: String, required: true}, // ref: config.collCustsItemDtls: Customers Item Details - Record ID

  vndrOrg: {type: String, required: true}, // ref: config.collVndrsOrgs: VNDR0001
  item: {type: String, required: true}, // ref: config.collVndrsOrgsItems
  itemCode: {type: String, required: true},
  voItem: {type: String, required: true}, // ref: config.collVndrsOrgsItemsUnits
  voiCode: {type: String, required: true}, // Vendor Organizations Item Code

  so: {type: String, required: false}, // Sales Order: ref: config.collCustsSalesOrders
  soCode: {type: String, required: false}, // Sales Order Code
  soGrp: {type: String, required: false}, // Sales Order: ref: config.collCustsSOGrps
  soGrpCode: {type: String, required: false}, // Sales Order Group Code
  soItem: {type: String, required: false}, // Sales Order Item: ref: config.collCustsSOItems
  soiCode: {type: String, required: false}, // Sales Order Item Code

  rakam: {type: String, required: true}, // Type: Image, Video
  fSeq: {type: Number, default: 0}, // File Sequence: 1 Star, 2 Star, 3 Star, 4 Star, 5 Star
  fdt: {type: String, required: true}, // File for Device Type: Desktop, Mobile, Tab, All
  dispName: {type: String, required: false, trim: true},
  name: {type: String, required: true},
  path: {type: String, required: true},
  hoda: {type: String, required: true}, // Sale to Customer Status: Active, Inactive, Removed

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
});

schema.index({vndrOrg: 1, cirr: 1, citd: 1, path: 1}, {unique: true});
schema.index({delFlag: -1, voiCode: 1, soiCode: 1, hoda: 1});
schema.index({cDtNum: -1, uDtNum: -1, fSeq: -1});

module.exports = mongoose.model(config.collCustsItemRvRtngsFiles, schema);
// --- End: Customers Item Review Ratings Files Schema --- //
