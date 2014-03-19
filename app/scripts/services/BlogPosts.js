'use strict';

angular.module('adminApp')
    .factory('BlogPosts', function($http, Server) {
        var posts = [],
            postsUrl = Server.Url + 'blogs/posts/';

        var loadBlogPosts;

        loadBlogPosts = function(callback, blogId, id) {
            var url = postsUrl + 'blog/?blogId=' + blogId;
            url = id ? url + '&id=' + id : url;
            $http.get(url, {
                cache: 'true'
            })
                .success(function(response) {
                    var iter, filter;
                    var processed = Server.processResponse(response);

                    if (!posts[blogId]) {
                        posts[blogId] = [];
                    }

                    for (iter = 0; iter < processed.length; iter++) {
                        filter = posts[blogId].some(function(el) {
                            return JSON.stringify(el) === JSON.stringify(
                                processed[iter]);
                        });
                        if (!filter) {
                            posts[blogId].push(processed[iter]);
                        }
                    }
                    processed = processed.length > 1 ? processed :
                        processed[0];
                    callback(processed);
                })
                .error(Server.errorHandler);
        };

        return {
            delete: function(postId, blogId) {
                var iter, selected = [];
                for (iter = 0; iter < posts.length; iter++) {
                    if (posts[iter].blogId === blogId) {
                        if (posts[iter].id === postId) {
                            posts.splice(iter, 1);
                            iter--;
                        }
                        else {
                            selected.push(posts[iter]);
                        }
                    }
                }
                return selected;
            },

            save: function(post) {
                var iter;
                if (post.id || angular.isNumber(post.id)) {
                    for (iter = 0; iter < posts.length; iter++) {
                        if (posts[iter].id === post.id) {
                            posts[iter] = post;
                            return true;
                        }
                    }
                }
                else {
                    post.id = posts.length;
                    posts.push(post);
                    return true;
                }
                return false;
            },

            getPosts: function(callback, blogId, id) {
                var getPosts;
                debugger;
                if (!posts[blogId] || posts[blogId].length < 1) {
                    getPosts = this.getPosts;
                    loadBlogPosts(function() {
                        getPosts(callback, blogId, id);
                    }, blogId, id);
                }
                else {
                    if (id && angular.isNumber(id)) {
                        var post = posts[blogId].filter(function(el) {
                            return el.id === parseInt(id);
                        });
                        post = post[0] ? post[0] : {};
                        callback(post);
                    }
                    else {
                        callback(posts[blogId]);
                    }
                }
            },

        };
    });