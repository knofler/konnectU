'use strict';

angular.module('webrtcAppApp')
  .controller('ChatCtrl', function ($scope) {
   
    var webrtc = new SimpleWebRTC({
    autoRequestMedia: true
    });

    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
    // you can name it anything
    webrtc.joinRoom('your awesome room name');
    });

      // Add a new message to the chat history
  function newChatMessage(from,message){
    console.log("the msg is from " + from + " and the message is " + message ); 
  }


    // Handle dataChannel messages (incoming)
  webrtc.on('channelMessage', function (peer, label, data){
    // One peer just sent a text chat message
    if (data.type == 'textChat'){
      newChatMessage(peer,data.payload);
    }
  });


  // Chat: send to other peers
  $('#chatForm').submit(function (e){
    e.preventDefault();
    if ($('#chatBox').val()){
      webrtc.sendDirectlyToAll('vroom', 'textChat', $('#chatBox').val());
      // Local echo of our own message
      // newChatMessage('local',$('#chatBox').val());
    }
  });

  });

