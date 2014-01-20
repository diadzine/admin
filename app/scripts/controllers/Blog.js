'use strict';

angular.module('adminApp')
    .controller('BlogCtrl', function($scope, Bloggers, BlogPosts) {
        var bloggers = Bloggers.getBloggers();

        $scope.select = function(id) {
            var blogger = Bloggers.getBloggers(id);
            $scope.activeBlogger = blogger.id;
        };

        $scope.addBlog = function() {

        };

        $scope.addBlog();

        $scope.bloggers = bloggers;

        $scope.activeBlogger = bloggers[0].id;

        // $scope.currentName = bloggers[0].name;

        // $scope.currentLinkResults = bloggers[0].linkResults;

        $scope.blogger = bloggers[0];

        $scope.tinymceOptionsBio = {
            selector: '#bioContent',
            theme: 'modern',
            toolbar1: 'bold italic | alignleft aligncenter alignright alignjustify | bullist',
            image_advtab: true,
        };

        $scope.tinymceOptionsNews = {
            selector: '#newsContent',
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