'use strict';

angular.module('adminApp')
    .factory('BlogPosts', function($http, Server) {
        var bpApi = Server.Url + 'apiv1/bloggers/';

        return {
            get: function(blogId, callback) {
                var url = bpApi + blogId + '/posts/';
                $http.get(url)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler);
            },

            del: function(blogId, postId, callback) {
                var url = bpApi + blogId + '/posts/' + postId + '/';
                $http.delete(url)
                    .then(callback, Server.errorHandler);
            },

            add: function(blogId, post, callback) {
                var url = bpApi + blogId + '/posts/';
                $http.post(url, post)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler)
            },

            save: function(blogId, post, callback) {
                var url = bpApi + blogId + '/posts/' + post.id + '/';
                $http.put(url, post)
                    .then(function(res) {
                        callback(res.data);
                    }, Server.errorHandler)
            },

        };
    });
