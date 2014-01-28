'use strict';

angular.module('adminApp')
    .factory('BlogPosts', function() {
        /**
         * TODO: Change and add for each the blogger category.
         */
        var posts = [{
            id: 0,
            blogId: 0,
            title: 'News n°0 avec super long titre',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1329390694,
        }, {
            id: 1,
            blogId: 0,
            title: 'News n°1 avec super long titre',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1329390694,
        }, {
            id: 2,
            blogId: 1,
            title: 'News n°2 avec super long titre',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1329390694,
        }, {
            id: 3,
            blogId: 2,
            title: 'News n°3 avec super long titre',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1329390694,
        }, ];

        return {
            delete: function(postId, blogId) {
                var iter, selected = [];
                for (iter = 0; iter < posts.length; iter++) {
                    if (posts[iter].blogId === blogId) {
                        if (posts[iter].id === postId) {
                            posts.splice(iter, 1);
                            iter--;
                        }
                        else {
                            selected.push(posts[iter]);
                        }
                    }
                }
                return selected;
            },

            save: function(post) {
                debugger;
                var iter;
                if (post.id || angular.isNumber(post.id)) {
                    for (iter = 0; iter < posts.length; iter++) {
                        if (posts[iter].id === post.id) {
                            posts[iter] = post;
                            return true;
                        }
                    }
                }
                else {
                    post.id = posts.length;
                    posts.push(post);
                    return true;
                }
                return false;
            },

            getPosts: function(blogId, id) {
                var iter, jter, selected = [];

                for (iter = 0; iter < posts.length; iter++) {
                    if (posts[iter].blogId === blogId) {
                        selected.push(posts[iter]);
                    }
                }
                return selected;
                if (id || angular.isNumber(id)) {
                    for (iter = 0; iter < posts.length; iter++) {
                        if (posts[iter].id === id) {
                            return posts[iter];
                        }
                    }
                }
                return posts
            },

        };
    });