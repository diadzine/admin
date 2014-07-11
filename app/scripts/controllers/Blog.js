'use strict';

angular.module('adminApp')
    .controller('BlogCtrl', ['$scope', 'Bloggers', 'BlogPosts',
        function($scope, Bloggers, BlogPosts) {
            Bloggers.getBlogger(function(bloggers) {
                $scope.bloggers = bloggers;

                $scope.current = $scope.bloggers[0] || {};
            });


            /**
             * Methods for Bloggers
             *
             */
            $scope.selectBlogger = function(place) {
                $scope.current = $scope.bloggers[place];
            };

            $scope.saveBlogger = function(argument) {
                var b = $scope.current;
                if (b.id) {
                    Bloggers.save(b, function(blogger) {
                        var i;
                        for (i = 0; i < $scope.bloggers.length; i++) {
                            if (blogger.id === $scope.bloggers[i].id) {
                                return $scope.bloggers[i] = blogger;
                            }
                        }
                    });
                }
                else {
                    Bloggers.add(b, function(blogger) {
                        $scope.bloggers.push(blogger);
                        $scope.current = blogger;
                    });
                }
            };

            $scope.addBlogger = function() {
                $scope.current = {
                    name: 'Nom',
                    header: '',
                    ad: [''],
                    sponsors: [''],
                    profilePic: '',
                    biography: 'Biographie',
                    linkResults: 'http://'
                };
                return $scope.current;
            };

            $scope.deleteBlogger = function() {
                if (confirm('Voulez-vous vraiment supprimer le blogger: ' +
                    $scope.current.name + ' ?')) {
                    Bloggers.delete($scope.current, function() {
                        var i;
                        for (i = 0; i < $scope.bloggers.length; i++) {
                            if ($scope.bloggers[i].id === $scope.current
                                .id) {
                                $scope.current = $scope.bloggers[0] ||
                                    $scope.addBlogger();
                                return $scope.bloggers.splice(i, 1);
                            }
                        }
                    });
                }
            };

            $scope.changePortrait = function(url) {
                $scope.current.profilePic = url;
            };

            $scope.changeHeader = function(url) {
                $scope.current.header = url;
            };
            $scope.addSponsors = function(url) {
                $scope.current.sponsors.push(url);
            };
            $scope.addAd = function(url) {
                $scope.current.ad.push(url);
            };

            $scope.removeSponsor = function(sponsor) {
                var pos = $scope.current.sponsors.indexOf(sponsor);
                $scope.current.sponsors.splice(pos, 1);
            };

            $scope.removeAd = function(ad) {
                var pos = $scope.current.ad.indexOf(ad);
                $scope.current.ad.splice(pos, 1);
            };

            /**
             * Methods for BlogPosts
             */

            $scope.$watch('current', function(value) {
                if (!value || !value.id) {
                    value = {
                        id: 0,
                    };
                }
                BlogPosts.get(value.id, function(posts) {
                    $scope.blogPosts = posts;
                    $scope.newPost();
                })
            });

            $scope.newPost = function() {
                return $scope.currentPost = {
                    title: '',
                    date: parseInt(new Date()
                        .getTime()),
                    content: '',
                    blogId: $scope.current.id,
                };
            };

            $scope.insertBlogImage = function(img) {
                $scope.currentPost.content += '<img src="' + img +
                    '" alt="' + $scope.currentPost.title + '" />';
            };

            $scope.savePost = function() {
                var p = $scope.currentPost,
                    b = $scope.current;
                if (!b.id) {
                    return alert(
                        'Il faut d\'abord créer le blogger et après écrire un post.'
                    );
                }
                if (p.id) {
                    BlogPosts.save(b.id, p, function(post) {
                        var i;
                        $scope.currentPost = post;
                        for (i = 0; i < $scope.blogPosts.length; i++) {
                            if ($scope.blogPosts[i].id === post.id) {
                                $scope.blogPosts[i] = post;
                            }
                        }
                    });
                }
                else {
                    BlogPosts.add(b.id, p, function(post) {
                        $scope.blogPosts.push(post);
                        $scope.currentPost = post;
                    });
                }
            };

            $scope.deletePost = function(place) {
                var p = $scope.blogPosts[place],
                    b = $scope.current;
                if (confirm('Voulez-vous supprimer le post: ' + p.title +
                    ' ?')) {
                    BlogPosts.del(b.id, p.id, function() {
                        $scope.blogPosts.splice(place, 1);
                    });
                }
            };

            $scope.selectPost = function(place) {
                $scope.currentPost = $scope.blogPosts[place];
            };


            /**
             * Options for TinyMCE
             *
             */
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
