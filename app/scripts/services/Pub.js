'use strict';

angular.module('adminApp')
    .factory('Pub', function($http, Server) {
        var pubUrl = Server.Url + 'ads/',
            pubApi = Server.Url + 'apiv1/ads/';

        var pubs = [{
            id: 0,
            img: 'http://placehold.it/750x250',
            vertical: 0,
            horizontal: 1,
        }, {
            id: 1,
            img: 'http://placehold.it/750x250',
            vertical: 0,
            horizontal: 1,
        }, {
            id: 2,
            img: 'http://placehold.it/250x750',
            vertical: 1,
            horizontal: 0,
        }, {
            id: 3,
            img: 'http://placehold.it/250x750',
            vertical: 1,
            horizontal: 0,
        }, {
            id: 4,
            img: 'http://placehold.it/750x250',
            vertical: 0,
            horizontal: 1,
        }, ];


        return {

            remove: function(img, callback) {
                $http.delete(pubApi + img.id + '/')
                    .then(callback, Server.errorHandler);
            },

            getPub: function(id) {
                if (!id && !angular.isNumber(id)) {
                    return pubs;
                }
                else {
                    return pubs.filter(function(el) {
                        return el.id === id;
                    });
                }
            },

            getCat: function(cat, callback) {
                $http.get(pubApi + '?category=' + cat)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            },

            save: function(image, ver, hor, sq, callback) {
                var formData = new FormData();
                formData.append('file', image);
                formData.append('vertical', ver);
                formData.append('horizontal', hor);
                formData.append('square', sq);
                $http({
                    url: pubUrl + 'save/',
                    method: 'POST',
                    data: formData,
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    },
                })
                    .then(function(res) {
                        pubs.push({
                            id: 10,
                            img: res.data,
                            vertical: ver,
                            horizontal: hor,
                            square: sq,
                        });
                        callback(res.data);
                    }, Server.errorHandler);
            },

        };
    });
