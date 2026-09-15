/**
 * @param {number[][]} series1
 * @param {number[][]} series2
 * @return {number[][]}
 */
var aggregateTimeSeries = function (series1, series2) {
    const merged = [];
    let i = series1.length - 1;
    let j = series2.length - 1;
    let value1 = 0;
    let value2 = 0;
    // Sweep the union of timestamps from right to left. Each running value
    // is the last value its series contributed, which for every timestamp
    // still ahead of the cursor is exactly that series' next available
    // value; a series not yet reached contributes 0.
    while (i >= 0 || j >= 0) {
        let ts;
        if (j < 0 || (i >= 0 && series1[i][0] >= series2[j][0])) {
            ts = series1[i][0];
            value1 = series1[i][1];
            --i;
            if (j >= 0 && series2[j][0] === ts) {
                value2 = series2[j][1];
                --j;
            }
        } else {
            ts = series2[j][0];
            value2 = series2[j][1];
            --j;
        }
        merged.push([ts, value1 + value2]);
    }
    merged.reverse();
    return merged;
};
