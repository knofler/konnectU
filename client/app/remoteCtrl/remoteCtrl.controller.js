'use strict';

angular.module('webrtcAppApp')
  .controller('RemotectrlCtrl', function ($scope) {

  var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remotesVideos',
    // immediately ask for camera access
    autoRequestMedia: true
    });

    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
    
    // you can name it anything
    webrtc.joinRoom('your awesome room name');
    });
 
    webrtc.on('joinedRoom', function () {
    console.log("client joined  room");
});
  

  var screen = new Screen();
   

  // get shared screens
  screen.onaddstream = function(e) {
      document.body.appendChild(e.video);
  };

  // custom signaling channel
  // you can use each and every signaling channel
  // any websocket, socket.io, or XHR implementation
  // any SIP server
  // anything! etc.
  // screen.openSignalingChannel = function(callback) {
  //     return io.connect().on('message', callback);
  // };

  // check pre-shared screens
  // it is useful to auto-view
  // or search pre-shared screens
  // screen.check();

  document.getElementById('share-screen').onclick = function() {
      screen.share();
  };

  // to stop sharing screen
  // screen.leave();



  });
