'use strict';

describe('Controller: StreamCtrl', function () {

  // load the controller's module
  beforeEach(module('webrtcAppApp'));

  var StreamCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StreamCtrl = $controller('StreamCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
