'use strict';

angular.module('adminApp')
    .controller('NewsCtrl', function($scope) {
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