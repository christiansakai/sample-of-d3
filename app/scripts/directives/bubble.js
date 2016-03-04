'use strict';

angular.module('sampleofd3App')
  .directive('bubble', function($window) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        options: '='
      },
      link: function(scope, element, attrs) {
        var options = {};

        options.displayInsights = scope.options.displayInsights || false;
        options.displayHeader = scope.options.displayHeader || false;
        options.displayLegend = scope.options.displayLegend || false;
        options.colorCategory = scope.options.colorCategory || '20';
        options.bubbleMinSize = scope.options.bubbleMinSize || 0;
        options.minimumDifferences = scope.options.minimumDifferences || 0;

        //watch for new data and calll scope.render
        scope.$watch('data', function(data) {
          scope.render(data);
        }, true);


        // Browser onresize event
        window.onresize = function() {
          scope.$apply();
        };

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

        // SVG
        var svg = d3.select(element[0])
          .append('svg');

        scope.render = function(data) {
          // Remove everything
          svg.selectAll('*').remove();

          if (!data) return;

          // Sort Data
          data = _.sortBy(data, '-value');

          /**
           * Base
           */
          var displayInsights = options.displayInsights; // Whether insights is displayed or not
          var displayHeader = options.displayHeader; // Whether header is displayed or not
          var displayLegend = options.displayLegend; // Whether legend is displayed or not

          // Coefficients
          var heightToWidthRatio = 1.4; // chartHeight = chartWidth * heightToWidthRatio
          var dataInsightsGapToWidthRatio = 0.01; // dataInsightsGap = dataInsightsGaptoWidthRatio

          if (displayHeader) {
            heightToWidthRatio = 1.6;
          }

          if (displayInsights) {
            heightToWidthRatio = 0.77;

            if (!displayHeader) {
              heightToWidthRatio = 0.7;
            }
          }

          // Vars
          var colorCategory = options.colorCategory;
          var chartWidth = d3.select(element[0]).node().offsetWidth; // chart width is 100% of its parents container
          var chartHeight = chartWidth * heightToWidthRatio;
          var dataInsightsGap = dataInsightsGapToWidthRatio * chartWidth; // Horizontal gap between data section and insights section

          // Scales
          var colorScale = d3ColorCategory[colorCategory]();

          // Chart Group
          var chart = svg.attr('width', chartWidth)
            .attr('height', chartHeight)
            .attr('class', 'bubble-chart')
            .append('g')
            .attr('transform', "translate(0,0)");

          /**
           * Bubbles Header
           */
          // Vars
          var bubbleHeaderUnderlineThickness = 2;
          var bubbleHeaderUnderlineLength = chartWidth;
          var bubbleHeaderStartingXCoordinate = 0;
          var bubbleHeaderStartingYCoordinate = 0;
          var bubbleHeaderHeight = 0;

          if (displayInsights) {
            bubbleHeaderUnderlineLength = (chartWidth - dataInsightsGap) / 2; // Same as bubble radius
          }

          if (displayHeader) {
            // Header Group
            var bubbleHeader = chart.append('g')
              .attr('class', 'header')
              .attr('transform', "translate(" + bubbleHeaderStartingXCoordinate + "," + bubbleHeaderStartingYCoordinate + ")");

            // Title
            var bubbleTitle = bubbleHeader.append('text')
              .attr('class', 'title')
              .attr('id', 'data')
              .text('Data');

            // Title adjustments
            d3.select('.header .title#data')
              .each(function(a, b) {
                var textHeight = this.getBBox().height;

                // change coordinate of parent node
                this.parentNode
                  .setAttribute('transform', "translate(0," + textHeight + ")");
              });

            // Underline
            var bubbleUnderline = bubbleHeader.append('rect')
              .attr('class', 'underline')
              .attr('y', bubbleHeaderUnderlineThickness)
              .attr('height', bubbleHeaderUnderlineThickness)
              .attr('width', bubbleHeaderUnderlineLength);

            // Final vars
            d3.select('.header').each(function() {
              bubbleHeaderHeight = this.getBoundingClientRect().height;
            });
          }

          /**
           * Bubbles
           */
          // Vars
          var bubbleDiameter = chartWidth;
          var bubbleStartingYCoordinate = 20;

          if (displayHeader) {
            bubbleStartingYCoordinate = bubbleHeaderHeight;
          }

          if (displayInsights) {
            // Actual bubble chart takes 50% of width space minus the horizontal gap
            bubbleDiameter = (chartWidth - dataInsightsGap) / 2;
          }

          // Scales
          var bubbleScale = d3.scale
            .linear()
            .domain([0, data[0].value])
            .range([0, bubbleDiameter]);


          // Data manipulation
          data = _.map(data, function(d, i) {
            var newObj = _.clone(d, true);

            newObj.realValue = d.value;

            // Minimum bubble size
            if (i === data.length - 1) {
              var smallestData = data[i].value;
              var largestDataTimesMinBubbleSize = data[0].value * options.bubbleMinSize;

              newObj.value = smallestData > largestDataTimesMinBubbleSize ? smallestData : largestDataTimesMinBubbleSize;
            }

            newObj.value = parseInt(newObj.value);
            newObj.realValue = parseInt(newObj.realValue);

            return newObj;
          });


          // Adjusting differences
          var temp = [];

          var minimumDifferences = data[0].value * options.minimumDifferences;

          var j = -1;
          for (var i = data.length - 1; i >= 0; i--) {
            if (i < data.length - 1) {
              var differences = data[i].value - temp[j].value;
              if (differences < minimumDifferences) {
                data[i].value = data[i].value + minimumDifferences - differences;
              }
            }

            temp.push(data[i]);
            j++;
          }

          data = temp.reverse();

          // Bubbles Group
          var bubbles = chart.append('g')
            .attr('transform', "translate(0," + bubbleStartingYCoordinate + ")");

          // Bubble Group
          var bubbleGroup = bubbles.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', "translate(0,0)");

          /**
           * Paths
           */

          if (displayInsights) {
            var strokeWidth = options.pathStrokeWidth || 1.5;
            var pathColor = options.pathColor || '#2E3642';
            var totalInsightsHeight = bubbleDiameter; // Same with insight
            var insightHeight = totalInsightsHeight / data.length; // Same with insight
            var horizontalPathLength = (bubbleDiameter / 4);

            bubbleGroup
              .append('path')
              .attr('d', function(d, i) {
                var startingXCoordinate = bubbleScale(data[0].value / 2);
                var startingYCoordinate = bubbleScale(data[0].value) - bubbleScale(d.value / 2);

                var cornerXCoordinate = startingXCoordinate + bubbleScale(data[0].value / 3);
                var cornerYCoordinate = insightHeight * i;

                var endXCoordinate = cornerXCoordinate + horizontalPathLength;
                var endYCoordinate = cornerYCoordinate;

                return "M" + startingXCoordinate + " " + startingYCoordinate + " " + "L" + cornerXCoordinate + " " + cornerYCoordinate + " " + "L" + endXCoordinate + " " + endYCoordinate;
              })
              .style('fill', 'none')
              .attr('stroke', pathColor)
              .attr('stroke-width', strokeWidth);
          }

          /**
           * Bubble
           */

          bubbleGroup
            .append('circle')
            .style("filter", function() {
              if (angular.element('#shadow').length) {
                return "url(#shadow)";
              }

              return "";
            })
            .attr('class', 'bubble')
            .attr('cx', bubbleScale(data[0].value / 2))
            .attr('cy', function(d) {
              return bubbleScale(data[0].value) - bubbleScale(d.value / 2);
            })
            .attr('r', function(d) {
              return bubbleScale(d.value / 2);
            })
            .attr('fill', function(d) {
              return d.pattern || d.color || colorScale(d.value);
            });

          /**
           * Legends
           */

          if (displayLegend) {

            // Coefficient
            var legendHeightToWidthRatio = 0.4; // 2:5 // legendHeight = legendHeightToWidthRatio * legendWidth;
            var bubblesToLegendsGapComparedToChartHeightRatio = 0; // bubblesToLegendsGap = bubblesToLegendsGapComparedToChartHeightRatio * chartHeight;

            // Vars
            var bubblesToLegendsGap = bubblesToLegendsGapComparedToChartHeightRatio * chartHeight; // Vertical gap between bubbles to below legends
            var legendStartingXCoordinate = bubbleHeaderHeight + bubbleDiameter + bubblesToLegendsGap + 50;

            var legendsPerRow = 3;
            var legendsTotalWidth = bubbleDiameter;
            var legendWidth = legendsTotalWidth / legendsPerRow;

            var legendHeight = legendHeightToWidthRatio * legendWidth;
            var legendRadius = 6; // The small circle in legends

            var legendCircleLegendNumberGap = legendRadius * 2.5; // Horiztonal gap between small circle and its numbers
            var legendNumberLegendLegendGap = legendRadius * 2; // Vertical gap between legend number and its legend

            // Legends Group
            var legends = chart.append('g')
              .attr('transform', "translate(" + 0 + ',' + legendStartingXCoordinate + ")");

            var legendGroup = legends.selectAll('g')
              .data(data)
              .enter()
              .append('g')
              .attr('class', 'legend-group')
              .attr('transform', function(d, i) {
                var column = i % legendsPerRow;
                var row = Math.floor(i / legendsPerRow);
                return "translate(" + ((legendWidth + 20) * column) + ',' + (legendHeight * row) + ")"
              });

            var legendCircle = legendGroup.append('circle')
              .attr('cx', legendRadius)
              .attr('r', legendRadius)
              .attr('fill', function(d) {
                return d.pattern || d.color || colorScale(d.value);
              });

            var legendNumber = legendGroup.append('text')
              .text(function(d) {
                return d3.format("$,")(d.realValue);
              })
              .attr('class', 'number')
              .attr('x', legendCircleLegendNumberGap + legendRadius)
              .attr('y', legendRadius);

            var legendLegend = legendGroup.append('text')
              .text(function(d) {
                return d.legend;
              })
              .attr('class', 'legend')
              .attr('x', legendCircleLegendNumberGap + legendRadius)
              .attr('y', legendNumberLegendLegendGap + legendRadius);

            // Wrap the Text Legend
            legendGroup.selectAll('text.legend')
              .call(wrap, legendWidth); // See the helper wrap function below
          }


          if (displayInsights) {
            drawInsights();
          }

          // INSIGHTS AREA
          function drawInsights() {
            /**
             * Insights Header
             */
            // Vars
            var insightsHeaderUnderlineThickness = 2;
            var insightsHeaderUnderlineLength = (chartWidth - dataInsightsGap) / 2; // Same as bubble radius
            var insightsHeaderStartingXCoordinate = bubbleDiameter + dataInsightsGap;
            var insightsHeaderHeight = 0;

            if (displayHeader) {
              // Header Group
              var insightsHeader = chart.append('g')
                .attr('class', 'header')
                .attr('transform', "translate(" + insightsHeaderStartingXCoordinate + ",0)");

              // Title
              var bubbleTitle = insightsHeader.append('text')
                .attr('class', 'title')
                .attr('id', 'insights')
                .text('Insights');

              // Title adjustments
              d3.select('.header .title#insights')
                .each(function() {
                  var textHeight = this.getBBox().height;

                  // change coordinate of parent node
                  this.parentNode
                    .setAttribute('transform', "translate(" + insightsHeaderStartingXCoordinate + "," + textHeight + ")");
                });

              //Underline
              var bubbleUnderline = insightsHeader.append('rect')
                .attr('class', 'underline')
                .attr('y', insightsHeaderUnderlineThickness)
                .attr('height', insightsHeaderUnderlineThickness)
                .attr('width', insightsHeaderUnderlineLength);

              // Final vars
              d3.select('.header').each(function() {
                insightsHeaderHeight = this.getBoundingClientRect().height;
              });
            }

            /**
             * Insight Groups
             */
            // Vars
            var insightStartingXCoordinate = insightsHeaderStartingXCoordinate;
            var insightStartingYCoordinate = 20;
            var totalInsightsHeight = bubbleDiameter;
            var insightHeight = totalInsightsHeight / data.length;
            var insightWidth = (chartWidth - bubbleDiameter - dataInsightsGap) / 2;

            if (displayHeader) {
              insightStartingYCoordinate = insightsHeaderHeight;
            }

            // Insights
            var insights = chart.append('g')
              .attr('transform', "translate(" + insightStartingXCoordinate + ',' + insightStartingYCoordinate + ")")

            // Insight Groups
            var insightGroup = insights.selectAll('g')
              .data(data)
              .enter()
              .append('g')
              .attr('class', 'insight-group')
              .attr('transform', function(d, i) {
                // Text alignment is center
                return "translate(" + (insightWidth / 2) + "," + insightHeight * i + ")";
              });

            // Previous Group
            var previousInsightGroup = insightGroup.append('g')
              .attr('transform', "translate(0,0)");

            var previousNumber = previousInsightGroup.append('text')
              .attr('class', 'number')
              .attr('text-anchor', 'middle')
              .text(function(d) {
                if (d.value < 1) {
                  return 'N/A';
                } else {
                  if (d.insights[0].number) {
                    return d.insights[0].number;
                  } else {
                    return 'N/A';
                  }
                }
              });

            var previousTitle = previousInsightGroup.append('text')
              .attr('class', 'title')
              .attr('text-anchor', 'middle')
              .text(function(d) {
                return d.insights[0].title;
              });

            // Adjustments for title
            d3.selectAll('.insight-group .title')
              .each(function() {
                var textHeight = this.getBBox().height;
                this.setAttribute('y', textHeight);
              });

            var previousDescription = previousInsightGroup.append('text')
              .attr('class', function(d) {
                return 'description ' + upOrDown(d);
              })
              .attr('text-anchor', 'middle')
              .style('fill', upOrDown)
              .text(function(d) {
                return d.insights[0].description;
              });

            // Adjustments for description
            d3.selectAll('.insight-group .description')
              .each(function() {
                var previousTextHeight = this.previousElementSibling.getBBox().height;
                var textHeight = this.getBBox().height;

                this.setAttribute('y', previousTextHeight + textHeight);
              });

            // Next Group
            var nextInsightGroup = insightGroup.append('g')
              .attr('transform', "translate(" + (insightWidth) + ",0)");

            var nextNumber = nextInsightGroup.append('text')
              .attr('class', 'number')
              .attr('text-anchor', 'middle')
              .text(function(d) {
                if (d.insights.length > 1) {
                  if (d.value < 1) {
                    return 'N/A';
                  } else {
                    return d.insights[1].parsedNumber;
                  }
                }
              });

            var nextTitle = nextInsightGroup.append('text')
              .attr('class', 'title')
              .attr('text-anchor', 'middle')
              .text(function(d) {
                if (d.insights[1]) {
                  return d.insights[1].title;
                }
              });

            // Adjustments for title
            d3.selectAll('.insight-group .title')
              .each(function() {
                var textHeight = this.getBBox().height + 5;
                this.setAttribute('y', textHeight);
              });

            var nextDescription = nextInsightGroup.append('text')
              .attr('class', function(d) {
                return 'description ' + upOrDown(d);
              })
              .attr('text-anchor', 'middle')
              .style('fill', upOrDown)
              .text(function(d) {
                if (d.insights[1]) {
                  return d.insights[1].description;
                }
              });

            // Adjustments for description
            d3.selectAll('.insight-group .description')
              .each(function() {
                if (this && this.previousElementSibling) {
                  var nextTextHeight = this.previousElementSibling.getBBox().height;
                  var textHeight = this.getBBox().height;

                  this.setAttribute('y', nextTextHeight + textHeight);
                }
              });

            /**
             * Helper Function
             */
            function upOrDown(d) {
              var isDown = d.insights[0].description.toLowerCase()
                .indexOf('down') > -1;

              var isUp = d.insights[0].description.toLowerCase()
                .indexOf('up') > -1;

              if (isDown) return 'down';
              if (isUp) return 'up';
            }
          }

          /**
           * Helper Function
           */
          function wrap(text, width) {
            text.each(function(d, i) {
              var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                x = text.attr('x'),
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);

              while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);
                }
              }
            });
          }
        };
      }
    };

  });
