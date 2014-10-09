'use strict';

angular.module('webrtcAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('remoteCtrl', {
        url: '/remoteCtrl',
        templateUrl: 'app/remoteCtrl/remoteCtrl.html',
        controller: 'RemotectrlCtrl'
      });
  });