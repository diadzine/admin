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
            template: '<input style="display:inline;" type="file" class="cloudinary-fileupload btn btn-primary" name="file" data-cloudinary-field="image_id" data-form-data="{{cloudinaryData}}" />',
            restrict: 'EACM',
            link: function postLink(scope, element, attrs) {
                jQuery.getScript(
                    'bower_components/cloudinary/js/jquery.cloudinary.js',
                    function(data) {

                        $.cloudinary.config({
                            cloud_name: 'tooski',
                            api_key: '664376587529146'
                        });

                        /* Here I should get the signature from the server.
                        TODO:
                        - install cloudinary on server, local and prod and pip freeze
                        - config cloudinary server,
                        - load signature from server to client
                        - write callback in client once the file has been uploaded
                        - find a way so that cloudinary bower component doesn't have to be loaded each time (eval)
                        - Implement special callback for ads.*/

                        debugger;
                        scope.cloudinaryData = {
                            // timestamp: 1345719094,
                            cloud_name: 'tooski',
                            callback: "/cloudinary_cors.html",
                            signature: "YHcBvOXBRmOroGCAxnpx_e5jFp0",
                            api_key: "664376587529146"
                        };

                    });
            }
        };
    });