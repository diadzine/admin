'use strict';

angular.module('adminApp')
    .factory('Pub', function() {

        var pubs = [{
            id: 0,
            img: 'http://placehold.it/750x250',
            vertical: 0,
            horizontal: 1,
        }, {
            id: 1,
            img: 'http://placehold.it/750x250',
            vertical: 0,
            horizontal: 1,
        }, {
            id: 2,
            img: 'http://placehold.it/250x750',
            vertical: 1,
            horizontal: 0,
        }, {
            id: 3,
            img: 'http://placehold.it/250x750',
            vertical: 1,
            horizontal: 0,
        }, {
            id: 4,
            img: 'http://placehold.it/750x250',
            vertical: 0,
            horizontal: 1,
        }, ];


        return {

            remove: function(img) {
                var pos = pubs.indexOf(img);
                pubs.splice(pos, 1);
                return pubs;
            },

            getPub: function(id) {
                if (!id && !angular.isNumber(id)) {
                    return pubs;
                }
                else {
                    return pubs.filter(function(el) {
                        return el.id === id;
                    });
                }
            },

            getCat: function(cat) {
                return pubs.filter(function(el) {
                    return el[cat] === 1;
                });
            },

        };
    });