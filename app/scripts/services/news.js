'use strict';

angular.module('adminApp')
    .factory('News', function() {
        var news = [{
            id: 0,
            author: 'Séb',
            title: 'News n°0 avec super long titre',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1389390694,
            mag: 1,
        }, {
            id: 1,
            author: 'Séb',
            title: 'News n°1',
            content: 'Mon super text, avec du html: <img src="http://www.fricktal24.ch/typo3temp/pics/Ski-Aerni_Luca_01_55d138efee.jpg" /><a href="http://tooski.ch"></a>',
            date: 1389390695,
            mag: 1,
        }, {
            id: 2,
            author: 'Séb',
            title: 'News n°2',
            content: 'Mon super text, avec du html: <a href="https://tooski.ch"><img src="http://skiweltcup.tv/wp-content/themes/tvsportnews/images/09-aerni002-klein-swiss-ski.jpg" /></a>',
            date: 1389390696,
            mag: 1,
        }, {
            id: 0,
            author: 'Séb',
            title: 'News n°0',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1389390694,
            mag: 1,
        }, {
            id: 1,
            author: 'Séb',
            title: 'News n°1',
            content: 'Mon super text, avec du html: <img src="http://www.fricktal24.ch/typo3temp/pics/Ski-Aerni_Luca_01_55d138efee.jpg" /><a href="http://tooski.ch"></a>',
            date: 1389390695,
            mag: 0,
        }, {
            id: 2,
            author: 'Séb',
            title: 'News n°2',
            content: 'Mon super text, avec du html: <a href="https://tooski.ch"><img src="http://skiweltcup.tv/wp-content/themes/tvsportnews/images/09-aerni002-klein-swiss-ski.jpg" /></a>',
            date: 1389390696,
            mag: 0,
        }, {
            id: 0,
            author: 'Séb',
            title: 'News n°0',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1389390694,
            mag: 1,
        }, {
            id: 1,
            author: 'Séb',
            title: 'News n°1',
            content: 'Mon super text, avec du html: <img src="http://www.fricktal24.ch/typo3temp/pics/Ski-Aerni_Luca_01_55d138efee.jpg" /><a href="http://tooski.ch"></a>',
            date: 1389390695,
            mag: 1,
        }, {
            id: 2,
            author: 'Séb',
            title: 'News n°2',
            content: 'Mon super text, avec du html: <a href="https://tooski.ch"><img src="http://skiweltcup.tv/wp-content/themes/tvsportnews/images/09-aerni002-klein-swiss-ski.jpg" /></a>',
            date: 1389390696,
            mag: 0,
        }, ];


        return {
            getNews: function(id) {
                if (id) {
                    return news[id];
                }
                else {
                    return news;
                }
            },

        };
    });