'use strict';

angular.module('adminApp')
    .factory('News', function() {
        var news = [{
            id: 0,
            author: 'Séb',
            title: 'News n°0 avec super long titre',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1329390694,
            mag: 1,
        }, {
            id: 1,
            author: 'Séb',
            title: 'News n°1',
            content: 'Mon super text, avec du html: <img src="http://www.fricktal24.ch/typo3temp/pics/Ski-Aerni_Luca_01_55d138efee.jpg" /><a href="http://tooski.ch"></a>',
            date: 1319390695,
            mag: 1,
        }, {
            id: 2,
            author: 'Séb',
            title: 'News n°2',
            content: 'Mon super text, avec du html: <a href="https://tooski.ch"><img src="http://skiweltcup.tv/wp-content/themes/tvsportnews/images/09-aerni002-klein-swiss-ski.jpg" /></a>',
            date: 1329390696,
            mag: 1,
        }, {
            id: 3,
            author: 'Séb',
            title: 'News n°0',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1339390694,
            mag: 1,
        }, {
            id: 4,
            author: 'Séb',
            title: 'News n°1',
            content: 'Mon super text, avec du html: <img src="http://www.fricktal24.ch/typo3temp/pics/Ski-Aerni_Luca_01_55d138efee.jpg" /><a href="http://tooski.ch"></a>',
            date: 1349390695,
            mag: 0,
        }, {
            id: 5,
            author: 'Séb',
            title: 'News n°2',
            content: 'Mon super text, avec du html: <a href="https://tooski.ch"><img src="http://skiweltcup.tv/wp-content/themes/tvsportnews/images/09-aerni002-klein-swiss-ski.jpg" /></a>',
            date: 1359390696,
            mag: 0,
        }, {
            id: 6,
            author: 'Séb',
            title: 'News n°0',
            content: 'Mon super text, avec du html: <img src="http://www.google.ch/logos/doodles/2014/annette-von-droste-hulshoffs-217th-birthday-5701007384248320.2-hp.jpg" /><a href="http://tooski.ch"></a>',
            date: 1369390694,
            mag: 1,
        }, {
            id: 7,
            author: 'Séb',
            title: 'News n°1',
            content: 'Mon super text, avec du html: <img src="http://www.fricktal24.ch/typo3temp/pics/Ski-Aerni_Luca_01_55d138efee.jpg" /><a href="http://tooski.ch"></a>',
            date: 1379390695,
            mag: 1,
        }, {
            id: 8,
            author: 'Séb',
            title: 'News n°2',
            content: 'Mon super text, avec du html: <a href="https://tooski.ch"><img src="http://skiweltcup.tv/wp-content/themes/tvsportnews/images/09-aerni002-klein-swiss-ski.jpg" /></a>',
            date: 1389390696,
            mag: 0,
        }, ];


        return {
            getNews: function(id) {
                var curr;
                if (!isNaN(id)) {
                    curr = news.filter(function(el) {
                        return el.id === id;
                    });
                    return curr[0];
                }
                else {
                    return news;
                }
            },

            delete: function(id) {
                var iter;
                for (iter = 0; iter < news.length; iter++) {
                    if (news[iter].id === id) {
                        news.splice(iter, 1);
                        return true;
                    }
                }
                return false;
            },

            save: function(title, content, date, id, mag) {
                debugger;
                var iter;
                if (!isNaN(id)) {
                    for (iter = 0; iter < news.length; iter++) {
                        if (news[iter].id === id) {
                            news[iter].content = content;
                            news[iter].title = title;
                            news[iter].date = date;
                            news[iter].mag = mag;
                            break;
                        }
                    }
                }
                else {
                    /**
                     * news.length is not correct for sync with server !
                     */
                    news.push({
                        id: news.length,
                        author: 'Test',
                        title: title,
                        content: content,
                        date: date,
                        mag: mag
                    });
                }

            },

        };
    });