'use strict';

describe('Controller: SpeechCtrl', function () {

  // load the controller's module
  beforeEach(module('webrtcAppApp'));

  var SpeechCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpeechCtrl = $controller('SpeechCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
