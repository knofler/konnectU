/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var os = require('os');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

       socket.on('sendData',function(data){
      socket.broadcast.emit('chat',{srvmsg:data.msg})
     });

        function log() {
      var array = ['Message from server:'];
      array.push.apply(array, arguments);
      socket.emit('log', array);
      };
    socket.on('message', function(message) {
      log('Client said: ', message);
      // for a real app, would be room-only (not broadcast)
      socket.broadcast.emit('message', message);
     });
    socket.on('create or join', function(room) {
      log('Received request to create or join room ' + room);

      var numClients = socketio.sockets.sockets.length;
      log('Room ' + room + ' now has ' + numClients + ' client(s)');

      if (numClients === 1) {
        socket.join(room);
        log('Client ID ' + socket.id + ' created room ' + room);
        socket.emit('created', room, socket.id);

      } else if (numClients > 1 && numClients <10) {
        log('Client ID ' + socket.id + ' joined room ' + room);
        socketio.sockets.in(room).emit('join', room);
        socket.join(room);
        socket.emit('joined', room, socket.id);
        socketio.sockets.in(room).emit('ready');
      } else { // max two clients
        socket.emit('full', room);
      }
     });
    socket.on('ipaddr', function() {
      var ifaces = os.networkInterfaces();
      for (var dev in ifaces) {
        ifaces[dev].forEach(function(details) {
          if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
            socket.emit('ipaddr', details.address);
          }
        });
      }
     });
    socket.on('offerSend',function(data){
      socket.broadcast.emit('offerForAnswer',data);
    });
    socket.on('videoReady',function(data){
      socket.broadcast.emit('streamVideo',data);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};