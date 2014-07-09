'use strict';

angular.module('adminApp')
    .factory('Skiclubs', function(Server, $http) {
        var scApi = Server.Url + 'apiv1/skiclubs/';

        return {
            get: function(callback) {
                $http.get(scApi)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            },

            add: function(title, latitude, longitude, contact, description,
                callback) {
                var d = {
                    title: title,
                    latitude: latitude,
                    longitude: longitude,
                    contact: contact,
                    description: description,
                };

                $http.post(scApi, d)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            },

            save: function(id, title, latitude, longitude, contact,
                description, callback) {
                var url = scApi + id + '/',
                    d = {
                        title: title,
                        latitude: latitude,
                        longitude: longitude,
                        contact: contact,
                        description: description,
                    };
                $http.put(url, d)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);

            },

            del: function(id, callback) {
                var url = scApi + id + '/';
                $http.delete(url)
                    .then(callback, Server.errorHandler);
            },

        };
    });
