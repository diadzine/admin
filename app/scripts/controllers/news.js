'use strict';

angular.module('adminApp')
    .controller('NewsCtrl', function($scope, News) {
        var news = News.getNews(),
            date = new Date().getTime() / 1000;


        $scope.news = news;

        $scope.sendNews = function() {
            alert('News Sent');
            // should check date, title, tinymce
            // if id = -1 create new, else, modify


        };

        $scope.addNews = function() {
            $scope.currentNews = {
                date: date,
            };
            $scope.sendText = 'Créer News';
            $scope.tinyMceContent = news.content;
        };

        $scope.modify = function(newsId) {
            var news = News.getNews(newsId);
            $scope.currentNews = news;
            $scope.sendText = 'Modifier News';
            $scope.tinyMceContent = news.content;
            // TODO: implement change content of tinymce. (not working yet.)
            // change doc.getEl with a scope variable. change also in view.
        };

        $scope.sendText = 'Créer News';

        $scope.currentNews = {
            date: date,
        };

        $scope.tinymceOptions = {
            selector: "textarea",
            theme: "modern",
            plugins: [
                "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars code fullscreen",
                "insertdatetime media nonbreaking table contextmenu directionality",
                "emoticons template paste textcolor"
            ],
            toolbar1: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
            image_advtab: true
        };

    });