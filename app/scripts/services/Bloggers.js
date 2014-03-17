'use strict';

angular.module('adminApp')
    .factory('Bloggers', function($http, Server) {
        var blogs = [],
            blogsUrl = Server.Url + 'blogs/bloggers/';
        var loadBloggers;

        loadBloggers = function(callback, id) {
            var url = blogsUrl + (id ? '?id=' + id : '');
            $http.get(url, {
                cache: 'true'
            })
                .success(function(response) {
                    var iter, filter;
                    var processed = Server.processResponse(response);
                    processed = processed.map(function(el) {
                        el.ad = el.ad.split('|');
                        el.sponsors = el.sponsors.split('|');
                        return el;
                    });

                    for (iter = 0; iter < processed.length; iter++) {
                        filter = blogs.some(function(el) {
                            return JSON.stringify(el) === JSON.stringify(
                                processed[iter]);
                        });
                        if (!filter) {
                            blogs.push(processed[iter]);
                        }
                    }
                    processed = processed.length > 1 ? processed :
                        processed[0];
                    callback(processed);
                })
                .error(Server.errorHandler);
        };


        return {
            getBlogger: function(callback, id) {
                var getBlogger;
                if (blogs.length < 1) {
                    getBlogger = this.getBlogger;
                    loadBloggers(function() {
                        getBlogger(callback, id);
                    });
                }
                else {
                    if (id && angular.isNumber(id)) {
                        var blogger = blogs.filter(function(el) {
                            return el.id === parseInt(id);
                        });
                        blogger = blogger[0] ? blogger[0] : {};
                        callback(blogger);
                    }
                    else {
                        callback(blogs);
                    }
                }
            },

            delete: function(callback, blogger) {
                var id = blogger.id,
                    deleteUrl = blogsUrl + 'delete/?id=' + id;
                $http.get(deleteUrl)
                    .success(function(response) {
                        if (parseInt(response) === 0) {
                            return alert(
                                'La suppression a échoué du coté serveur.'
                            );
                        }
                        var iter;
                        for (iter = 0; iter < blogs.length; iter++) {
                            if (blogs[iter].id === id) {
                                blogs.splice(iter, 1);
                                break;
                            }
                        }
                        callback(blogs);

                    })
                    .error(Server.errorHandler);
            },

            save: function(id, blogger) {
                var iter;
                if (id || angular.isNumber(id)) {
                    for (iter = 0; iter < bloggers.length; iter++) {
                        if (bloggers[iter].id === id) {
                            bloggers[iter] = blogger;
                            return bloggers[iter];
                        }
                    }
                }
                else {
                    /*
                     * TODO:
                     * Don't sync with server here. Instead do it when user clicks on "Enregistrer",
                     * and then adjust the page id. (page.length is buggy)
                     */
                    var id = bloggers.length,
                        blogger = {
                            id: id,
                            name: 'Nouveau Blog',
                            linkResults: '',
                            profilePic: '',
                            biography: '',
                            sponsors: [],
                            ad: []
                        };
                    bloggers.push(blogger);
                    return blogger;
                }

            },

        };
    });