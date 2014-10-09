'use strict';

describe('Controller: RemotectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('webrtcAppApp'));

  var RemotectrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RemotectrlCtrl = $controller('RemotectrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
