'use strict';

describe('Controller: AdCtrl', function () {

  // load the controller's module
  beforeEach(module('adminApp'));

  var AdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdCtrl = $controller('AdCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
