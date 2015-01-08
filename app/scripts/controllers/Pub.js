'use strict';

angular.module('adminApp')
    .controller('PubCtrl', function($scope, $modal, Pub) {

        var refresh = function() {
            Pub.getCat('vertical', function(data) {
                $scope.verticals = data;
            });
            Pub.getCat('horizontal', function(data) {
                $scope.horizontals = data;
            });
            Pub.getCat('square', function(data) {
                $scope.squares = data;
            });
        };

        $scope.openEdit = function(image) {
            var size = 'lg';
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return image;
                    }
                }
            });

            modalInstance.result.then(function(image) {
                console.log('save' + image.link);
            }, function(image) {
                $scope.removeImage(image);
            });
        };

        $scope.removeImage = function(image) {
            if (confirm('Effacer la publicité ?')) {
                Pub.remove(image, function() {
                    refresh();
                })
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

angular.module('adminApp')
    .controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {

        $scope.image = items;

        $scope.save = function() {
            $modalInstance.close($scope.image);
        };

        $scope.delete = function() {
            $modalInstance.dismiss($scope.image);
        };
    });
