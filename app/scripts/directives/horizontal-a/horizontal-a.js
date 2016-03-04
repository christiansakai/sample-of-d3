'use strict';

angular.module('thirdshelfApp')
  .directive('horizontalA', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/horizontal-a/horizontal-a.html',
      scope: {
        horizontalData: '=',
        donutData: '='
      }
    };
  });