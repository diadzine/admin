'use strict';

angular.module('adminApp')
    .controller('WidgetsCtrl', function($scope, Widgets) {
        Widgets.get(function(widgets) {
            $scope.widgets = widgets;
            $scope.current = widgets[0];
        });

        $scope.uploadedImage = function(img) {
            console.log(img);
            $scope.current.content += '<img src="' + img +
                '" alt="' + $scope.current.name + '" />';
        };

        $scope.modify = function(place) {
            $scope.current = $scope.widgets[place];
        };

        $scope.save = function() {
            var cur = $scope.current;
            Widgets.save(cur.id, cur.content, cur.name, function() {});
        };

        $scope.tinymceOptions = {
            selector: '#widgetContent',
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
