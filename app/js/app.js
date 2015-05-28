'use strict';

//here you import all used modules
var myApp = angular.module('myApp', [
  'ngRoute',													//used to route users between views
  'appControllers'
]);

//app configuration
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/faq', {				//when a view is selected, then the correct file must be visualized
    templateUrl: 'partials/faq.html'
  }).
  when('/log', {
    templateUrl: 'partials/log.html'
  }).
  when('/homepage', {
    templateUrl: 'partials/homepage.html'
  }).
  when('/results', {
    templateUrl: 'partials/results.html'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html'
  }).
  otherwise({redirectTo: 'partials/homepage'});
}]);

