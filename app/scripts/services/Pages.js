'use strict';

angular.module('adminApp')
    .factory('Pages', ['$http', 'Server',
        function($http, Server) {

            var pageUrl = Server.Url + 'pages/',
                pageApi = Server.Url + 'apiv1/pages/';

            return {
                getPage: function(callback, id) {
                    var url = id ? pageApi + id + '/' : pageApi;
                    $http.get(url)
                        .then(function(res) {
                            callback(res.data);
                        }, Server.errorHandler);
                },

                delete: function(id, callback) {
                    var url = pageApi + id + '/';
                    $http.delete(url)
                        .then(callback, Server.errorHandler);
                },

                add: function(page, callback) {
                    var url = pageApi;
                    $http.post(url, page)
                        .then(function(res) {
                            callback(res.data);
                        }, Server.errorHandler);
                },

                save: function(page, callback) {
                    var url = pageApi + page.id + '/';
                    $http.put(url, page)
                        .then(function(res) {
                            callback(res.data);
                        }, Server.errorHandler);
                },

            };
        }
    ]);
