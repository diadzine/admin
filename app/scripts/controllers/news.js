'use strict';

angular.module('adminApp')
    .controller('NewsCtrl', function($scope, News) {
        var news = News.getNews();


        $scope.news = news;

        $scope.sendNews = function() {
            alert('News Sent');
            // should check date, title, tinymce
            // if id = -1 create new, else, modify
        };

        $scope.addNews = function() {
            // Should reset tinymce, the date, title and id field. change text of button.
        };

        $scope.modify = function(newsId) {
            // TODO: implement change content of tinymce. (not working yet.)
            var news = News.getNews(newsId);
            document.getElementById('newsSend').innerHTML =
                'Envoyer modifications';
            document.getElementById('newsTitle').value = news.title;
            document.getElementById('tinymce').innerHTML = news.content;
            document.getElementById('newsId').value = news.id;
            $scope.tinyMceContent = news.content;
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