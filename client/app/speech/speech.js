'use strict';

angular.module('webrtcAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speech', {
        url: '/speech',
        templateUrl: 'app/speech/speech.html',
        controller: 'SpeechCtrl'
      });
  });