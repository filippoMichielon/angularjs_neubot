'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('FaqCtrl', [function() {

}]);

appControllers.controller('HomepageCtrl', [function() {

}]);

appControllers.controller('LogCtrl', [function() {

}]);

appControllers.controller('ResultsCtrl', ['$scope', function($scope) {
  	
	$scope.selectedTest = 'speed';
	$scope.selectedTime = 'days';
	$scope.viewLast='1';
	$scope.showData='false';
	
	$scope.setVisible = function() {
	  $scope.showData = true;
	}

}]);

appControllers.controller('SettingsCtrl', function($scope, $http) {

  $scope.myData = {};
  $scope.myData.doClick = function(item, event) {

    var response = $http.get("http://127.0.0.1:9774/api/config");
     
    response.success(function(data, status, headers, config) {
      
      $scope.myData.status = status;
      $scope.myData.data = data;
      $scope.myData.headers = headers;
				
			alert(JSON.parse(data));
      
    });
     
    response.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });
  }
});


