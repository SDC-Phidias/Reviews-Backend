module.exports = {
  getRecommendCounts: (aggregateArr) => {
    let results = {};
    // edge case: undefined input
    if (!aggregateArr) return results;
    if (!aggregateArr[0]) return results;
    aggregateArr[0].forEach((ele) => {
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
    if (!aggregateArr) return results;
    if (!aggregateArr[0]) return results;
    aggregateArr[0].forEach((ele) => {
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
  formatData: (ObjToClient) => {
    let results = {};
    const { id } = ObjToClient[0];
    const { name } = ObjToClient[0];
    const { values } = ObjToClient[0];
    results = {
      name: name,
      id: id[0],
      value: values.valueArr,
    };
    return results;
  },
  getAvg: (arr) => {
    if (arr.length === 0) return 0;
    if (!arr) return 0;
    let results = 0;
    arr.forEach((val) => {
      results += val;
    });
    return results / arr.length;
  },
  filterSort: (str) => {
    /* "newest", "helpful ~> (helpfulness)", or "relevant" */
    switch (str) {
      case "newest":
        return "date";
      case "helpful":
        return "helpfulness";
      case "relevant":
        return "helpfulness";
      default:
        return "helpfulness";
    }
  },
};
