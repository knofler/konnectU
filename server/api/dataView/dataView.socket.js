/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dataview = require('./dataView.model');

exports.register = function(socket) {
  Dataview.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dataview.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dataView:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dataView:remove', doc);
}