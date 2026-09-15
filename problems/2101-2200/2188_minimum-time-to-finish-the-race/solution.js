/**
 * @param {number[][]} tires
 * @param {number} changeTime
 * @param {number} numLaps
 * @return {number}
 */
var minimumFinishTime = function (tires, changeTime, numLaps) {
    // Precompute best[x]: the cheapest time for x consecutive laps on a
    // single tire. A run never helps once its next lap costs more than
    // resetting to the fastest first lap; ratios are >= 2 so the useful
    // run length is tiny. Totals stay far below Number.MAX_SAFE_INTEGER
    // for any optimal plan, but the per-tire scan is capped explicitly.
    const INF = Number.MAX_SAFE_INTEGER;
    let fastestFirst = Infinity;
    for (const [fi] of tires) {
        fastestFirst = Math.min(fastestFirst, fi);
    }
    const best = new Array(numLaps + 1).fill(INF);
    for (const [fi, ri] of tires) {
        let total = 0;
        let lap = fi;
        for (let x = 1; x <= numLaps; ++x) {
            total += lap;
            if (total < best[x]) {
                best[x] = total;
            }
            if (lap >= changeTime + fastestFirst) {
                break;
            }
            lap *= ri;
        }
    }
    const dp = new Array(numLaps + 1).fill(INF);
    dp[0] = 0;
    for (let i = 1; i <= numLaps; ++i) {
        for (let x = 1; x <= i; ++x) {
            if (best[x] === INF) {
                continue;
            }
            const candidate = dp[i - x] + best[x] + (i === x ? 0 : changeTime);
            if (candidate < dp[i]) {
                dp[i] = candidate;
            }
        }
    }
    return dp[numLaps];
};
