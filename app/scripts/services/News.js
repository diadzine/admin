'use strict';

angular.module('adminApp')
    .factory('News', function($http, Server) {

        var newsUrl = Server.Url + 'news/',
            newsApi = Server.Url + 'apiv1/news_admin/';

        return {
            get: function(callback, page) {
                var url = page ? newsApi + '?page=' + page : newsApi;
                $http.get(url)
                    .then(function(res) {
                        callback(res.data.results);
                    }, Server.errorHandler);
            },

            delete: function(id, callback) {
                var url = newsApi + id + '/';
                $http.delete(url)
                    .then(callback, Server.errorHandler);
            },

            save: function(news, callback) {
                var url = newsApi + news.id + '/';
                $http.put(url, news)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            },

            add: function(news, callback) {
                var url = newsApi;
                $http.post(url, news)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            },

        };
    });
