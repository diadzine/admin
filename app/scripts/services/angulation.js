'use strict';

angular.module('adminApp')
    .factory('Angulation', ['$http', 'Server',
        function($http, Server) {
            var ngApi = Server.Url + 'apiv1/angulation/';

            // Public API here
            return {
                getCovers: function(callback) {
                    var url = ngApi + 'covers/';
                    $http.get(url)
                        .then(function(res) {
                            callback(res.data);
                        }, Server.errorHandler);
                },

                delCover: function(id, callback) {
                    var url = ngApi + 'covers/' + id + '/';
                    $http.delete(url)
                        .then(function(res) {
                            callback();
                        }, Server.errorHandler);

                },

                addCover: function(img, callback) {
                    var url = ngApi + 'covers/',
                        d = {
                            url: img,
                        };
                    $http.post(url, d)
                        .then(function(res) {
                            callback(res.data);
                        }, Server.errorHandler);
                },
            };
        }
    ]);
