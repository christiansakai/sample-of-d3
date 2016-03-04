'use strict';

angular.module('thirdshelfApp')
  .directive('bubbleA', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/bubble-a/bubble-a.html',
      scope: {
        data: '='
      }
    };
  });
