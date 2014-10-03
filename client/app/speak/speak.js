'use strict';

angular.module('webrtcAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speak', {
        url: '/speak',
        templateUrl: 'app/speak/speak.html',
        controller: 'SpeakCtrl'
      });
  });