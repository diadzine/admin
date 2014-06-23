'use strict';

angular.module('adminApp')
    .controller('NewsCtrl', ['$scope', 'News',
        function($scope, News) {
            var news = [],
                date = new Date()
                    .getTime();


            News.getNews(function(response) {
                news = response;
                $scope.news = news;
            });

            $scope.sendNews = function() {
                var id = parseInt($scope.currentNews.id),
                    title = $scope.currentNews.title,
                    content = $scope.currentNews.content,
                    date = $scope.currentNews.date,
                    mag = document.getElementById('newsMag')
                        .checked ? 1 : 0;
                if (!(title ||  content || date)) {
                    alert('Certains champs ne sont pas remplis.');
                    return false;
                }

                News.save(function(response) {
                    news = response;
                    $scope.news = news;
                }, title, content, date, id, mag);
                $scope.addNews();
            };

            $scope.$on('tsImageUploaded', function(event, img) {
                console.log(img);
                $scope.currentNews.content += '<img src="' + img +
                    '" alt="' + $scope.currentNews.title + '" />';
            });

            $scope.delete = function(newsId) {
                var c = confirm('Voulez vous vraiment supprimer la News n°' +
                    newsId + ' ?');
                newsId = parseInt(newsId);
                if (c) {
                    News.delete(function(response) {
                        news = response;
                        $scope.news = response;
                    }, newsId);
                }
            };

            $scope.addNews = function() {
                $scope.currentNews = {
                    date: date,
                    content: '',
                    mag: 0
                };
                document.getElementById('newsMag')
                    .checked = false;
                $scope.sendText = 'Créer News';
            };

            $scope.modify = function(newsId) {
                News.getNews(function(response) {
                    $scope.currentNews = response;
                    $scope.sendText = 'Modifier News';
                }, newsId);
            };

            $scope.sendText = 'Créer News';

            $scope.currentNews = {
                date: date,
                content: '',
            };

            $scope.tinymceOptions = {
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
