'use strict';

angular.module('adminApp')
    .directive('tsImageUpload', ['Pictures',
        function(Pictures) {
            return {
                template: '<input style="display:inline;" type="file" multiple class="btn btn-warning" ng-model="upload" id="new-ad-upload-image" />',
                restrict: 'EACM',
                replace: true,
                scope: {
                    callback: '=callback',
                },
                controller: ['$scope', function($scope){
                    $scope.sendFile = function(scope, el) {

                        if (el.val() == '') {
                            return false;
                        }

                        var i = 0;
                        var input = el[0];
                        var images = input.files;
                        for (i = 0; i < images.length; i++) {
                            Pictures.upload(images[i], scope.callback);
                        }
                    };
                }],
                link: function(scope, elem, attrs, ctrl) {
                    elem.on('change', function() {
                        scope.sendFile(scope, elem);
                    });
                }

            };
        }
    ]);
