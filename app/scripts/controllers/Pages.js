'use strict';

angular.module('adminApp')
    .controller('PagesCtrl', ['$scope', 'Pages',
        function($scope, Pages) {
            var pages = [];
            Pages.getPage(function(response) {
                pages = response;
                $scope.currentTitle = pages[0].name;
                $scope.activePage = pages[0].id;
                $scope.tinyMceContent = pages[0].content;
                $scope.pages = pages;
            });

            $scope.modify = function(id) {
                Pages.getPage(function(response) {
                    var page = response;
                    $scope.currentTitle = page.name;
                    $scope.activePage = page.id;
                    $scope.tinyMceContent = page.content;
                }, id);
            };

            $scope.delete = function() {
                var id = $scope.activePage,
                    conf = confirm(
                        'Voulez-vous vraiment supprimer la news n°' +
                        id + ' ?');
                if (conf) {
                    Pages.delete(function(response) {
                        pages = response;
                        $scope.modify(pages[0].id);
                    }, id);
                }
                return;
            };

            $scope.save = function() {
                var page = {
                    id: $scope.activePage,
                    name: $scope.currentTitle,
                    content: $scope.tinyMceContent,
                };
                Pages.save(function(saved) {
                    Pages.getPage(function(response) {
                        pages = response;
                        $scope.pages = pages;
                        $scope.modify(saved.id);
                    });
                }, page);
            };

            $scope.addPage = function() {
                $scope.modify(0);
            };

            $scope.uploadedImage = function(img) {
                $scope.tinyMceContent += '<img src="' + img + '" alt="' +
                    $scope.currentTitle + '" />';
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
