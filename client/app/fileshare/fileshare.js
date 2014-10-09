'use strict';

angular.module('webrtcAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fileshare', {
        url: '/fileshare',
        templateUrl: 'app/fileshare/fileshare.html',
        controller: 'FileshareCtrl'
      });
  });