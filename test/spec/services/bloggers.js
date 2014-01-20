'use strict';

describe('Service: Bloggers', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var Bloggers;
  beforeEach(inject(function (_Bloggers_) {
    Bloggers = _Bloggers_;
  }));

  it('should do something', function () {
    expect(!!Bloggers).toBe(true);
  });

});
