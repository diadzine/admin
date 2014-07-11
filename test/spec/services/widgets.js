'use strict';

describe('Service: Widgets', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var Widgets;
  beforeEach(inject(function (_Widgets_) {
    Widgets = _Widgets_;
  }));

  it('should do something', function () {
    expect(!!Widgets).toBe(true);
  });

});
