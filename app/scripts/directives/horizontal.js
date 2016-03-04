'use strict';

angular.module('sampleofd3App')
  .directive('horizontal', function($window) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        showElementOnHover: '@',
        options: '='
      },
      link: function(scope, element, attrs) {
        var options = {};
        options.fakeLastTwo = scope.options.fakeLastTwo || false;
        options.lastTwoSize = scope.options.lastTwoSize || 0.4;
        options.chartHeightCoefficient = scope.options.chartHeightCoefficient || 1;
        options.colorCategory = scope.options.colorCategory || '20';

        // Browser onresize event
        window.onresize = function() {
          scope.$apply();
        };

        //watch for new data and calll scope.render
        scope.$watch('data', function(newData) {
          scope.render(newData);
        }, true);

        // Watch for resize and re-render d3
        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          scope.render(scope.data);
        });


        // https://github.com/mbostock/d3/wiki/Ordinal-Scales
        var d3ColorCategory = {
          '10': d3.scale.category10,
          '20': d3.scale.category20,
          '20b': d3.scale.category20b,
          '20c': d3.scale.category20c
        };

        var chartCoefficient = 0.07; // To compute chart height minus the spacing for legends
        var separatorCoefficient = 0.002; // To compute separator width
        var chartAndLegendCoefficient = 0.13; // Chart height total with spacing for legends
        var colorCategory = options.colorCategory;
        var fontDescender = 2;

        // Chart
        var svg = d3.select(element[0])
          .append('svg');

        scope.render = function(data) {
          // Remove everything
          svg.selectAll('*').remove();

          if (!data) return;

          if (options.fakeLastTwo) {
            var lastTwoMappedSize = options.lastTwoSize ? parseFloat(options.lastTwoSize) : 0.4;
            var firstThreeMappedSize = 1 - lastTwoMappedSize;

            var firstThree = parseFloat(data[0].value) + parseFloat(data[1].value) + parseFloat(data[2].value);
            var onePercentage = parseFloat(data[0].value) / firstThree;
            var twoPercentage = parseFloat(data[1].value) / firstThree;
            var threePercentage = parseFloat(data[2].value) / firstThree;

            var lastTwo = parseFloat(data[3].value) + parseFloat(data[4].value);
            var fourPercentage = 0.5;
            var fivePercentage = 0.5;

            var total = 0;

            data.forEach(function(d) {
              total += parseFloat(d.value);
            });

            data = data.map(function(d, i) {
              switch (i) {
                case 0:
                  d.value = total * firstThreeMappedSize * onePercentage;
                  break;
                case 1:
                  d.value = total * firstThreeMappedSize * twoPercentage;
                  break;
                case 2:
                  d.value = total * firstThreeMappedSize * threePercentage;
                  break;
                case 3:
                  d.value = total * lastTwoMappedSize * fourPercentage;
                  break;
                case 4:
                  d.value = total * lastTwoMappedSize * fivePercentage;
                  break;
              }

              return d;
            });
          }

          // Basic Configuration
          var width = d3.select(element[0]).node().offsetWidth;
          var stackHeight = width * chartCoefficient;
          var separatorWidth = width * separatorCoefficient;
          var height = width * chartAndLegendCoefficient;

          // Layout & Data
          var stack = d3.layout.stack();
          var mappedData = d3.range(data.length)
            .map(function(d) {
              return [{
                x: 0,
                y: parseFloat(data[d].value)
              }];
            });

          var layers = stack(mappedData);

          // Scales
          var yMaxValue = d3.max(layers, function(layer) {
            return d3.max(layer, function(d) {
              return d.y0 + d.y;
            });
          });

          var yScale = d3.scale
            .linear()
            .domain([0, yMaxValue])
            .range([0, width]);


          var colorScale = d3ColorCategory[colorCategory]();

          svg.attr("width", width + separatorWidth) // To include the last separator of the latest data in the array
            .attr("height", height)
            .attr('class', 'horizontal')
            .append("g")
            .attr("transform", "translate(0,0)");


          // Stack Group
          var layer = svg.selectAll(".layer")
            .data(layers)
            .enter()
            .insert("g", ":first-child")
            .attr("transform", function(d) {
              return "translate(" + yScale(d[0].y0) + "," + 0 + ")";
            })
            .attr("class", "layer")
            .style("fill", function(d, i) {
              return data[i].pattern || data[i].color || colorScale(i);
            })
            .on('mouseover', function(d, i) {
              d3.selectAll(scope.showElementOnHover)
                .style('visibility', 'visible');
            })
            .on('mouseout', function(d, i) {
              d3.selectAll(scope.showElementOnHover)
                .style('visibility', 'hidden');
            });

          // Actual Stack Graph
          layer.selectAll("path")
            .data(function(d) {
              return d;
            })
            .enter()
            .append("path")
            .attr("d", function(d, t, i) {
              var topLeftRounded, topRightRounded, bottomLeftRounded, bottomRightRounded;
              topLeftRounded = topRightRounded = bottomLeftRounded = bottomRightRounded = false;
              // Font size * 2 just to give a gap between the text and bottom part of chart
              var height = stackHeight;
              var radius = height / 2;
              var width = yScale(d.y);

              // This bar starting coordinate top left corner
              var startingXCoordinate = 0;
              var startingYCoordinate = 0;

              if (i === 0) {
                topLeftRounded = bottomLeftRounded = true;
              }

              if (i === layers.length - 1) {
                topRightRounded = bottomRightRounded = true;
              }

              return roundedRectangle(startingXCoordinate, startingYCoordinate, width, height, radius, topLeftRounded, topRightRounded, bottomLeftRounded, bottomRightRounded);
            });

          // Separator
          layer.selectAll('rect')
            .data(function(d) {
              return d;
            })
            .enter()
            .append('rect')
            .attr('height', (height - fontDescender) * options.chartHeightCoefficient)
            .attr('width', separatorWidth)
            .attr('x', function(d) {
              return yScale(d.y);
            })
            .attr('y', 0)
            .attr('class', 'separator');

          // Legend
          layer.selectAll('text')
            .data(function(d) {
              return d;
            })
            .enter()
            .append('text')
            .text(function(d, a, i) {
              return data[i].legend;
            })
            .attr('class', 'legend')
            .attr('x', function(d) {
              var textWidth = this.getBBox().width;

              // Small adjustments to give space
              return yScale(d.y) - textWidth - separatorWidth * 5;
            })
            .attr('y', function(d, a, i) {
              var textHeight = this.getBBox().height;
              var textWidth = this.getBBox().width;

              var separator = d3.select(this.previousSibling);

              var width = yScale(d.y);

              if (textWidth < width) {
                separator.attr('height', (height - textHeight - fontDescender) * options.chartHeightCoefficient);
                return (height - textHeight - fontDescender) * options.chartHeightCoefficient;
              }

              return (height - fontDescender) * options.chartHeightCoefficient;
            });
        };

        // Helper Function
        function roundedRectangle(x, y, w, h, r, tl, tr, bl, br) {
          var retval;
          retval = "M" + (x + r) + "," + y;
          retval += "h" + (w - 2 * r);
          if (tr) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r;
          } else {
            retval += "h" + r;
            retval += "v" + r;
          }
          retval += "v" + (h - 2 * r);
          if (br) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r;
          } else {
            retval += "v" + r;
            retval += "h" + -r;
          }
          retval += "h" + (2 * r - w);
          if (bl) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r;
          } else {
            retval += "h" + -r;
            retval += "v" + -r;
          }
          retval += "v" + (2 * r - h);
          if (tl) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r;
          } else {
            retval += "v" + -r;
            retval += "h" + r;
          }
          retval += "z";
          return retval;
        }
      }
    };
  });
