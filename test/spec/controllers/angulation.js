'use strict';

describe('Controller: AngulationCtrl', function () {

  // load the controller's module
  beforeEach(module('adminApp'));

  var AngulationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AngulationCtrl = $controller('AngulationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
