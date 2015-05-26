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

appControllers.controller('ResultsCtrl', ['$scope','$http', function($scope,$http) {
  	
	$scope.selectedTest = 'speed';
	$scope.selectedTime = 'days';
	$scope.viewLast='1';
	$scope.showData='false';
	
	$scope.setVisible = function() {
	  $scope.showData = true;
	}
	
//	$scope.chart = null;
	
	$scope.graphData = "";
	
	$scope.getDataForGraph = function() {
		
		var response = $http.get("http://127.0.0.1:9774/api/data");			
     
   	response.success(function(data, status, headers, config) {
      			
			$scope.graphData = data;
			
			$scope.showGraph();			      
   	});
     
   	response.error(function(data, status, headers, config) {
     	alert("AJAX failed!");
   	});
		
	}
	
	$scope.showGraph = function() {
			
			var data = $scope.graphData;
			
			function timestampToDate(timestamp) {

				var d = new Date(); 
				
				d.setTime(timestamp*1000);
				return d;
			}
			
			var graphDataX = ['timestamp'];
			
			var graphDataY = ['download_speed'];
						
			function getData(data,container1,container2) {													
				for (var i = 0; i<data.length; i++) {
					container1.push(data[i].timestamp);
					container2.push(data[i].download_speed);					
				}
				
				for (var j = 1; j<container1.length; j++) {
					container1[j] = timestampToDate(container1[j]);
				}
			}
			
			
			
			getData(data, graphDataX, graphDataY);
						
			console.log(graphDataX);
			console.log(graphDataY);
			
			var chart = c3.generate({ 
				bindto: '#chart',
    		data: {
					x: 'timestamp',
					xFormat: '%Y-%m-%d %H:%M:%S',
      		columns: [
        		graphDataX,
        		graphDataY
      		]
				},
				axis: {
					x: {
						type: 'timeseries',
						tick: {
							format: '%Y-%m-%d %H:%M:%S',
							rotate: 45,
						}
					}
				}, 
				zoom: {
        	enabled: true
				}
    	
			});
	}

}]);

appControllers.controller('SettingsCtrl', function($scope, $http) {

  $scope.myData = {};
	
	$scope.keys;
	$scope.values;
	
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
			
			$scope.keys = [];
			$scope.values = [];
			
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


