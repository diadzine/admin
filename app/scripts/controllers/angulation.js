'use strict';

angular.module('adminApp')
    .controller('AngulationCtrl', ['$scope', 'Angulation',
        function($scope, Angulation) {
            Angulation.getCovers(function(covers) {
                $scope.covers = covers;
            });

            $scope.delete = function(place) {
                var pic = $scope.covers[place];
                if (confirm('Confirmez-vous la suppression de la couverture ?')) {
                    Angulation.delCover(pic.id, function() {
                        $scope.covers.splice(place, 1);
                    });
                }
            };


            $scope.uploadedImage = function(img) {
                console.log(img);
                Angulation.addCover(img, function(cover) {
                    $scope.covers.push(cover);
                });
            };
        }
    ]);
