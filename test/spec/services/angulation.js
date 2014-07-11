'use strict';

describe('Service: Angulation', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var Angulation;
  beforeEach(inject(function (_Angulation_) {
    Angulation = _Angulation_;
  }));

  it('should do something', function () {
    expect(!!Angulation).toBe(true);
  });

});
