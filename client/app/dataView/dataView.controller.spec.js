'use strict';

describe('Controller: DataviewCtrl', function () {

  // load the controller's module
  beforeEach(module('webrtcAppApp'));

  var DataviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataviewCtrl = $controller('DataviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
