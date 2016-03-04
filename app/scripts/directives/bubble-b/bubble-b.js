'use strict';

angular.module('thirdshelfApp')
  .directive('bubbleB', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/bubble-b/bubble-b.html',
      scope: {
        data: '='
      }
    };
  });
