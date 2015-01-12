'use strict';

angular.module('adminApp')
    .service('Server', function Server($http, $cookies, $location) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        this.Url = 'http://tooski.webfactional.com/api/';
        // this.Url = 'http://127.0.0.1:8000/';

        this.processResponse = function(response) {
            return response.map(function(el) {
                var result = el.fields;
                result.id = el.pk;
                result.date = new Date(result.date)
                    .getTime();
                return result;
            });
        };

        this.errorHandler = function(response, status) {
            alert('Problème de connection avec le serveur. (' + status +
                ')');
            console.log(response, status);
        };

        this.setHeaders = function(key, value) {
            $http.defaults.headers.common[key] = value;
        };

        if ($cookies.tooskiLogin) {
            this.setHeaders('Authorization', $cookies.tooskiLogin);
        }
        else {
            $location.path('#!/');
        }

    });
