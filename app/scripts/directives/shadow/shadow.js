'use strict';

angular.module('thirdshelfApp')
  .directive('shadow', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/shadow/shadow.html'
    };
  });
