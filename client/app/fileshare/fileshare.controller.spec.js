'use strict';

describe('Controller: FileshareCtrl', function () {

  // load the controller's module
  beforeEach(module('webrtcAppApp'));

  var FileshareCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FileshareCtrl = $controller('FileshareCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
