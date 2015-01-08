'use strict';

angular
    .module('adminApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.tinymce',
        'ui.bootstrap',
    ])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/News', {
                templateUrl: 'views/news.html',
                controller: 'NewsCtrl'
            })
            .when('/Pages', {
                templateUrl: 'views/pages.html',
                controller: 'PagesCtrl'
            })
            .when('/Blog', {
                templateUrl: 'views/blog.html',
                controller: 'BlogCtrl'
            })
            .when('/Pub', {
                templateUrl: 'views/pub.html',
                controller: 'PubCtrl'
            })
            .when('/Skiclubs', {
                templateUrl: 'views/skiclubs.html',
                controller: 'SkiclubsCtrl'
            })
            .when('/Widgets', {
                templateUrl: 'views/widgets.html',
                controller: 'WidgetsCtrl'
            })
            .when('/Angulation', {
                templateUrl: 'views/angulation.html',
                controller: 'AngulationCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(false)
            .hashPrefix('!');
    });
