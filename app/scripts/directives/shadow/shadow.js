'use strict';

angular.module('sampleofd3App')
  .directive('shadow', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/shadow/shadow.html'
    };
  });
