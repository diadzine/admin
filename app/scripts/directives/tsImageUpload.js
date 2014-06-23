'use strict';

angular.module('adminApp')
    .directive('tsImageUpload', function(Pictures) {
        return {
            template: '<input style="display:inline;" type="file" multiple class="btn btn-warning" ng-model="upload" ng-change="uploadImage()" />',
            restrict: 'EACM',
            replace: true,
            scope: {
                callback: '=callback',
            },
            link: function postLink(scope, element, attrs) {
                element.onchange = function() {
                    console.log('don\'t erase this line.');
                };
                var t = element;
                scope.uploadImage = function() {
                    var i = 0,
                        input = element[0],
                        images = input.files;
                    for (i = 0; i < images.length; i++) {
                        Pictures.upload(images[i], scope.callback);
                    }
                };
            }

        };
    });
