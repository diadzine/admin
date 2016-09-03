'use strict';

angular.module('adminApp')
    .controller('SkiclubsCtrl', ['$scope', 'Skiclubs',
        function($scope, Skiclubs) {

            $scope.current = {};

            Skiclubs.get(function(data) {
                $scope.skiclubs = data;
            });

            $scope.delete = function(index) {
                var club = $scope.skiclubs[index];
                if (confirm('Voulez-vous vraiment supprimer le club: ' + club.title +
                    ' ?')) {
                    Skiclubs.del(club.id, function() {
                        $scope.skiclubs.splice(index, 1);
                    });
                }
            };

            $scope.modify = function(index) {
                $scope.current = $scope.skiclubs[index];
            };

            $scope.save = function() {
                var current = $scope.current;
                if (current.id) {
                    Skiclubs.save(current.id, current.title, current.latitude,
                        current.longitude, current.contact, current.description,
                        function(club) {
                            var i;
                            for (i = 0; i < $scope.skiclubs.length; i++) {
                                if ($scope.skiclubs[i].id == club.id) {
                                    return $scope.skiclubs[i] = club;
                                }
                            }
                        });
                }
                else {
                    Skiclubs.add(current.title, current.latitude, current.longitude,
                        current.contact, current.description, function(club) {
                            $scope.skiclubs.push(club);
                        });
                }
            };

            $scope.tinymceOptions = {
                selector: '#description',
                theme: 'modern',
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking table contextmenu directionality',
                    'emoticons template paste textcolor'
                ],
                toolbar1: 'undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
                image_advtab: true
            };

        }
    ]);
