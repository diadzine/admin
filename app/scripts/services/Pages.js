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
                    debugger;
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

            delete: function(id) {
                var iter;
                for (iter = 0; iter < pages.length; iter++) {
                    if (pages[iter].id === id) {
                        pages.splice(iter, 1);
                        return true;
                    }
                }
                return false;
            },

            save: function(id, page) {
                var iter;
                if (id || angular.isNumber(id)) {
                    for (iter = 0; iter < pages.length; iter++) {
                        if (pages[iter].id === id) {
                            pages[iter] = {
                                id: id,
                                name: page.name,
                                content: page.content,
                            };
                            return pages[iter];
                        }
                    }
                }
                else {
                    /*
                     * TODO:
                     * Don't sync with server here. Instead do it when user clicks on "Enregistrer",
                     * and then adjust the page id. (page.length is buggy)
                     */
                    var id = pages.length,
                        page = {
                            id: id,
                            name: 'Nouvelle page',
                            content: '<p>Contenu de la nouvelle page.</p>',
                        };
                    pages.push(page);
                    return page;
                }
            },

        };
    });