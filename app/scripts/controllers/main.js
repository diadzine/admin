'use strict';

angular.module('adminApp')
    .controller('MainCtrl', function($scope) {

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

        };

        $scope.signup = function() {
            alert('You now correctly signed up !');
        };

    });