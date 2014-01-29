'use strict';

angular.module('adminApp')
    .controller('PubCtrl', function($scope, Pub) {

        var refresh = function() {
            $scope.verticals = Pub.getCat('vertical');
            $scope.horizontals = Pub.getCat('horizontal');
        };

        $scope.removeImage = function(image) {
            Pub.remove(image);
            refresh();
        };

        refresh();
    });