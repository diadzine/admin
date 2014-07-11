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
                $scope.activeBlogger = 0;
                $scope.blogger = {};
            };

            $scope.deleteBlog = function() {
                var conf = confirm(
                        'Êtes-vous sûr de vouloir supprimer le blog ' +
                        $scope.blogger
                        .name + ' ?'),
                    blogger = $scope.blogger;

                if (conf) {
                    Bloggers.delete(function(response) {
                        var i;
                        for (i = 0; i < $scope.bloggers.length; i++) {
                            if ($scope.bloggers[i].id === blogger.id) {
                                return $scope.bloggers.splice(i, 1);
                            }
                        }
                        $scope.select(bloggers[0].id);
                    }, blogger);
                }
            };

            $scope.saveBlogger = function() {
                var id = $scope.activeBlogger,
                    blogger = $scope.blogger;
                Bloggers.save(function(saved) {
                    Bloggers.getBlogger(function(response) {
                        var i;
                        $scope.blogger = response;
                        $scope.activeBlogger = saved.id;
                        for (i = 0; i < $scope.bloggers.length; i++) {
                            if ($scope.bloggers[i].id === blogger.id) {
                                return $scope.bloggers[i] =
                                    response;
                            }
                        }
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
            $scope.changePortrait = function(url) {
                $scope.blogger.profilePic = url;
            };

            // This function should upload the picture and then modify directly the scope.blogger object.
            $scope.changeHeader = function(url) {
                $scope.blogger.header = url;
            };
            // This function should upload the picture and then modify directly the scope.blogger object.
            $scope.addSponsors = function(url) {
                $scope.blogger.sponsors.push(url);
            };
            // This function should upload the picture and then modify directly the scope.blogger object.
            $scope.addAd = function(url) {
                $scope.blogger.ad.push(url);
            };

            $scope.addNews = function() {
                $scope.currentNews = {
                    date: parseInt(new Date()
                        .getTime()),
                    blogId: $scope.activeBlogger,
                };
            };

            $scope.modifyNews = function(post) {
                $scope.currentNews = post;
            };

            $scope.insertBlogImage = function(img) {
                $scope.currentNews.content += '<img src="' + img +
                    '" alt="' + $scope.currentNews.title + '" />';
            };

            $scope.saveNews = function() {
                var post = $scope.currentNews,
                    blogId = post.blogId;

                post.date = post.date || parseInt(new Date()
                    .getTime());

                BlogPosts.save(function(saved) {
                    BlogPosts.getPosts(function(response) {
                        $scope.currentNews = saved;
                        $scope.blogPosts = response;
                    }, blogId);
                }, post);
            };

            $scope.deleteNews = function(postId) {
                var conf = confirm(
                        'Voulez-vous vraiment effacer le post n°' + postId +
                        ' ?'),
                    blogId = $scope.activeBlogger;
                if (conf) {
                    BlogPosts.delete(function(response) {
                        $scope.blogPosts = response;
                    }, postId, blogId);
                }
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
