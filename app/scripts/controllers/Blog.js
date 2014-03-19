'use strict';

angular.module('adminApp')
    .controller('BlogCtrl', ['$scope', 'Bloggers', 'BlogPosts',
        function($scope, Bloggers, BlogPosts) {
            var bloggers = [];
            Bloggers.getBlogger(function(response) {
                bloggers = response;

                $scope.bloggers = bloggers;

                $scope.activeBlogger = bloggers[0].id;

                $scope.blogger = bloggers[0];

                BlogPosts.getPosts(function(response) {
                    $scope.blogPosts = response;
                }, $scope.activeBlogger);

                $scope.currentNews = {
                    date: parseInt(new Date()
                        .getTime()),
                    blogId: $scope.activeBlogger,
                };
            });

            $scope.select = function(id) {
                Bloggers.getBlogger(function(blogger) {
                    $scope.activeBlogger = id;
                    $scope.blogger = blogger;
                    BlogPosts.getPosts(function(response) {
                        $scope.blogPosts = response;
                        $scope.currentNews = {
                            date: parseInt(new Date()
                                .getTime()),
                            blogId: $scope.activeBlogger,
                        };
                    }, $scope.activeBlogger);

                }, id);
            };

            $scope.addBlog = function() {
                /*Todo: Change that... Don't use .save(). */
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
                    Bloggers.delete(function(response) {
                        bloggers = response;
                        $scope.bloggers = response;
                        $scope.select(bloggers[0].id);
                    }, blogger);
                }
            };

            $scope.saveBlogger = function() {
                var id = $scope.activeBlogger,
                    blogger = $scope.blogger;
                Bloggers.save(function(saved) {
                    Bloggers.getBlogger(function(response) {
                        $scope.blogger = saved;
                        $scope.activeBlogger = saved.id;
                        bloggers = response;
                        $scope.bloggers = bloggers;
                        BlogPosts.getPosts(function(response) {
                            $scope.blogPosts = response;
                        }, $scope.activeBlogger);
                    });
                }, id, blogger);
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
            $scope.changePortrait = function(element) {
                $scope.$apply(function($scope) {
                    console.log('files:', element.files);
                    var files = element.files;
                    //Write here code to upload files to server.
                });
            };
            // This function should upload the picture and then modify directly the scope.blogger object.
            $scope.addSponsors = function(element) {
                $scope.$apply(function($scope) {
                    console.log('files:', element.files);
                    var files = element.files;
                    //Write here code to upload files to server.
                });
            };
            // This function should upload the picture and then modify directly the scope.blogger object.
            $scope.addAd = function(element) {
                $scope.$apply(function($scope) {
                    console.log('files:', element.files);
                    var files = element.files;
                    //Write here code to upload files to server.
                });

            };

            $scope.addNews = function() {
                $scope.currentNews = {
                    date: parseInt((new Date()
                        .getTime()) / 1000),
                    blogId: $scope.activeBlogger,
                };
            };

            $scope.modifyNews = function(post) {
                $scope.currentNews = post;
            };

            $scope.saveNews = function() {
                var post = $scope.currentNews;
                post.date = post.date || parseInt((new Date()
                        .getTime()) /
                    1000);
                BlogPosts.save(post);
                $scope.blogPosts = BlogPosts.getPosts(post.blogId);
            };

            $scope.deleteNews = function(postId) {
                var conf = confirm(
                    'Voulez-vous vraiment effacer le post n°' + postId +
                    ' ?'),
                    blogId = $scope.activeBlogger;
                if (conf) {
                    $scope.blogPosts = BlogPosts.delete(postId, blogId);
                    return true;
                }
                return false;
            };

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