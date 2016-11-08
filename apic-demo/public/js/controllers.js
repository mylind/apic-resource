'use strict';
//var rotation = require('rotation');
/* Controllers */

angular.module('myApp.controllers', []).

  controller('AppCtrl', function ($scope, $http) {
    
    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name ='Hello '+ data.name;

    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('moviesearch', function ($scope, $http) {
    // write Ctrl here
    $scope.title = 'Search Movies via a Picture';
    $scope.starExample=[
      [
        {"url": "https://raw.githubusercontent.com/mylind/apic-resource/master/pictures/0016e64591080b9bf8e950.jpg"},
        {"url": "https://raw.githubusercontent.com/mylind/apic-resource/master/pictures/0022686d2c05180fbe1824.jpg"},
        {"url": "https://raw.githubusercontent.com/mylind/apic-resource/master/pictures/2012022717254210.jpg"},
        {"url": "https://raw.githubusercontent.com/mylind/apic-resource/master/pictures/201507171429393827.jpg"},
        {"url": "https://raw.githubusercontent.com/mylind/apic-resource/master/pictures/201507171431599249.jpg"},
        {"url": "https://raw.githubusercontent.com/mylind/apic-resource/master/pictures/201507171433597760.jpg"}
      ],
      [
        {"url": "https://raw.githubusercontent.com/mylind/apic-resource/master/pictures/201507171434145740.jpg"}
      ]
        ];
    console.log('moviesearch enter!');
    $scope.setinput = function(url){
      $scope.email=url;

    };
    $scope.searchactor = function(){
      console.log('searchactor enter!');
      $http({
        method: 'GET',
        url: 'https://api.eu.apiconnect.ibmcloud.com/feizhaocnibmcom-dev/sb/searchpicture/search?pic_url='+$scope.email,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/xml",
          "X-IBM-Client-Id": "1cdb34b3-fc86-462b-84f0-82f32cf5a160"
        }
      }).success(function(data, status){
        console.log(data);
        if (!Array.isArray(data.movies))
        {
          console.log("Sorry, I do not know who is that.");
          $scope.success=false;
          $scope.images = data.images[0].faces;
          console.log(data.images[0].faces);
          $scope.movielist="Sorry, I do not know who is that.";

        }else
        {
          console.log("Oh, I know who is that.");
          $scope.success=true;
          $scope.movies=data.movies;
          $scope.movielist="Movie List for " + data.name;
        }
        

        /*
        $scope.movies = [
          {
            "cast": [
              "Angela Lansbury",
              "Esther Williams",
              "Arlene Dahl",
              "Evelyn Keyes"
            ],
            "director": "Peter Jones",
            "genre": [
              "Documentary",
              "History"
            ],
            "imdb": {
              "rating": 7.9,
              "votes": 176,
              "id": "tt0274530"
            },
            "poster": "http://ia.media-imdb.com/images/M/MV5BMTY5ODk0ODE2NV5BMl5BanBnXkFtZTcwNjA4NjIyMQ@@._V1_SX300.jpg",
            "rating": null,
            "runtime": "60 min",
            "title": "Glorious Technicolor",
            "writer": [
              "Fred Basten (book)",
              "Peter Jones"
            ],
            "year": 1998,
            "id": "274530"
          },
          {
            "cast": [
              "Angela Lansbury",
              "Ken Anderson",
              "Rudy Behlmer",
              "Jeff Bennett"
            ],
            "director": "Harry Arends",
            "genre": [
              "Documentary",
              "Short",
              "Family"
            ],
            "imdb": {
              "rating": 7.7,
              "votes": 60,
              "id": "tt0344378"
            },
            "poster": null,
            "rating": "UNRATED",
            "runtime": "39 min",
            "title": "Disney's 'Snow White and the Seven Dwarfs': Still the Fairest of Them All",
            "writer": [
              "Harry Arends",
              "Phil Savenick"
            ],
            "year": 2001,
            "id": "344378"
          }
        ];
        */

      }).error(function(data, status){
        console.log(status);

      })
    }

  }).
  controller('GetUserResponse', function ($scope, $http) {
    
    $scope.user = 'response';
  });

