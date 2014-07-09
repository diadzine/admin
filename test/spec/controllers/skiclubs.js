'use strict';

describe('Controller: SkiclubsCtrl', function () {

  // load the controller's module
  beforeEach(module('adminApp'));

  var SkiclubsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SkiclubsCtrl = $controller('SkiclubsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
