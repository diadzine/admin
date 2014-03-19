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
            delete: function(callback, postId, blogId) {
                var deleteUrl = postsUrl + 'delete/?id=' + blogId;
                $http.get(deleteUrl)
                    .success(function(response) {
                        var iter;
                        if (parseInt(response) === 0) {
                            return alert('Suppression a échoué.');
                        }
                        for (iter = 0; iter < posts[blogId].length; iter++) {
                            if (posts[blogId][iter].id === blogId) {
                                posts[blogId].splice(iter, 1);
                                break;
                            }
                        }
                        callback(posts[blogId]);

                    })
                    .error(Server.errorHandler);
            },

            save: function(callback, post) {
                debugger;
                var iter,
                    saveUrl = postsUrl + 'save/',
                    save = this.save,
                    id = post.id || 0,
                    data;
                post.id = id;
                data = jQuery.param(post);

                $http({
                    method: 'POST',
                    url: saveUrl,
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                })
                    .success(function(response) {
                        if (parseInt(response) === 0) {
                            return alert(
                                'Vous êtes déconnecter. Veuillez vous reconnecter pour sauver la News.'
                            );
                        }
                        var saved = Server.processResponse(response)[0];
                        if (id && angular.isNumber(id)) {
                            for (iter = 0; iter < posts[post.blogId].length; iter++) {
                                if (posts[post.blogId][iter].id === id) {
                                    posts[post.blogId][iter] = saved;
                                    break;
                                }
                            }
                        }
                        else {
                            posts[post.blogId].push(saved);
                        }
                        callback(saved);
                    })
                    .error(Server.errorHandler);
            },

            getPosts: function(callback, blogId, id) {
                var getPosts;
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