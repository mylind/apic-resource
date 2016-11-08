'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'angular-echarts', 
  'ngRoute'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/get',
      controller: 'getCtrl'
    }).
    when('/view2', {
      templateUrl: 'partials/del',
      controller: 'delCtrl'
    }).
    when('/view3', {
      templateUrl: 'partials/put',
      controller: 'putCtrl'
    }).
    when('/view4', {
      templateUrl: 'partials/clear',
      controller: 'clearCtrl'
    }).
    when('/view5', {
      templateUrl: 'partials/upload',
      controller: 'uploadCtrl5'
    }).
    when('/search', {
      templateUrl: 'partials/search',
      controller: 'search'
    }).
    when('/getUser', {
      templateUrl: 'partials/getUser',
      controller: 'getUserCtrl'
    }).
    when('/response', {
      templateUrl: 'partials/response',
      controller: 'responseCtrl'
    }).
    when('/movie-search', {
      templateUrl: 'partials/movie-search',
      controller: 'moviesearch'
    }).
    when('/starExample', {
      templateUrl: 'partials/starExample',
      controller: 'moviesearch'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
