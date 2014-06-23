'use strict';

/**
 * This directive uploads an image to the server which uploads it to cloudinary.
 * Then tooski backend returns the link of the image to this directive, which will execute
 * a callback. This callback should be able to change depending on the controller.
 * (And how the directive is defined in it.)
 */
angular.module('adminApp')
    .directive('tsImageUpload', function(Pictures) {
        return {
            template: '<input style="display:inline;" type="file" multiple class="btn btn-primary" id="tsImageUploader" ng-model="upload" ng-change="uploadImage(this)" />',
            restrict: 'EACM',
            link: function postLink(scope, element, attrs) {
                scope.uploadImage = function(input) {
                    var i = 0,
                        images = angular.element('#tsImageUploader')[0].files;
                    for (i = 0; i < images.length; i++) {
                        Pictures.upload(images[i], function(newUrl) {
                            scope.$emit('tsImageUploaded', newUrl);
                        });
                    }
                };
            }

        };
    });
