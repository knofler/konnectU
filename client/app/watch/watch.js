'use strict';

angular.module('webrtcAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('watch', {
        url: '/watch',
        templateUrl: 'app/watch/watch.html',
        controller: 'WatchCtrl'
      });
  });