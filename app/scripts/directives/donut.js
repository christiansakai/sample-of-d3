/**
 * Created by christiansakai on 10/6/15.
 */
'use strict';

angular.module('thirdshelfApp')
  .directive('donut', function ($window, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function (scope, element, attrs) {
        // d3 is the raw d3 object
        var radius = 100;
        var pi     = Math.PI * 2;

        scope.$watch('data', function (newData) {
          scope.render(newData);
        }, true);

        // what happens when browser on resize event
        window.onresize = function () {
          scope.$apply();
        };

        // Watch for resize event
        scope.$watch(function () {
          return angular.element($window)[0].innerWidth;
        }, function () {
          scope.render(scope.data);
        });

        //append inital svg
        var svgContainer = d3.select(element[0])
          .append('svg')
          .attr("width", 200)
          .attr("height", 200);

        scope.render = function (data) {
          // our custom d3 code

          // remove all previous items before render. If this isn't done, previous svg stuff might be left in the dom.
          svgContainer.selectAll('*').remove();

          // If we don't pass any data, return out of the element
          if (!data) return;

          //convert percentage data to radians
          var radianArr = scope.data.map(function (perc) {
            return ((perc / 100) * 360) * Math.PI / 180;
          });

          var arcOuter = d3.svg.arc()
            .innerRadius(radius - 15)
            .outerRadius(radius - 0)
            .startAngle(0)
            .endAngle(radianArr[0]) //just radians

          var arcInner = d3.svg.arc()
            .innerRadius(radius - 15)
            .outerRadius(radius - 30)
            .startAngle(0)
            .endAngle(radianArr[1]) //just radians

          var outerArc = svgContainer.append("path")
            .attr("d", arcOuter)
            .attr("fill", "#777F7E")
            .attr("transform", "translate(100,100)");

          var innerArc = svgContainer.append("path")
            .attr("d", arcInner)
            .attr("fill", "#1EACFB")
            .attr("transform", "translate(100,100)");

          var circle = svgContainer.append("circle")
            .attr("cx", 160)
            .attr("cy", 30)
            .attr("r", 21)
            .style("fill", "#777F7E");

          //make sure that the text doesn't have a decimal above 9.9;
          var multiplier = ((scope.data[0] / scope.data[1]));
          var textXcoord;

          if (multiplier > 9.9) {
            multiplier = ((scope.data[0] / scope.data[1])).toFixed(0) + 'x';
            textXcoord = 148;
          } else {
            multiplier = ((scope.data[0] / scope.data[1])).toFixed(1) + 'x';
            textXcoord = 146;
          }

          var text = svgContainer.append("text")
            .attr("x", textXcoord)
            .attr("y", 35)
            .text(function (d) {
              return multiplier;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "white");
        }
      }
    };
  });

