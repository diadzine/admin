'use strict';

angular.module('adminApp')
    .factory('Ad', function() {

        var ad = [{
            id: 0,
            img: 'http://placehold.it/750x350',
            vetical: 0,
            horizontal: 1,
        }, {
            id: 1,
            img: 'http://placehold.it/750x350',
            vetical: 0,
            horizontal: 1,
        }, {
            id: 2,
            img: 'http://placehold.it/350x750',
            vetical: 1,
            horizontal: 0,
        }, {
            id: 3,
            img: 'http://placehold.it/350x750',
            vetical: 1,
            horizontal: 0,
        }, {
            id: 4,
            img: 'http://placehold.it/750x350',
            vetical: 0,
            horizontal: 1,
        }, ];

        // Public API here
        return {
            getVerticals: function(id) {
                var iter;
                for (iter = 0; iter < ad.length; iter++) {

                }
            },

            getHorizontals: function(id) {

            },

        };
    });