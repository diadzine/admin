'use strict';

describe('Controller: ClassementsCtrl', function () {

  // load the controller's module
  beforeEach(module('adminApp'));

  var ClassementsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassementsCtrl = $controller('ClassementsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
