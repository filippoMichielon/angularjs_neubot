'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('FaqCtrl', [function() {

}]);

appControllers.controller('HomepageCtrl', [function() {

}]);

appControllers.controller('LogCtrl', ['$scope', function($scope) {
	$scope.logs=[
	 {
		 "message": "raw_negotiate: not reached final state",
		 "severity": "WARNING",
		 "timestamp": 1366195042
	 },
	 {
		 "message": "raw_negotiate: bad response",
			"severity": "ERROR",
		 "timestamp": 1366236483
	 },
	 {
		 "message": "everything OK",
		 "severity": "MESSAGE",
		 "timestamp": 1366236484
	 }
	];
	
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
	
	$scope.keys = [];
	$scope.values = [];
	
  $scope.myData.getSettings = function(item, event) {

    var response = $http.get("http://127.0.0.1:9774/api/config");			
     
    response.success(function(data, status, headers, config) {
      			
      $scope.myData.status = status;
						
			$scope.myData.headers = headers.toString();
			
      $scope.myData.data = data;
			
			$scope.getData($scope.myData.data);
			      
    });
     
    response.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });
		
		$scope.getData = function(data) {
			
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            $scope.keys.push(key);
						$scope.values.push(data[key]);
          }
        }
			console.log($scope.keys);
			console.log($scope.values);
		}
  }
	
	$scope.myData.enableTest = function (data){			
			
		var postresponse = $http.post("http://127.0.0.1:9774/api/config", data);		
			
		postresponse.success(function(data, status, headers, config){			
				
		});
		
		postresponse.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });	
	}
	
});


