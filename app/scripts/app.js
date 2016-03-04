'use strict';

/**
 * @ngdoc overview
 * @name thirdshelfApp
 * @description
 * # thirdshelfApp
 *
 * Main module of the application.
 */
angular
  .module('thirdshelfApp', [
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