'use strict';

angular.module('adminApp')
    .controller('NewsCtrl', ['$scope', 'News',
        function($scope, News) {
            var date = new Date()
                .getTime();

            $scope.current = {
                date: date,
                content: '',
            };

            News.get(function(response) {
                $scope.news = response;
            });

            $scope.uploadedImage = function(img) {
                console.log(img);
                $scope.currentNews.content += '<img src="' + img +
                    '" alt="' + $scope.currentNews.title + '" />';
            };

            $scope.modify = function(place) {
                $scope.current = $scope.news[place];
            };

            $scope.delete = function(place) {
                var news = $scope.news[place];
                var c = confirm('Voulez vous vraiment supprimer la News:\n' +
                    news.title + ' ?');
                if (c) {
                    News.delete(news.id, function(response) {
                        $scope.news.splice(place, 1);
                    });
                }
            };

            $scope.addNews = function() {
                $scope.current = {
                    date: date,
                    content: '',
                    mag: 0,
                    id: 0,
                };
                document.getElementById('newsMag')
                    .checked = false;
            };

            $scope.sendNews = function() {
                var i, news = $scope.current,
                    date = document.getElementById('newsDate')
                    .value.split('/');
                news.mag = document.getElementById('newsMag')
                    .checked ? 1 : 0;
                news.date = (new Date(date[2], (date[1] - 1), date[0]))
                    .toISOString();
                news.author = 'CB Service';
                if (!!news.id) {
                    News.save(news, function() {
                        for (i = 0; i < $scope.news.length; i++) {
                            if ($scope.news[i].id === news.id) {
                                return $scope.news[i] = news;
                            }
                        }
                        $scope.addNews();
                    });
                }
                else {
                    News.add(news, function(data) {
                        $scope.news.unshift(data);
                        $scope.addNews();
                    });
                }
            };

            $scope.loadPage = function(page) {
                News.get(function(data) {
                    $scope.news = data;
                    $scope.addNews();
                }, page);
            };

            $scope.tinymceOptions = {
                selector: '#newsContent',
                theme: 'modern',
                fontsize_formats: "8pt 9pt 10pt 11pt 12pt 26pt 36pt",
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking table contextmenu directionality',
                    'emoticons template paste textcolor'
                ],
                toolbar1: 'undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
                image_advtab: true
            };

        }
    ]);
