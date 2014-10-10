'use strict';

angular.module('webrtcAppApp')
  .controller('ChatCtrl', function ($scope) {
  
  //Instantiate SimpleWebRTC without audio video element injection 
  var webrtc = new SimpleWebRTC({autoRequestMedia: true });

  // we have to wait until it's ready
  webrtc.on('readyToCall', function () {
    
    // you can name it anything
    webrtc.joinRoom('your awesome room name');

    });

  // Add a new message to the chat history
  $scope.newChatMessage = function (from,message){
    if (from == "local"){
      $('.chat').append('<li class="right clearfix"><span class="chat-img pull-right">'+
                  '<img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />'+
              '</span>'+
                  '<div class="chat-body clearfix">'+
                      '<div class="header" id="localChat">'+
                          '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>{{}} ago</small>'+
                          '<strong class="pull-right primary-font">{{}}</strong>'+
                      '</div>'+
                      '<p>' + message + '</p>'+
                  '</div>'+
              '</li>');
      }
      else{
        $('.chat').append('<li class="left clearfix">'+
              '<span class="chat-img pull-left">'+
                  '<img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />'+
              '</span>'+
                  '<div class="chat-body clearfix">'+
                      '<div class="header" id="remoteChat">'+
                          '<strong class="primary-font">{{}}</strong> <small class="pull-right text-muted">'+
                              '<span class="glyphicon glyphicon-time"></span>{{ }} ago</small>'+
                      '</div>'+  
                      '<p>' + message + '</p>'+
                  '</div>'+
              '</li>');
      }
      // Move the scroller down
      $('.panel-body').scrollTop($('.panel-body').prop('scrollHeight'));
      // console.log("the msg is from " + from + " and the message is " + message ); 
    };

  // Handle dataChannel messages (incoming)
  webrtc.on('channelMessage', function (peer, label, data){
    // One peer just sent a text chat message
    if (data.type == 'textChat'){
      $scope.newChatMessage(peer,data.payload);
     }
    });

  // Chat: send to other peers
  $('#chatForm').submit(function (e){
    e.preventDefault();
    if ($('#chatBox').val()){
      webrtc.sendDirectlyToAll('vroom', 'textChat', $('#chatBox').val());
      // Local echo of our own message
      $scope.newChatMessage('local',$('#chatBox').val());
     }
    $('#chatBox').val('');
    });
  });

