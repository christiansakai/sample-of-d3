'use strict';

angular.module('sampleofd3App')
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
