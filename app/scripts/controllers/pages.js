'use strict';

angular.module('adminApp')
    .controller('PagesCtrl', function($scope, Pages) {
        var pages = Pages.getPages()

        $scope.modify = function(id) {
            debugger;
            var page = Pages.getPages(id);
            $scope.currentTitle = page.name;
            $scope.activePage = id;
        };

        $scope.delete = function() {
            var id = $scope.activePage,
                conf = confirm('Voulez-vous vraiment supprimer la news n°' +
                    id + ' ?');
            if (conf) {
                Pages.delete(id);
                pages = Pages.getPages();
                scope.modify(pages[0].id);
            }
            return;
        };

        $scope.save = function(id) {

        };

        $scope.addPage = function() {
            var newPage = Pages.save();
            $scope.modify(newPage.id);
        };

        $scope.currentPage = pages[0];

        $scope.activePage = pages[0].id;

        $scope.pages = pages;

        $scope.tinymceOptions = {
            selector: 'textarea',
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking table contextmenu directionality',
                'emoticons template paste textcolor'
            ],
            toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
            image_advtab: true
        };
    });