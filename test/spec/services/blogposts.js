'use strict';

describe('Service: BlogPosts', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var BlogPosts;
  beforeEach(inject(function (_BlogPosts_) {
    BlogPosts = _BlogPosts_;
  }));

  it('should do something', function () {
    expect(!!BlogPosts).toBe(true);
  });

});
