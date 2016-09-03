'use strict';

angular.module('adminApp')
    .factory('Widgets', ['$http', 'Server',
        function($http, Server) {
            var widgetApi = Server.Url + 'apiv1/widgets/';
            return {
                get: function(callback) {
                    $http.get(widgetApi)
                        .then(function(res) {
                            callback(res.data);
                        }, Server.errorHandler);
                },

                save: function(id, content, name, callback) {
                    var url = widgetApi + id + '/',
                        d = {
                            content: content,
                            name: name,
                        };
                    $http.put(url, d)
                        .then(function(res) {
                            callback(res.data);
                        }, Server.errorHandler);
                }
            };
        }
    ]);
