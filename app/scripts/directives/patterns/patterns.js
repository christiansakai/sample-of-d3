'use strict';

angular.module('sampleofd3App')
  .directive('patterns', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/patterns/patterns.html'
    };
  });
