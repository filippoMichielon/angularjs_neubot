'use strict';

//here you import all used modules
var myApp = angular.module('myApp', [
  'ngRoute', //used to route users between views
  'appControllers',
  'pascalprecht.translate'
]);

//app configuration
myApp.config(['$routeProvider', '$translateProvider', function($routeProvider, $translateProvider) {
  $routeProvider.when('/faq', { //when a view is selected, then the correct file must be visualized
    templateUrl: 'partials/faq.html',
    controller: 'FaqCtrl'
  }).
  when('/log', {
    templateUrl: 'partials/log.html',
    controller: 'LogCtrl'
  }).
  when('/homepage', {
    templateUrl: 'partials/homepage.html',
    controller: 'HomepageCtrl'
  }).
  when('/results', {
    templateUrl: 'partials/results.html',
    controller: 'ResultsCtrl'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsCtrl'
  }).
  otherwise({
    redirectTo: 'partials/homepage'
  });
  
  $translateProvider
    .translations('en', translationsEN)
    .translations('it', translationsIT)
    .preferredLanguage('en')
    .fallbackLanguage('en');  
}]);