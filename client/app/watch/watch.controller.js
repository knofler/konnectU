'use strict';

angular.module('webrtcAppApp')
  .controller('WatchCtrl', function ($scope) {

  	$scope.share= new SimpleWebRTC({});

  	$scope.share.shareScreen(function(err){
  		   // An error occured while sharing our screen
        if(err){
         
          console.log("error occured");
        }
        // Screen sharing worked, warn that everyone can see it
        else{
          peers.local.screenShared = true;
          $.notify(locale.EVERYONE_CAN_SEE_YOUR_SCREEN, 'info');
        }
      });

  });
