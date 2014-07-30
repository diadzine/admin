'use strict';

angular.module('adminApp')
    .controller('PagesCtrl', ['$scope', 'Pages',
        function($scope, Pages) {

            $scope.current = {
                id: 0,
                name: '',
                content: '',
            };

            Pages.getPage(function(response) {
                $scope.pages = response;
            });

            $scope.modify = function(place) {
                $scope.current = $scope.pages[place];
            };

            $scope.delete = function() {
                var i, page = $scope.current,
                    conf = confirm(
                        'Voulez-vous vraiment supprimer la page: \n' +
                        page.name + ' ?');
                if (conf) {
                    Pages.delete(page.id, function(response) {
                        for (i = 0; i < $scope.pages.length; i++) {
                            if ($scope.pages[i].id === page.id) {
                                $scope.modify(0);
                                return $scope.pages.splice(i, 1);
                            }
                        }
                        $scope.modify(pages[0].id);
                    });
                }
                return;
            };

            $scope.save = function() {
                var page = $scope.current;

                if (!!page.id) {
                    Pages.save(page, function(data) {

                    });
                }
                else {
                    Pages.add(page, function(data) {
                        $scope.pages.push(data);
                    });
                }
            };

            $scope.addPage = function() {
                $scope.current = {
                    id: 0,
                    title: '',
                    content: '',
                };
            };

            $scope.uploadedImage = function(img) {
                $scope.current.content += '<img src="' + img + '" alt="' +
                    $scope.current.title + '" />';
            };

            $scope.uploadedFile = function(file) {
                $scope.current.content += '<a href="' + file +
                    '" >' + file + '</a>';
            };

            $scope.tinymceOptions = {
                selector: 'textarea',
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
