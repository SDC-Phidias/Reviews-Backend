module.exports = {
  getRecommendCounts: (aggregateArr) => {
    let results = {};
    // edge case: undefined input
    if (!aggregateArr) return results;
    // edge case: empty input array
    if (!aggregateArr[0]) return results;
    aggregateArr[0].recommend.forEach((ele) => {
      if (ele === 0) {
        if (results["0"]) {
          results["0"]++;
        } else {
          results["0"] = 1;
        }
      } else if (ele === 1) {
        if (results["1"]) {
          results["1"]++;
        } else {
          results["1"] = 1;
        }
      }
    });
    return results;
  },
  getRatingsCounts: (aggregateArr) => {
    let results = {};
    // edge case: empty input array
    if (!aggregateArr[0]) return results;
    if (!aggregateArr[0].rating) return results;
    aggregateArr[0].rating.forEach((ele) => {
      if (ele === 1) {
        if (results["1"]) {
          results["1"]++;
        } else {
          results["1"] = 1;
        }
      } else if (ele === 2) {
        if (results["2"]) {
          results["2"]++;
        } else {
          results["2"] = 1;
        }
      } else if (ele === 3) {
        if (results["3"]) {
          results["3"]++;
        } else {
          results["3"] = 1;
        }
      } else if (ele === 4) {
        if (results["4"]) {
          results["4"]++;
        } else {
          results["4"] = 1;
        }
      } else if (ele === 5) {
        if (results["5"]) {
          results["5"]++;
        } else {
          results["5"] = 1;
        }
      }
    });
    return results;
  },
  mapValueToObj: (valArr, charArr) => {
    // edge case: empty input array
    if (!charArr[0]) return charArr;
    if (!charArr[0].characteristics) return charArr;
    charArr[0].characteristics.forEach((ele, i) => {
      if (ele.id === valArr[i].id) {
        ele.value = valArr[i].value.toFixed(4);
      }
    });
    return charArr;
  },
  formatData: (ObjToClient) => {
    let results = {};
    // edge case: empty input array
    if (ObjToClient.length === 0) return results;
    ObjToClient.forEach((ele) => {
      results[ele.name] = {
        id: ele.id,
        value: ele.value,
      };
    });
    return results;
  },
};
