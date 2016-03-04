'use strict';

angular.module('thirdshelfApp')
  .directive('patterns', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/patterns/patterns.html'
    };
  });