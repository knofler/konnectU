'use strict';

describe('Controller: ListenCtrl', function () {

  // load the controller's module
  beforeEach(module('webrtcAppApp'));

  var ListenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListenCtrl = $controller('ListenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
