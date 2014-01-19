'use strict';

angular.module('adminApp')
    .factory('User', function() {

        return {
            login: function(email, password) {
                var error = '';

                if (email.indexOf('@') === -1) {
                    error = 'Il ne s\'agit pas d\'un emial valide.';
                }

                if (password === '') {
                    error = 'Le champ mot de passe est vide.';
                }

                if (email === '') {
                    error = 'Le champ email est vide.';
                }

                // TODO: sync with server.
                return {
                    success: false,
                    error: error,
                };
            },

            signup: function(email, password, confirm, name, signature) {
                var error = '';

                return {
                    success: true,
                    error: error,
                };
            },

        };
    });