'use strict';

angular.module('webrtcAppApp')
  .controller('ChatCtrl', function ($scope) {
   
   	$scope.chat = new SimpleWebRTC({
 // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remotesVideos',
    // immediately ask for camera access
    autoRequestMedia: true
   		});
   	console.log($scope.chat);

   	// $scope.chat.dataChannel = false;
  });
