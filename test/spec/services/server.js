'use strict';

describe('Service: Server', function() {

    // load the service's module
    beforeEach(module('adminApp'));

    // instantiate service
    var Server;
    beforeEach(inject(function(_Server_) {
        Server = _Server_;
    }));

    it('should do something', function() {
        expect( !! Server)
            .toBe(true);
    });

    it('should have a string parameter Url', function() {
        expect(typeof Server.Url)
            .toBe('string');
    });

    it('should have a working error handler', function() {
        expect(typeof Server.errorHandler)
            .toBe('function');
    });

    it('should correctly process responses from the server', function() {
        var response = [{
            "pk": 1,
            "model": "blogs.bloggers",
            "fields": {
                "ad": "",
                "sponsors": "",
                "linkResults": "",
                "date": "2014-03-19T06:37:32Z",
                "profilePic": "",
                "biography": "Le premier blog de Tooski; sa mascotte !",
                "name": "Ursi"
            }
        }],
            processed = [{
                "id": 1,
                "ad": "",
                "sponsors": "",
                "linkResults": "",
                "date": 1395211052000,
                "profilePic": "",
                "biography": "Le premier blog de Tooski; sa mascotte !",
                "name": "Ursi"
            }];

        expect(typeof Server.processResponse)
            .toBe('function');

        expect(Server.processResponse(response))
            .toEqual(processed);
    });

});