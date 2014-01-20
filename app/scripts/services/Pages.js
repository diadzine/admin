'use strict';

angular.module('adminApp')
    .factory('Pages', function() {
        var pages = [{
            id: 0
            name: 'Test',
            content: '<p>Il n\'y a presque rien ici 1 ! </p>',
        }, {
            id: 1
            name: 'Test',
            content: '<p>Il n\'y a presque rien ici 2 ! </p>',
        }, {
            id: 2
            name: 'Test',
            content: '<p>Il n\'y a presque rien ici 3 ! </p>',
        }, {
            id: 4
            name: 'Test',
            content: '<p>Il n\'y a presque rien ici 4 ! </p>',
        }, {
            id: 5
            name: 'Test',
            content: '<p>Il n\'y a presque rien ici 5 ! </p>',
        }, ];
        return {
            save: function() {

            },

        };
    });