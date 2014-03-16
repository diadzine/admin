'use strict';

angular.module('adminApp')
    .factory('Pages', function($http, Server) {
        var pages = [];

        var pageUrl = Server.Url + 'pages/';
        var loadPages;
        loadPages = function(callback) {
            $http.get(pageUrl, {
                cache: 'true'
            })
                .success(function(response) {
                    var iter, filter;
                    var processed = Server.processResponse(response);
                    for (iter = 0; iter < processed.length; iter++) {
                        filter = pages.some(function(el) {
                            return JSON.stringify(el) === JSON.stringify(
                                processed[iter]);
                        });
                        if (!filter) {
                            pages.push(processed[iter]);
                        }
                    }
                    callback(pages);
                })
                .error(Server.errorHandler);
        };

        return {
            getPage: function(callback, id) {
                var getPage;
                if (pages.length < 1) {
                    getPage = this.getPage;
                    loadPages(function() {
                        getPage(callback, id);
                    });
                }
                else {
                    if (id && angular.isNumber(id)) {
                        var page = pages.filter(function(el) {
                            return el.id === +id;
                        })[0];
                        page = page ? page : {};
                        callback(page);
                    }
                    else {
                        callback(pages);
                    }
                }
            },

            delete: function(callback, id) {
                var deleteUrl = pageUrl + 'delete/?id=' + id;
                $http.get(deleteUrl)
                    .success(function(response) {
                        var iter;
                        if (parseInt(response) === 0) {
                            alert('La suppression de la page a échoué.');
                        }
                        else {
                            for (iter = 0; iter < pages.length; iter++) {
                                if (pages[iter].id === id) {
                                    pages.splice(iter, 1);
                                    break;
                                }
                            }
                            callback(pages);
                        }
                    })
                    .error(Server.errorHandler);
            },

            save: function(callback, page) {
                var iter,
                    id = page.id || 0,
                    saveUrl = pageUrl + 'save/',
                    save = this.save;
                page.id = id;

                $http({
                    method: 'POST',
                    url: saveUrl,
                    data: jQuery.param(page),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                })
                    .success(function(response) {
                        if (parseInt(response) === 0) {
                            return alert(
                                'Vous êtes déconnecter. Veuillez vous reconnecter pour sauver la page.'
                            );
                        }
                        var saved = Server.processResponse(response)[0];
                        if (id && angular.isNumber(id)) {
                            for (iter = 0; iter < pages.length; iter++) {
                                if (pages[iter].id === id) {
                                    pages[iter] = saved;
                                    break;
                                }
                            }
                        }
                        else {
                            pages.push(saved);
                        }
                        callback(saved);
                    })
                    .error(Server.errorHandler);
            },

        };
    });