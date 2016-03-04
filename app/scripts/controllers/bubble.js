'use strict';

/**
 * @ngdoc function
 * @name thirdshelfApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the thirdshelfApp
 */
angular.module('thirdshelfApp')
  .controller('BubbleCtrl', function ($scope) {
    var self = this;

    //self.data = [{
    //  "legend": "TOTAL REVENUE",
    //  "value": 31418,
    //  "pattern": "url(#diagonal-stripe-2)",
    //  "insights": [{"number": "10%", "parsedNumber": 10, "title": "TAGGING RATE", "description": ""}]
    //}, {
    //  "legend": "REVENUE FROM IDENTIFIED CUSTOMERS",
    //  "value": 5136,
    //  "color": "#63A5E8",
    //  "insights": [{
    //    "number": "48",
    //    "parsedNumber": 48,
    //    "title": "IDENTIFIED CUSTOMERS",
    //    "description": ""
    //  }, {"number": "47", "parsedNumber": 47, "title": "CONTACTABLE CUSTOMERS", "description": ""}]
    //}, {
    //  "legend": "REVENUE FROM MEMBERS",
    //  "value": 982,
    //  "color": "#89DDFF",
    //  "insights": [{"number": "7", "parsedNumber": 7, "title": "PROGRAM MEMBERS", "description": ""}]
    //}];

    //var data = [{
    //    "legend": "TOTAL REVENUE",
    //    "value": 64619,
    //    "pattern": "url(#diagonal-stripe-2)",
    //    "insights": [{"number": "17%", "parsedNumber": 17, "title": "TAGGING RATE", "description": ""}]
    //  }, {
    //    "legend": "REVENUE FROM IDENTIFIED CUSTOMERS",
    //    "value": 24382,
    //    "color": "#63A5E8",
    //    "insights": [{
    //      "number": "111",
    //      "parsedNumber": 111,
    //      "title": "IDENTIFIED CUSTOMERS",
    //      "description": ""
    //    }, {"number": "111", "parsedNumber": 111, "title": "CONTACTABLE CUSTOMERS", "description": ""}]
    //  }, {
    //    "legend": "REVENUE FROM MEMBERS",
    //    "value": 0,
    //    "color": "#89DDFF",
    //    "insights": [{"number": "0", "parsedNumber": 0, "title": "PROGRAM MEMBERS", "description": ""}]
    //  }];

    //self.data = [{
    //  legend: 'TOTAL REVENUE',
    //  value: 982177,
    //  insights: [{
    //    number: '18%',
    //    parsedNumber: 18,
    //    title: 'TAGGING RATE',
    //    description: 'Down 4% from the previous week'
    //  }]
    //}, {
    //  legend: 'REVENUE FROM IDENTIFIED CUSTOMERS',
    //  value: 500001,
    //  insights: [{
    //    number: '2,200',
    //    parsedNumber: 2200,
    //    title: 'IDENTIFIED CUSTOMERS',
    //    description: 'Up 8% from the previous week'
    //  }, {
    //    number: '1,952',
    //    parsedNumber: 1952,
    //    title: 'CONTACTABLE CUSTOMERS',
    //    description: 'Down 2% from the previous week'
    //  }]
    //}, {
    //  legend: 'REVENUE FROM MEMBERS',
    //  value: 500000,
    //  insights: [{
    //    number: '1,472',
    //    parsedNumber: 1472,
    //    title: 'PROGRAM MEMBERS',
    //    description: 'Up 5% from the previous week'
    //  }],
    //  color: 'red'
    //}, {
    //  legend: 'REVENUE FROM OUTSIDE',
    //  value: 123046,
    //  insights: [{
    //    number: '2,502',
    //    parsedNumber: 2502,
    //    title: 'OUTSIDE MEMBERS',
    //    description: 'Up 7% from the previous week'
    //  }],
    //  pattern: 'url(#diagonal-stripe-1)'
    //}, {
    //  legend: 'REVENUE FROM 3RD PARTY',
    //  value: 123045,
    //  insights: [{
    //    number: '3,572',
    //    parsedNumber: 3572,
    //    title: '3RD PARTY MEMBERS',
    //    description: 'Down 5% from the previous week'
    //  }]
    //}];


    self.data = [{
        "legend": "TOTAL REVENUE",
        "value": 32740,
        "pattern": "url(#diagonal-stripe-2)",
        "insights": [{"number": "12%", "parsedNumber": 12, "title": "TAGGING RATE", "description": ""}]
      }, {
        "legend": "REVENUE FROM IDENTIFIED CUSTOMERS",
        "value": 6685,
        "color": "#63A5E8",
        "insights": [{
          "number": "55",
          "parsedNumber": 55,
          "title": "IDENTIFIED CUSTOMERS",
          "description": ""
        }, {"number": "55", "parsedNumber": 55, "title": "CONTACTABLE CUSTOMERS", "description": ""}]
      }, {
        "legend": "REVENUE FROM MEMBERS",
        "value": 7871,
        "color": "#89DDFF",
        "insights": [{"number": "73", "parsedNumber": 73, "title": "PROGRAM MEMBERS", "description": ""}]
      }];

    self.data = [{
      "legend": "TOTAL REVENUE",
      "value": "64619",
      "pattern": "url(#diagonal-stripe-2)",
      "insights": [{"number": "17%", "parsedNumber": 17, "title": "TAGGING RATE", "description": ""}]
    }, {
      "legend": "REVENUE FROM IDENTIFIED CUSTOMERS",
      "value": "24382",
      "color": "#63A5E8",
      "insights": [{
        "number": "111",
        "parsedNumber": 111,
        "title": "IDENTIFIED CUSTOMERS",
        "description": ""
      }, {"number": "111", "parsedNumber": 111, "title": "CONTACTABLE CUSTOMERS", "description": ""}]
    }, {
      "legend": "REVENUE FROM MEMBERS",
      "value": "0",
      "color": "#89DDFF",
      "insights": [{"number": "0", "parsedNumber": 0, "title": "PROGRAM MEMBERS", "description": ""}]
    }];

    self.data = [{
      "legend": "TOTAL REVENUE",
      "value": "58564",
      "pattern": "url(#diagonal-stripe-2)",
      "insights": [{"number": "11%", "parsedNumber": 11, "title": "TAGGING RATE", "description": ""}]
    }, {
      "legend": "REVENUE FROM IDENTIFIED CUSTOMERS",
      "value": "11663",
      "color": "#63A5E8",
      "insights": [{
        "number": "82",
        "parsedNumber": 82,
        "title": "IDENTIFIED CUSTOMERS",
        "description": ""
      }, {"number": "82", "parsedNumber": 82, "title": "CONTACTABLE CUSTOMERS", "description": ""}]
    }, {
      "legend": "REVENUE FROM MEMBERS",
      "value": "2585",
      "color": "#89DDFF",
      "insights": [{"number": "15", "parsedNumber": 15, "title": "PROGRAM MEMBERS", "description": ""}]
    }];

    self.data = [{
      "legend": "TOTAL REVENUE",
      "value": "32740",
      "pattern": "url(#diagonal-stripe-2)",
      "insights": [{"number": "12%", "parsedNumber": 12, "title": "TAGGING RATE", "description": ""}]
    }, {
      "legend": "REVENUE FROM IDENTIFIED CUSTOMERS",
      "value": "6685",
      "color": "#63A5E8",
      "insights": [{
        "number": "55",
        "parsedNumber": 55,
        "title": "IDENTIFIED CUSTOMERS",
        "description": ""
      }, {"number": "55", "parsedNumber": 55, "title": "CONTACTABLE CUSTOMERS", "description": ""}]
    }, {
      "legend": "REVENUE FROM MEMBERS",
      "value": "7871",
      "color": "#89DDFF",
      "insights": [{"number": "73", "parsedNumber": 73, "title": "PROGRAM MEMBERS", "description": ""}]
    }];
  });


