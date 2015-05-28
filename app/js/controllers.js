'use strict';


var appControllers = angular.module('appControllers', []);

//controller FAQ section
appControllers.controller('FaqCtrl', [function() {
}]);

//controller for Homepage section
appControllers.controller('HomepageCtrl', [function() {
}]);

//controller for Log section
appControllers.controller('LogCtrl', ['$scope', function($scope) {
	
	//logs used to populate the log table in the view
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

//controller for Results section
appControllers.controller('ResultsCtrl', function($scope,$http) {
  	
	
	//variable for the form with default values
	$scope.selectedTest = 'speed';
	$scope.selectedTime = 'days';
	$scope.viewLast='1';
	$scope.showData='false';
	
	//set selected values from form visible
	$scope.setVisible = function() {
	  $scope.showData = true;
	}
		
	$scope.graphData = "";
	
	//get data via AJAX request to populate the graph
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
	
	//create and visualize graph
	$scope.showGraph = function() {
			
		var data = $scope.graphData;
			
		//convert timestamps to dates
		function timestampToDate(timestamp) {
			var d = new Date(); 
			d.setTime(timestamp*1000);
			return d;
		}
			
		//first values will be shown as data labels
		var graphDataX = ['timestamp'];
		var graphDataY = ['download_speed'];
				
		//put data inside the arrays
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
						
//	console.log(graphDataX);
//	console.log(graphDataY);
			
		//create graph
		var chart = c3.generate({ 
			bindto: '#chart',									//HTML element where graph sould be visualized
    	data: {
				x: 'timestamp',
				xFormat: '%Y-%m-%d %H:%M:%S',		//date format
     		columns: [
       		graphDataX,										//graph X and Y data
       		graphDataY
     		]
			},
			axis: {
				x: {
					type: 'timeseries',
					tick: {												//ticks options
						format: '%Y-%m-%d %H:%M:%S',
						rotate: 45,
					}
				}
			}, 
			zoom: {														//zoomable
       	enabled: true
			}
    
		});
	}

});

//controller for Settings section
appControllers.controller('SettingsCtrl', function($scope, $http) {

  $scope.myData = {};
	
	$scope.keys;
	$scope.values;
	
	//AJAX request to get settings from API
  $scope.myData.getSettings = function() {

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
		
		//parse data received via AJAX and use it as variables
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
	
	//AJAX function to send POST request 
	$scope.myData.enableTest = function (data){			
			
		var postresponse = $http.post("http://127.0.0.1:9774/api/config", data);		
			
		postresponse.success(function(data, status, headers, config){			
				
		});
		
		postresponse.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });	
		
		$scope.myData.getSettings();
	}
	
});

//controller for sidebar (state requests)
appControllers.controller('SidebarCtrl', function($scope, $http, $timeout) {
	
	
	$scope.getState = function (url, data) {
		
		alert("url: " + url + " data: " + data);
				
		var response = $http.get(url, data);			
     
    response.success(function(data, status, headers, config) {
			
			$scope.getState("http://127.0.0.1:9774/api/state", data.t);
			
			      
    });
     
    response.error(function(data, status, headers, config) {
			
			$timeout(function() { 
				$scope.getState("http://127.0.0.1:9774/api/state","");
			}, 5000);
		});
	}
	

	
	//$scope.getState("ttp://127.0.0.1:9774/api/state","");
});

