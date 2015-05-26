'use strict';

//here you import all used modules
var myApp = angular.module('myApp', [
  'ngRoute',													//used to route users between views
  'appControllers'
]);

//app configuration
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/faq', {				//when a view is selected, then the correct file must be visualized
    templateUrl: 'faq/faq.html'
  }).
  when('/log', {
    templateUrl: 'log/log.html'
  }).
  when('/homepage', {
    templateUrl: 'homepage/homepage.html'
  }).
  when('/results', {
    templateUrl: 'results/results.html'
  }).
  when('/settings', {
    templateUrl: 'settings/settings.html'
  }).
  otherwise({redirectTo: '/homepage'});
}]);

