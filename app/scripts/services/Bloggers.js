'use strict';

angular.module('adminApp')
    .factory('Bloggers', function($http, Server) {
        var blogs = [],
            blogsUrl = Server.Url + 'blogs/bloggers/',
            blogsApi = Server.Url + 'apiv1/bloggers/';
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
                var url = id ? blogsApi + id + '/' : blogsApi;
                $http.get(url)
                    .then(function(res) {
                        var data = res.data;
                        data = data.map(function(el) {
                            el.ad = el.ad.split('|');
                            el.sponsors = el.sponsors.split('|');
                            return el;
                        });
                        callback(data);
                    }, Server.errorHandler);
            },

            delete: function(callback, blogger) {
                var url = blogsApi + blogger.id + '/';
                $http.delete(url)
                    .then(callback, Server.errorHandler);
            },

            save: function(callback, id, blogger) {
                var iter,
                    saveUrl = blogsUrl + 'save/',
                    save = this.save,
                    id = id || 0,
                    data;
                blogger.id = id;
                blogger.ad = blogger.ad ? blogger.ad.join('|') : '';
                blogger.sponsors = blogger.sponsors ? blogger.sponsors.join(
                    '|') : '';
                data = jQuery.param(blogger);

                var method = id === 0 ? 'post' : 'put',
                    url = id === 0 ? blogsApi : blogsApi + id + '/';
                $http[method](url, blogger)
                    .then(function(res) {
                        var data = res.data;
                        data = data.map(function(el) {
                            el.ad = el.ad.split('|');
                            el.sponsors = el.sponsors.split('|');
                            return el;
                        });
                        callback(data);
                    }, Server.errorHandler);

                // $http({
                //     method: 'POST',
                //     url: saveUrl,
                //     data: data,
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                //     },
                // })
                //     .success(function(response) {
                //         if (parseInt(response) === 0) {
                //             return alert(
                //                 'Vous êtes déconnecter. Veuillez vous reconnecter pour sauver la News.'
                //             );
                //         }
                //         var saved = Server.processResponse(response)[0];
                //         if (id && angular.isNumber(id)) {
                //             for (iter = 0; iter < news.length; iter++) {
                //                 if (blogs[iter].id === id) {
                //                     blogs[iter] = saved;
                //                     break;
                //                 }
                //             }
                //         }
                //         else {
                //             blogs.push(saved);
                //         }
                //         callback(saved);
                //     })
                //     .error(Server.errorHandler);
            },

        };
    });
