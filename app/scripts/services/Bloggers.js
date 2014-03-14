'use strict';

angular.module('adminApp')
    .factory('Bloggers', function() {
        var bloggers = [{
            id: 0,
            name: 'Axel Béguelin',
            linkResults: 'http://data.fis-ski.com/dynamic/athlete-biography.html?sector=AL&competitorid=190056&type=result',
            profilePic: 'http://www.arcinfo.ch/multimedia/images/archives_arcinfo//2010.04.09/axel_beguelin.jpg',
            biography: 'Né: 12.12.12 <br /> Mange des petits poids au petit déjeuner. <br /> Il y a beaucoup de petits dans la phrase précédente, mais au moins elle n\'est pas trop courte.',
            sponsors: [
                'http://snow.co.nz/media/uploads/2012/06/logo-atomic.jpg',
                'http://3.bp.blogspot.com/_8cOgwU34ueU/TH6rXYo9kBI/AAAAAAAABaQ/ueZjXw7bpYk/s1600/fi_main-logo_4c_high.jpg',
                'http://www.daillon.ch/wordpress/wp-content/uploads/2013/10/1357755346.jpg',
            ],
            ad: [
                'http://www.vitagora.com/assets/images/logos/Laiterie_de_bresse_logo.jpg',
                'http://www.pole-formation-savoie.fr/uploads/images/UIMM_PF_SAADOSIS.jpg',
                'http://www.daillon.ch/wordpress/wp-content/uploads/2013/10/1357755346.jpg',
            ]
        }, {
            id: 1,
            name: 'Antoine Perrotet',
            linkResults: 'http://data.fis-ski.com/dynamic/athlete-biography.html?sector=AL&competitorid=190056&type=result',
            profilePic: 'http://www.arcinfo.ch/multimedia/images/archives_arcinfo//2010.04.09/axel_beguelin.jpg',
            biography: 'Né: 12.12.12 <br /> Mange des petits poids au petit déjeuner. <br /> Il y a beaucoup de petits dans la phrase précédente, mais au moins elle n\'est pas trop courte.',
            sponsors: [
                'http://snow.co.nz/media/uploads/2012/06/logo-atomic.jpg',
                'http://www.vitagora.com/assets/images/logos/Laiterie_de_bresse_logo.jpg',
                'http://www.pole-formation-savoie.fr/uploads/images/UIMM_PF_SAADOSIS.jpg',
            ],
            ad: [
                'http://snow.co.nz/media/uploads/2012/06/logo-atomic.jpg',
                'http://www.pole-formation-savoie.fr/uploads/images/UIMM_PF_SAADOSIS.jpg',
                'http://www.daillon.ch/wordpress/wp-content/uploads/2013/10/1357755346.jpg',
            ]
        }, {
            id: 2,
            name: 'Jean de La Fontaine',
            linkResults: 'http://data.fis-ski.com/dynamic/athlete-biography.html?sector=AL&competitorid=190056&type=result',
            profilePic: 'http://www.arcinfo.ch/multimedia/images/archives_arcinfo//2010.04.09/axel_beguelin.jpg',
            biography: 'Né: 12.12.12 <br /> Mange des petits poids au petit déjeuner. <br /> Il y a beaucoup de petits dans la phrase précédente, mais au moins elle n\'est pas trop courte.',
            sponsors: [
                'http://snow.co.nz/media/uploads/2012/06/logo-atomic.jpg',
                'http://3.bp.blogspot.com/_8cOgwU34ueU/TH6rXYo9kBI/AAAAAAAABaQ/ueZjXw7bpYk/s1600/fi_main-logo_4c_high.jpg',
                'http://www.daillon.ch/wordpress/wp-content/uploads/2013/10/1357755346.jpg',
            ],
            ad: [
                'http://www.pole-formation-savoie.fr/uploads/images/UIMM_PF_SAADOSIS.jpg',
                'http://3.bp.blogspot.com/_8cOgwU34ueU/TH6rXYo9kBI/AAAAAAAABaQ/ueZjXw7bpYk/s1600/fi_main-logo_4c_high.jpg',
                'http://www.vitagora.com/assets/images/logos/Laiterie_de_bresse_logo.jpg',
            ]
        }, ];
        return {
            getBloggers: function(id) {
                if (id || angular.isNumber(id)) {
                    return bloggers.filter(function(el) {
                        return el.id === id;
                    })[0];
                }
                return bloggers;
            },

            delete: function(blogger) {
                var id = blogger.id,
                    iter;
                for (iter = 0; iter < bloggers.length; iter++) {
                    if (bloggers[iter].id === id) {
                        bloggers.splice(iter, 1);
                        return bloggers;
                    }
                }
                return bloggers;
            },

            save: function(id, blogger) {
                var iter;
                if (id || angular.isNumber(id)) {
                    for (iter = 0; iter < bloggers.length; iter++) {
                        if (bloggers[iter].id === id) {
                            bloggers[iter] = blogger;
                            return bloggers[iter];
                        }
                    }
                }
                else {
                    /*
                     * TODO:
                     * Don't sync with server here. Instead do it when user clicks on "Enregistrer",
                     * and then adjust the page id. (page.length is buggy)
                     */
                    var id = bloggers.length,
                        blogger = {
                            id: id,
                            name: 'Nouveau Blog',
                            linkResults: '',
                            profilePic: '',
                            biography: '',
                            sponsors: [],
                            ad: []
                        };
                    bloggers.push(blogger);
                    return blogger;
                }

            },

        };
    });