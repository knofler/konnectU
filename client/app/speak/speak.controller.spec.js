'use strict';

describe('Controller: SpeakCtrl', function () {

  // load the controller's module
  beforeEach(module('webrtcAppApp'));

  var SpeakCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpeakCtrl = $controller('SpeakCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
