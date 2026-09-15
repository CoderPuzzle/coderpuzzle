/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
    let total = 0;
    let runSum = neededTime[0];
    let runMax = neededTime[0];
    for (let i = 1; i < colors.length; i++) {
        if (colors[i] === colors[i - 1]) {
            runSum += neededTime[i];
            runMax = Math.max(runMax, neededTime[i]);
        } else {
            total += runSum - runMax;
            runSum = neededTime[i];
            runMax = neededTime[i];
        }
    }
    total += runSum - runMax;
    return total;
};
