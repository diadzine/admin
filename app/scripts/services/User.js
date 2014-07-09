'use strict';

angular.module('adminApp')
    .factory('User', function($cookies, $location, $http, Server) {
        var apiUrl = Server.Url + 'apiv1/',
            isLoggedIn = false;

        if ($cookies.tooskiLogin) {
            Server.setHeaders('Authorization', $cookies.tooskiLogin);
            isLoggedIn = true;
        }
        else {
            $location.path('#!/');
        }

        return {
            isLoggedIn: isLoggedIn,

            login: function(email, password, callback) {
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
                    $http.post(apiUrl + 'auth-token/', {
                        username: email,
                        password: password,
                    })
                        .then(function(res) {
                            var login = res.data;
                            login.success = !! login.token;
                            login.error = error;

                            if (login.token) {
                                Server.setHeaders('Authorization',
                                    'Token ' +
                                    login.token);
                                $cookies.tooskiLogin = 'Token ' + login
                                    .token;
                                isLoggedIn = true;
                            }


                            callback(login);
                        }, Server.errorHandler);
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
