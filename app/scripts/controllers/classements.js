'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:ClassementsCtrl
 * @description
 * # ClassementsCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')
    .controller('ClassementsCtrl', function($scope, $http, Server) {
        var url = Server.Url + 'apiv1/races/update/';

        $scope.updateRaces = function() {
            alert('Mise à jour lancée...');
            $http.get(url)
                .then(function() {
                    alert('Les classements sont à jour.');
                }, Server.errorHandler);
        };
    });
