// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forcastController'
	})
	.when('/forecast/:days', {
		templateUrl: 'pages/forecast.html',
		controller: 'forcastController'
	});
});

// SERVICES
weatherApp.service('cityService', function(){
	this.city = "Albion, ID";
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){

	$scope.city = cityService.city;

	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	})

}]);

weatherApp.controller('forcastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){

	$scope.days = $routeParams.days || '2';

	$scope.city = cityService.city;

	$scope.weatherAPI = $resource(
		'http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&appid=28a969a261a78e28366148c2834ac774', {
			callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt:$scope.days });

	$scope.convertToFahrenheit = function(degK){
		return Math.round((1.8*(degK-273))+32);
	}

	$scope.convertToDate = function(date){
		return new Date(date*1000);
	}

}]);

// DIRECTIVES
weatherApp.directive('weatherReport', function(){
	return {
		restrict: 'E',
		templateUrl: 'directives/weatherReport.html',
		replace: true,
		scope: {
			weatherDay: "=",
			convertToStandard: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	}
});