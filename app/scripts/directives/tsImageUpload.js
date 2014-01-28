'use strict';

/**
 * This directive uploads an image to the server which uploads it to cloudinary.
 * Then tooski backend returns the link of the image to this directive, which will execute
 * a callback. This callback should be able to change depending on the controller.
 * (And how the directive is defined in it.)
 */
angular.module('adminApp')
    .directive('tsImageUpload', function() {
        return {
            template: '<div></div>',
            restrict: 'EACM',
            link: function postLink(scope, element, attrs) {
                element.text('this is the tsImageUpload directive');
            }
        };
    });