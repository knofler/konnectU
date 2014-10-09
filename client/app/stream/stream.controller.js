'use strict';

angular.module('webrtcAppApp')
  .controller('StreamCtrl', function ($scope) {
 
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
  // webrtc.sendDirectlyToAll("text chat", "chat", "hello sydney");
  console.log("client joined  room");
});
  });
