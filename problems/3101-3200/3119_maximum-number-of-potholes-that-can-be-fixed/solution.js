/**
 * @param {string} road
 * @param {number} budget
 * @return {number}
 */
var maxPotholes = function (road, budget) {
    // Whole long runs are cheapest per pothole (L / (L + 1) grows with L),
    // so take longest runs first; when a full run no longer fits only one
    // partial purchase remains, worth budget - 1 potholes.
    const lengths = road
        .split(".")
        .filter((run) => run.length > 0)
        .map((run) => run.length)
        .sort((a, b) => b - a);
    let fixed = 0;
    for (const length of lengths) {
        if (budget >= length + 1) {
            budget -= length + 1;
            fixed += length;
        } else {
            fixed += Math.max(0, budget - 1);
            break;
        }
    }
    return fixed;
};
