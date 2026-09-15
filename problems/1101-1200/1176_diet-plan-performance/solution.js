/**
 * @param {number[]} calories
 * @param {number} k
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var dietPlanPerformance = function (calories, k, lower, upper) {
    var points = 0;
    // Sum the first window once; every later window shares k-1 days with
    // its predecessor.
    var window = 0;
    for (var i = 0; i < k; i++) {
        window += calories[i];
    }
    if (window < lower) {
        points--;
    } else if (window > upper) {
        points++;
    }
    for (var i2 = k; i2 < calories.length; i2++) {
        window += calories[i2] - calories[i2 - k];
        if (window < lower) {
            points--;
        } else if (window > upper) {
            points++;
        }
    }
    return points;
};
