'use strict';

angular.module('webrtcAppApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {'title': 'Home','link': '/'},
    {'title': 'Chat','link': '/chat'},
    {'title': 'Speech','link': '/speech'},
    {'title': 'Speak','link': '/speak'},
    {'title': 'Stream','link': '/stream'}
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });