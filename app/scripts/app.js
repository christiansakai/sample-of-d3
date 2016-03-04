'use strict';

/**
 * @ngdoc overview
 * @name App
 * @description
 * # sampleofd3App
 *
 * Main module of the application.
 */
angular
  .module('sampleofd3App', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/bubble.html',
        controller: 'BubbleCtrl',
        controllerAs: 'Bubble'
      })
      .when('/horizontal', {
        templateUrl: 'views/horizontal.html',
        controller: 'HorizontalCtrl',
        controllerAs: 'Horizontal'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
