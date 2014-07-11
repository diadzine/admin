'use strict';

angular.module('adminApp')
    .factory('Bloggers', function($http, Server) {
        var blogsUrl = Server.Url + 'blogs/bloggers/',
            blogsApi = Server.Url + 'apiv1/bloggers/',
            zip, unzip;

        zip = function(blogger) {
            blogger.ad = blogger.ad ? blogger.ad.join('|') : '';
            blogger.sponsors = blogger.sponsors ? blogger.sponsors.join(
                '|') : '';
            return blogger;
        };

        unzip = function(blogger) {
            blogger.ad = blogger.ad.split('|');
            blogger.sponsors = blogger.sponsors.split('|');
            return blogger;
        };

        return {
            getBlogger: function(callback, id) {
                var url = id ? blogsApi + id + '/' : blogsApi;
                $http.get(url)
                    .then(function(res) {
                        var data = res.data;
                        data = data.map(unzip);
                        callback(data);
                    }, Server.errorHandler);
            },

            delete: function(blogger, callback) {
                var url = blogsApi + blogger.id + '/';
                $http.delete(url)
                    .then(callback, Server.errorHandler);
            },

            save: function(blogger, callback) {
                var url = blogsApi + blogger.id + '/';
                blogger = zip(blogger);
                $http.put(url, blogger)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            },

            add: function(blogger, callback) {
                blogger = zip(blogger);
                $http.post(blogsApi, blogger)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            },

        };
    });
