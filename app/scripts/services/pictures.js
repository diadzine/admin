'use strict';

angular.module('adminApp')
    .factory('Pictures', ['$http', 'Server',
        function($http, Server) {
            var picUrl = Server.Url + 'pictures/';
            return {
                upload: function(image, callback) {
                    var formData = new FormData();
                    formData.append('file', image);
                    $http({
                        url: picUrl,
                        method: 'POST',
                        data: formData,
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        },
                    })
                        .then(function(res) {
                            callback(res.data);
                        }, Server.errorHandler);
                }
            };
        }
    ]);
