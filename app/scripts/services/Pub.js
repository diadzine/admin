'use strict';

angular.module('adminApp')
    .factory('Pub', function($http, Server) {
        var pubUrl = Server.Url + 'ads/',
            pubApi = Server.Url + 'apiv1/ads/';

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
                        callback(res.data);
                    }, Server.errorHandler);
            },

            modify: function(image, callback) {
                var url = pubApi + image.id + '/'
                $http.put(url, image)
                    .then(function(res) {
                        callback(res.data);
                    });
            },

        };
    }).factory('AdPlaceholder', function($http, Server) {
        var pubApi = Server.Url + 'apiv1/ads/placeholders/';

        return {

            getAdsPlaceholders: function(callback) {
                $http.get(pubApi)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            }

        };
    });
