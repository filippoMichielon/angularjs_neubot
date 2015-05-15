'use strict';


var myApp = angular.module('myApp', [
  'ngRoute',
  'appControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/faq', {
    templateUrl: 'faq/faq.html',
    controller: 'FaqCtrl'
  }).
  when('/log', {
    templateUrl: 'log/log.html',
    controller: 'LogCtrl'
  }).
  when('/homepage', {
    templateUrl: 'homepage/homepage.html',
    controller: 'HomepageCtrl'
  }).
  when('/results', {
    templateUrl: 'results/results.html',
    controller: 'ResultsCtrl'
  }).
  when('/settings', {
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl'
  }).
  otherwise({redirectTo: '/homepage'});
}]);

