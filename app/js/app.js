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
  
  $translateProvider.translations('en', translationsEN);
  
  $translateProvider.translations('it', translationsIT);
  
  $translateProvider.preferredLanguage('en');
  
}]);

var translationsEN = {
  'TITLE': 'Hello',
  'PARAGRAPH1': 'Welcome to Neubot interface FAQ section!',
  'PARAGRAPH2': 'To be honest, in this section you won\'t find the actual Neubot FAQ, it was just used to test angular-translate module.'

};
 
var translationsIT = {
  'TITLE': 'Ciao',
  'PARAGRAPH1': 'Benvenuto nella sezione dell\'interfaccia di Neubot dedicata alle domande più frequenti!',
  'PARAGRAPH2': 'In questa sezione non troverai veramente le FAQ di Neubot, è stata semplicemente utilizzata per testare il modulo angular-translate.'
};