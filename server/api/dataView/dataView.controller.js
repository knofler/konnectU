'use strict';

var _ = require('lodash');
var Dataview = require('./dataView.model');

// Get list of dataViews
exports.index = function(req, res) {
  Dataview.find(function (err, dataViews) {
    if(err) { return handleError(res, err); }
    return res.json(200, dataViews);
  });
};

// Get a single dataView
exports.show = function(req, res) {
  Dataview.findById(req.params.id, function (err, dataView) {
    if(err) { return handleError(res, err); }
    if(!dataView) { return res.send(404); }
    return res.json(dataView);
  });
};

// Creates a new dataView in the DB.
exports.create = function(req, res) {
  Dataview.create(req.body, function(err, dataView) {
    if(err) { return handleError(res, err); }
    return res.json(201, dataView);
  });
};

// Updates an existing dataView in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dataview.findById(req.params.id, function (err, dataView) {
    if (err) { return handleError(res, err); }
    if(!dataView) { return res.send(404); }
    var updated = _.merge(dataView, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dataView);
    });
  });
};

// Deletes a dataView from the DB.
exports.destroy = function(req, res) {
  Dataview.findById(req.params.id, function (err, dataView) {
    if(err) { return handleError(res, err); }
    if(!dataView) { return res.send(404); }
    dataView.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}