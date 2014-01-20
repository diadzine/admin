'use strict';

angular.module('adminApp')
    .controller('NewsCtrl', function($scope, News) {
        var news = News.getNews(),
            date = new Date().getTime() / 1000;

        $scope.news = news;

        $scope.sendNews = function() {
            var id = parseInt(document.getElementById('newsId').value),
                title = document.getElementById('newsTitle').value,
                content = $scope.tinyMceContent,
                date = document.getElementById('newsDate').value,
                mag = document.getElementById('newsMag').checked ? 1 : 0;
            date = date.split('/');
            date = parseInt(new Date(date[1] + '/' + date[0] + '/' + date[2] +
                '/').getTime() / 1000) + 1;
            if (!(title ||  content || date)) {
                alert('Certains champs ne sont pas remplis.');
                return false;
            }

            News.save(title, content, date, id, mag);
            $scope.addNews();
        };

        $scope.delete = function(newsId) {
            var c = confirm('Voulez vous vraiment supprimer la News n°' +
                newsId + ' ?');
            newsId = parseInt(newsId);
            if (c) {
                News.delete(newsId);
            }
        };

        $scope.addNews = function() {
            $scope.currentNews = {
                date: date
            };
            document.getElementById('newsId').value = '';
            document.getElementById('newsTitle').value = '';
            $scope.sendText = 'Créer News';
            $scope.tinyMceContent = news.content;
        };

        $scope.modify = function(newsId) {
            var news = News.getNews(newsId);
            $scope.currentNews = news;
            document.getElementById('newsTitle').value = news.title;
            $scope.sendText = 'Modifier News';
            $scope.tinyMceContent = news.content;
        };

        $scope.sendText = 'Créer News';

        $scope.currentNews = {
            date: date,
        };

        $scope.tinymceOptions = {
            selector: 'textarea',
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

    });