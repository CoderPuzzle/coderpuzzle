/**
 * @param {number[]} stations
 * @param {number} k
 * @return {number}
 */
var minmaxGasDist = function (stations, k) {
    const gaps = [];
    for (let i = 0; i + 1 < stations.length; i++) {
        gaps.push(stations[i + 1] - stations[i]);
    }
    let lo = 0.0;
    let hi = Math.max(...gaps);
    // Binary search the smallest feasible maximum distance.
    for (let it = 0; it < 60; it++) {
        const mid = (lo + hi) / 2.0;
        if (mid <= 0.0) {
            hi = 0.0;
            break;
        }
        let needed = 0;
        for (const g of gaps) {
            needed += Math.ceil(g / mid) - 1;
        }
        if (needed <= k) {
            hi = mid;
        } else {
            lo = mid;
        }
    }
    return hi;
};
