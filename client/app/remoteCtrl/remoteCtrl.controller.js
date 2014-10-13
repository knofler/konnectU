'use strict';

angular.module('webrtcAppApp')
  .controller('RemotectrlCtrl', function ($scope) {
    
    //Instantiate SimpleWebRTC without audio video element injection 
    var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remotesVideos',
    // immediately ask for camera access
    autoRequestMedia: true
    });

    console.log(webrtc);
    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
      
     });

    webrtc.on('joinedRoom',function(){
      
     });

    // Handle dataChannel messages (incoming)
    webrtc.on('channelMessage', function (peer, label, data){
     
 });


  // the peers and their info. Init with our own info
  var peers = {
    local: {
      screenShared: false,
      micMuted: false,
      videoPaused: false,
      displayName: '',
      role: 'participant',
      hasVideo: true
    }
  };


// ScreenSharing
  $('#shareScreenButton').change(function() {
    // var action = ($(this).is(":checked")) ? 'share':'unshare';
    function cantShare(err){
      $.notify(err, 'error');
      return;
    }
    if (!peers.local.screenShared){
      webrtc.shareScreen(function(err){
        // An error occured while sharing our screen
        if(err){
          if (err.name == 'EXTENSION_UNAVAILABLE'){
            var ver = 34;
            if ($.browser.linux){
              ver = 35;
            }
            if ($.browser.webkit && $.browser.versionNumber >= ver){
              $('#chromeExtMessage').modal('show');
            }
            else{
              // cantShare(locale.SCREEN_SHARING_ONLY_FOR_CHROME);
            }
          }
          // This error usually means you have denied access (old flag way)
          // or you cancelled screen sharing (new extension way)
          else if (err.name == 'PERMISSION_DENIED' || err.name == 'PermissionDeniedError'){
            cantShare(locale.SCREEN_SHARING_CANCELLED);
          }
          else{
            // cantShare(locale.CANT_SHARE_SCREEN);
          }
          $('#shareScreenLabel').removeClass('active');
          return;
        }
        // Screen sharing worked, warn that everyone can see it
        else{
          $("#shareScreenLabel").addClass('btn-danger');
          peers.local.screenShared = true;
          console.log(webrtc);
          $.notify(locale.EVERYONE_CAN_SEE_YOUR_SCREEN, 'info');
        }
      });
    }
    else{
      peers.local.screenShared = false;
      webrtc.stopScreenShare();
      $('#shareScreenLabel').removeClass('btn-danger');
      // $.notify(locale.SCREEN_UNSHARED, 'info');
    }
  });




  });
