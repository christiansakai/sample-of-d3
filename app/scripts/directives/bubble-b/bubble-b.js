'use strict';

angular.module('sampleofd3App')
  .directive('bubbleB', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/bubble-b/bubble-b.html',
      scope: {
        data: '='
      }
    };
  });
