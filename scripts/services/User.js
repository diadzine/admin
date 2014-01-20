'use strict';

angular.module('adminApp')
    .factory('User', function() {

        return {
            login: function(email, password) {
                var error = '',
                    success = true;

                if (email.indexOf('@') === -1) {
                    success = false;
                    error = 'Il ne s\'agit pas d\'un email valide.';
                }

                if (password === '') {
                    success = false;
                    error = 'Le champ mot de passe est vide.';
                }

                if (email === '') {
                    success = false;
                    error = 'Le champ email est vide.';
                }

                if (success) {
                    // TODO: sync with server and validate.
                }

                return {
                    success: success,
                    error: error,
                };
            },

            signup: function(email, password, confirm, name, signature) {
                var error = '',
                    success = true;

                if (password !== confirm) {
                    success = false;
                    error =
                        'Le mot de passe ne correspond pas à la confirmation.';
                }

                if (email.indexOf('@') === -1) {
                    success = false;
                    error = 'L\'email n\'est pas valide.';
                }

                if (email === '' || password === '' || confirm === '' ||
                    name === '' || signature === '') {
                    success = false;
                    error = 'Certains champs n\'ont pas été remplis.';
                }

                if (success) {
                    // TODO: Implement server sync and validation.
                }

                return {
                    success: success,
                    error: error,
                };
            },

        };
    });