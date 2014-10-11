'use strict';

angular.module('webrtcAppApp')
  .controller('ChatCtrl', function ($scope) {
  
  var webrtc ;
  $scope.rootUrl = '192.168.1.129:9000/chat#' ;
  $scope.room = window.location.hash.substring(1);
  console.log($scope.room); 

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
  $scope.createRoom = function(){
    //grab chat room name
    var roomname = $("#chatName").val();
    if (roomname == ''){
      return;
    }
    $('#chatName').val('');
    var chatRoom = $scope.rootUrl + roomname;
    $('#url').html('<div class="gap"><p class="urlCtrl">Chat room url is : <a href="http://'+chatRoom+'" id="joinRoom">'+chatRoom+'</a></p></div>');
    console.log(chatRoom);

    $scope.initChat(roomname);
    $scope.createChat_window(roomname);
    // window.location.assign(chatRoom);
    
   };  
  $scope.joinRoom = function(){
    $('#chatJoinDiv').hide();  
    $scope.initChat($scope.room);
    $scope.createChat_window($scope.room);
   };  
  $scope.initChat = function(roomname){

    //Instantiate SimpleWebRTC without audio video element injection 
    webrtc = new SimpleWebRTC({autoRequestMedia: true });

    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
      webrtc.joinRoom(roomname);
     });

    webrtc.on('joinedRoom',function(){
      $('#connection').append('<li class="statusCtrl"> user has joined <span id="roomCss">'+ roomname+ '</span> </li>')
      console.log(roomname + ' room joined');
     });

    // Handle dataChannel messages (incoming)
    webrtc.on('channelMessage', function (peer, label, data){
      // One peer just sent a text chat message
      if (data.type == 'textChat'){
        $scope.newChatMessage(peer,data.payload);
       }
   });

    // Chat: send to other peers
  $scope.createChat_window = function(roomname){
    $('#chatPanel').html(' <div class="col-md-5">'+
        '<div class="panel panel-primary">'+
     
         '<!-- This is chat control panel -->'+
          '<div class="panel-heading">'+
              '<span class="glyphicon glyphicon-comment"></span> '+ roomname +
              '<div class="btn-group pull-right">'+
                  '<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">'+
                      '<span class="glyphicon glyphicon-chevron-down"></span>'+
                  '</button>'+
                  '<ul class="dropdown-menu slidedown">'+
                      '<li><a href="#"><span class="glyphicon glyphicon-refresh"></span>Refresh</a></li>'+
                      '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-ok-sign"></span>Available</a></li>'+
                      '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-remove"></span>Busy</a></li>'+
                      '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-time"></span>Away</a></li>'+
                      '<li class="divider"></li>'+
                      '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-off"></span>Sign Out</a></li>'+
                  '</ul>'+
              '</div>'+
              '</div>'+
          '<!-- This is Chat message display -->'+
          '<div class="panel-body">'+
              '<ul class="chat">'+
                  
              '</ul>'+
              '</div>'+
          '<!-- This is chat input  -->'+
          '<div class="panel-footer">'+ 
              '<form role="form" id="chatForm">'+
                '<div class="input-group">'+
                   '<input id="chatBox" form_id="chatForm"  type="text" class="form-control input-sm"'+ 
                    'placeholder="Type your message here..."/>'+
                  '<span class="input-group-btn">'+
                   '<button class="btn btn-warning btn-sm" type="submit" id="sendChat" data-toggle="tooltip" data-placement="bottom" title=""  data-original-title="Send the message" style="height: 34px;">send</button>'+
                  '</span>'+
                '</div>'+
             '</form>'+
              '</div>'+ 
       
       '</div>');
   };  
  $(document).on('submit','#chatForm',function (e){
    e.preventDefault();
     if ($('#chatBox').val()){
      webrtc.sendDirectlyToAll('vroom', 'textChat', $('#chatBox').val());
       // Local echo of our own message
       $scope.newChatMessage('local',$('#chatBox').val());
       }
     $('#chatBox').val('');
     });
    };
  $(document).on('click','#joinRoom',function(e){
    e.preventDefault();
    var roomname = window.location.hash.substring(1);
    // window.location.assign(chatRoom);
    });

  if ($scope.room !== '') {
      $scope.joinRoom();
   };
});
 

  

