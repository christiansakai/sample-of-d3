'use strict';

angular.module('sampleofd3App')
  .directive('bubbleA', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/bubble-a/bubble-a.html',
      scope: {
        data: '='
      }
    };
  });
