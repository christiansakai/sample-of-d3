'use strict';

/**
 * @ngdoc function
 * @name thirdshelfApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the thirdshelfApp
 */
angular.module('thirdshelfApp')
  .controller('HorizontalCtrl', function () {
    var data = {
      "RESULT": "RESULT_SUCCESS",
      "RESULT_ERROR_CODE": "ERROR_NONE",
      "DATA": {
        "oneTime": {
          "count": "200",
          "memberCount": "0",
          "countPct": 0,
          "revenuePct": 0,
          "atv": null,
          "avgPurchaseCycle": "0"
        },
        "casual": {"count": "200", "memberCount": "0", "countPct": 0, "revenuePct": 0, "atv": null, "avgPurchaseCycle": null},
        "repeat": {"count": "35", "memberCount": "0", "countPct": 0, "revenuePct": 0, "atv": null, "avgPurchaseCycle": null},
        "atrisk": {
          "count": "200",
          "memberCount": "0",
          "countPct": 0,
          "revenuePct": 0,
          "atv": null,
          "avgDaysSincePurchase": null,
          "avgPurchaseCycle": null
        },
        "dormant": {
          "count": "100",
          "memberCount": "0",
          "countPct": 0,
          "revenuePct": 0,
          "atv": null,
          "avgDaysSincePurchase": null,
          "avgPurchaseCycle": null
        }
      },
      "META": null
    };

    this.horizontalData = function() {
      var mappedData = [];

      for (var keys in data.DATA) {
        var obj = {
          legend: keys,
          value: data.DATA[keys].count
        };

        if (keys === 'repeat') obj.color = 'red';
        if (keys === 'atrisk') obj.pattern = 'url(#diagonal-stripe-1)';
        if (keys === 'dormant') obj.pattern = 'url(#vertical-stripe-3)';

        mappedData.push(obj);
       }

      return mappedData;
    }();

    var additionalData = [{
      averageTxHV: "8.6",
      averageTxLV: "1.1",
      averageTxMV: "2.6",
      averageValueHV: "2019",
      averageValueLV: "121",
      averageValueMV: "452",
      countCustHV: "0",
      countCustLV: "0",
      countCustMV: "0",
      dateRun: "2015-05-22 19:41:22",
      firstDate: "2013-03-21 13:08:50",
      id: "0",
      lastDate: "2015-05-21 13:08:50",
      monthsCovered: "26",
      numberOfCustomers: "3947",
      percentCashHV: "44",
      percentCashLV: "16",
      percentCashMV: "40",
      percentCustAtRisk: "33",
      percentCustHV: "11",
      percentCustLV: "64",
      percentCustLost: "45",
      percentCustMV: "25",
      percentCustRecent: "25",
      processed: "0",
      purchaseCycleInDays: "62",
      retailerId: "",
      runCode: "",
      taggedPercentage: "37",
      totalCash: "0",
      totalTransactions: "42327"
    }];

    this.donutData = [additionalData[0].percentCashLV, additionalData[0].percentCustLV];
  });
