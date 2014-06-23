'use strict';

angular.module('adminApp')
    .controller('PubCtrl', function($scope, Pub) {

        var refresh = function() {
            $scope.verticals = Pub.getCat('vertical');
            $scope.horizontals = Pub.getCat('horizontal');
        };

        $scope.removeImage = function(image) {
            if (confirm('Effacer la publicité ?')) {
                Pub.remove(image);
                refresh()
            }
        };

        $scope.save = function() {
            var ver = $scope.vertical || 0,
                hor = $scope.horizontal || 0,
                sq = $scope.square || 0;
            Pub.save(angular.element('#newAd')[0]
                .files[0],
                ver, hor, sq,
                function(data) {
                    console.log(data);
                    refresh();
                });
        };

        refresh();
    });
