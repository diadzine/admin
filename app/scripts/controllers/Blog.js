'use strict';

angular.module('adminApp')
    .controller('BlogCtrl', ['$scope', 'Bloggers', 'BlogPosts',
        function($scope, Bloggers, BlogPosts) {
            var bloggers = Bloggers.getBloggers();

            $scope.select = function(id) {
                var blogger = Bloggers.getBloggers(id);
                $scope.activeBlogger = blogger.id;
                $scope.blogger = blogger;
                $scope.blogPosts = BlogPosts.getPosts($scope.activeBlogger);
            };

            $scope.addBlog = function() {
                var blogger = Bloggers.save(null);
                $scope.activeBlogger = blogger.id;
                $scope.blogger = blogger;
            };

            $scope.deleteBlog = function() {
                var conf = confirm(
                    'Êtes-vous sûr de vouloir supprimer le blog ' + $scope.blogger
                    .name + ' ?'),
                    blogger = $scope.blogger;

                if (conf) {
                    $scope.bloggers = Bloggers.delete(blogger);
                    $scope.select($scope.bloggers[0].id);
                }
            };

            $scope.saveBlogger = function() {
                var id = $scope.activeBlogger,
                    blogger = $scope.blogger;
                Bloggers.save(id, blogger);
            };

            $scope.removeSponsor = function(sponsor) {
                var pos = $scope.blogger.sponsors.indexOf(sponsor);
                $scope.blogger.sponsors.splice(pos, 1);
            };

            $scope.removeAd = function(ad) {
                var pos = $scope.blogger.ad.indexOf(ad);
                $scope.blogger.ad.splice(pos, 1);
            };

            // This function should upload the picture and then modify directly the scope.blogger object.
            $scope.changePortrait = function() {

            };
            // This function should upload the picture and then modify directly the scope.blogger object.
            $scope.changeSponsors = function() {

            };
            // This function should upload the picture and then modify directly the scope.blogger object.
            $scope.changeAd = function() {

            };

            $scope.bloggers = bloggers;

            $scope.activeBlogger = bloggers[0].id;

            $scope.blogger = bloggers[0];

            $scope.blogPosts = BlogPosts.getPosts($scope.activeBlogger);

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
        }
    ]);