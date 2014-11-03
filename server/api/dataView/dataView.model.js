'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DataviewSchema = new Schema({
AppsName: String,
	AppDesc: String,
	Appversion: String,
	AppDependency: String,
	AppOwner: String,
	LicenseType: String,
	LicenseCount: Number,
	LicenseUsed: Number,
	Department: String,
	created:Date,
	AppScope: String,
	created_by:String,
	edited:Date,
	edited_by:String,
 	active: Boolean
});

module.exports = mongoose.model('Dataview', DataviewSchema);