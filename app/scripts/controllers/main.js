'use strict';

angular.module('adminApp')
    .controller('MainCtrl', ['$scope', '$location', 'User',
        function($scope, $location, User) {

            // TODO: Implement it !
            var isLoggedIn = function() {
                return false;
            };

            if (isLoggedIn()) {
                alert('Imagine being redirected to the News page');
            }

            $scope.login = function() {
                var email = document.getElementById('login-email').value,
                    password = document.getElementById('login-password').value;

                var login = User.login(email, password);

                if (login.success === true) {
                    $location.path('/News');
                }
                else {
                    document.getElementById('login-errors').innerHTML =
                        login.error;
                }
            };

            $scope.signup = function() {
                var email = document.getElementById('signup-email').value,
                    password = document.getElementById('signup-password').value,
                    confirm = document.getElementById('signup-confirm').value,
                    name = document.getElementById('signup-name').value,
                    signature = document.getElementById('signup-signature')
                        .value;

                var signup = User.signup(email, password, confirm, name,
                    signature);

                if (signup.success === true) {
                    alert(
                        'Merci de votre enregistrement. Vous recevrez un email lorsque votre candidature sera validée.'
                    );
                }
                else {
                    document.getElementById('signup-errors').innerHTML =
                        signup
                        .error;
                }
            };

        }
    ]);