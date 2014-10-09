'use strict';

angular.module('webrtcAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('listen', {
        url: '/listen',
        templateUrl: 'app/listen/listen.html',
        controller: 'ListenCtrl'
      });
  });