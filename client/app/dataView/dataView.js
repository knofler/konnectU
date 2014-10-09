'use strict';

angular.module('webrtcAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dataView', {
        url: '/dataView',
        templateUrl: 'app/dataView/dataView.html',
        controller: 'DataviewCtrl'
      });
  });