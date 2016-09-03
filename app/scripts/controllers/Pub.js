'use strict';

angular.module('adminApp')
    .controller('PubCtrl', ['$scope', '$modal', 'Pub',
        function($scope, $modal, Pub) {

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
                            if (image.placeholders != null) {
                                image.placeholders = image.placeholders.split(",");
                            }
                            return image;
                        }
                    }
                });

                modalInstance.result.then($scope.modifyImage, $scope.removeImage);
            };

            $scope.modifyImage = function(image) {
                Pub.modify(image, function(data) {
                    refresh();
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
                    sq = $scope.square || 0,
                    files = angular.element('#new-ad-upload-image')[0].files;
                for (var i = 0; i < files.length; i++) {
                    Pub.save(files[i], ver, hor, sq, function(data) {
                        console.log(data);
                        refresh();
                    });
                }
            };

            refresh();
        }
    ]);

angular.module('adminApp')
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'AdPlaceholder', 'items',
        function($scope, $modalInstance, AdPlaceholder, items) {

            AdPlaceholder.getAdsPlaceholders(function(data) {
                $scope.placeholders = data;
            });

            $scope.image = items;

            $scope.save = function() {
                $modalInstance.close($scope.image);
            };

            $scope.delete = function() {
                $modalInstance.close($scope.image);
            };
        }
    ]);
