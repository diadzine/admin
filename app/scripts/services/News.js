'use strict';

angular.module('adminApp')
    .factory('News', function($http, Server) {
        var news = [];

        var newsUrl = Server.Url + 'news/';
        var loadNews;

        loadNews = function(callback, id) {
            var url = newsUrl + (id ? '?id=' + id : '');

            $http.get(url, {
                cache: 'true'
            })
                .success(function(response) {
                    var iter, filter;
                    var processed = Server.processResponse(response);
                    for (iter = 0; iter < processed.length; iter++) {
                        filter = news.some(function(el) {
                            return JSON.stringify(el) === JSON.stringify(
                                processed[iter]);
                        });
                        if (!filter) {
                            news.push(processed[iter]);
                        }
                    }
                    processed = processed.length > 1 ? processed :
                        processed[0];
                    callback(processed);
                })
                .error(Server.errorHandler);
        };


        return {
            getNews: function(callback, id) {
                var current;
                if (id || angular.isNumber(id)) {
                    current = news.filter(function(el) {
                        return el.id === id;
                    })[0];
                    if (typeof current === 'undefined') {
                        loadNews(callback, id);
                    }
                    else {
                        callback(current);
                    }
                }
                else {
                    if (news.length > 0) {
                        callback(news);
                    }
                    else {
                        loadNews(callback);
                    }
                }
            },

            delete: function(callback, id) {
                var iter,
                    deleteUrl = newsUrl + 'delete/?id=' + id;
                if (id && angular.isNumber(id)) {
                    for (iter = 0; iter < news.length; iter++) {
                        if (news[iter].id === id) {
                            news.splice(iter, 1);
                            $http.get(deleteUrl)
                                .success(function() {
                                    callback(news);
                                })
                                .error(Server.errorHandler);;
                            return true;
                        }
                    }

                }
                return false;
            },

            save: function(title, content, date, id, mag) {
                var iter;
                if (!isNaN(id)) {
                    for (iter = 0; iter < news.length; iter++) {
                        if (news[iter].id === id) {
                            news[iter].content = content;
                            news[iter].title = title;
                            news[iter].date = date;
                            news[iter].mag = mag;
                            break;
                        }
                    }
                }
                else {
                    /**
                     * news.length is not correct for sync with server !
                     */
                    news.push({
                        id: news.length,
                        author: 'Test',
                        title: title,
                        content: content,
                        date: date,
                        mag: mag
                    });
                }

            },

        };
    });