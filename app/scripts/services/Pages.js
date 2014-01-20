'use strict';

angular.module('adminApp')
    .factory('Pages', function() {
        var pages = [{
            id: 0,
            name: 'Publicité',
            content: '<p>Il n\'y a presque rien ici 1 ! </p>',
        }, {
            id: 1,
            name: 'Staff',
            content: '<p>Il n\'y a presque rien ici 2 ! </p>',
        }, {
            id: 2,
            name: 'Nounours',
            content: '<p>Il n\'y a presque rien ici 3 ! </p>',
        }, {
            id: 3,
            name: 'Admin',
            content: '<p>Il n\'y a presque rien ici 4 ! </p>',
        }, {
            id: 4,
            name: 'Jean de La Fontaine',
            content: '<p>Il n\'y a presque rien ici 5 ! </p>',
        }, ];
        return {
            getPages: function(id) {
                var iter;
                if (id || angular.isNumber(id)) {
                    for (iter = 0; iter < pages.length; iter++) {
                        if (pages[iter].id === id) {
                            return pages[iter];
                        }
                    }
                }
                else {
                    return pages;
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
                     * pages.length is not enough, you have to sync with server.
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